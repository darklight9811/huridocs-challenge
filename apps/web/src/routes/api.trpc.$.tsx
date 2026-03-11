import { appRouter,createTRPCContext } from "@repo/domains/server";import { createFileRoute } from "@tanstack/react-router";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

function handler({ request }: { request: Request }) {
	return fetchRequestHandler({
		req: request,
		router: appRouter,
		endpoint: "/api/trpc",
		createContext: () => createTRPCContext({ request })
	});
}

export const Route = createFileRoute("/api/trpc/$")({
	server: {
		handlers: {
			GET: handler,
			POST: handler,
		},
	},
});
