import { createRouter as createTanStackRouter } from "@tanstack/react-router";

import { routeTree } from "./routeTree.gen";
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import { client } from "@repo/domains";
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
