import { QueryClient } from "@tanstack/react-query";

import { transformer } from "../../utils/transformer";

let queryClient: QueryClient;

function makeQueryClient() {
	return new QueryClient({
		defaultOptions: {
			dehydrate: { serializeData: transformer.serialize },
			hydrate: { deserializeData: transformer.deserialize },
			queries: {},
			mutations: {
				onError() {
					// toast.error("An unexpected error occurred.");
				},
			},
		},
	});
}

declare global {
	var __QUERY_CLIENT__: QueryClient | undefined;
}

if (import.meta.env.NODE_ENV === "production") {
	queryClient = makeQueryClient();
} else {
	if (!globalThis.__QUERY_CLIENT__) {
		globalThis.__QUERY_CLIENT__ = makeQueryClient();
	}

	queryClient = globalThis.__QUERY_CLIENT__;
}

export { queryClient };
