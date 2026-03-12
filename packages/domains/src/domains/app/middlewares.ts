import { createMiddleware } from "@tanstack/react-start";

import { queryClient } from "./query";

export const queryMiddleware = createMiddleware().server(async ({ next }) => {
	const response = await next();

	queryClient.clear();

	return response;
});
