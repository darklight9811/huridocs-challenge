import type { QueryClient } from "@tanstack/react-query";
import { createTRPCClient, httpBatchLink, httpLink, isNonJsonSerializable, loggerLink, splitLink } from "@trpc/client";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { observable } from "@trpc/server/observable";
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";

import { objectToFormData } from "@repo/ds/lib/form";

import type { AppRouter } from "../server";
import { transformer } from "../utils/trpc-utils";
import { env } from "./app/env";
import { queryClient } from "./app/query";

let browserQueryClient: QueryClient | undefined;
type BrowserWindowLike = {
	location: {
		origin: string;
	};
};

const getBrowserWindow = () => {
	const globalWithWindow = globalThis as typeof globalThis & { window?: BrowserWindowLike };
	return globalWithWindow.window;
};

function getQueryClient() {
	if (!getBrowserWindow()) return queryClient;
	if (!browserQueryClient) browserQueryClient = queryClient;
	return browserQueryClient;
}

const getBaseUrl = () => {
	const browserWindow = getBrowserWindow();
	if (browserWindow) return browserWindow.location.origin;
	return env.app_url || `http://localhost:${process.env.PORT ?? 3000}`;
};

function containsFile(obj: Record<string, unknown>) {
	if (obj instanceof File) return true;

	for (const key in obj) {
		const value = obj[key];
		if (value instanceof File) return true;
		if (Array.isArray(value) && value.some(containsFile)) return true;
		if (typeof value === "object" && value !== null) {
			if (containsFile(value as Record<string, unknown>)) return true;
		}
	}

	return false;
}

export const client = createTRPCClient<AppRouter>({
	links: [
		function formDataLink() {
			return ({ op, next }) => {
				return observable((observer) => {
					if (containsFile(op.input as Record<string, unknown>)) {
						op.input = objectToFormData(op.input);
					}
					return next(op).subscribe({
						next(value) {
							observer.next(value);
						},
						error(err) {
							observer.error(err);
						},
						complete() {
							observer.complete();
						},
					});
				});
			};
		},
		...(process.env.NODE_ENV === "development" ? [loggerLink()] : []),
		splitLink({
			condition: (op) => isNonJsonSerializable(op.input),
			true: httpLink({
				transformer: transformer,
				url: `${getBaseUrl()}/api/trpc`,
			}),
			false: httpBatchLink({
				transformer: transformer,
				url: `${getBaseUrl()}/api/trpc`,
			}),
		}),
	],
});

export const trpc = createTRPCOptionsProxy<AppRouter>({
	client: client,
	queryClient: getQueryClient,
});

export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;
