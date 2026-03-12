import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";

import { client } from "@repo/domains";

import { routeTree } from "./routeTree.gen";
import { queryClient } from "@repo/domains/app/query";

function getContext() {
	const serverHelpers = createTRPCOptionsProxy({
		client: client,
		queryClient: queryClient,
	});
	return {
		queryClient,
		trpc: serverHelpers,
	};
}

export function getRouter() {
	const context = getContext();

	const router = createTanStackRouter({
		routeTree,

		context,

		scrollRestoration: true,
		defaultPreload: "intent",
		defaultPreloadStaleTime: 0,
	});

	setupRouterSsrQueryIntegration({ router, queryClient: context.queryClient });

	return router;
}

declare module "@tanstack/react-router" {
	interface Register {
		router: ReturnType<typeof getRouter>;
	}
}
