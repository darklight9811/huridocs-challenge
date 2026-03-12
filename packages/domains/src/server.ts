import { usersRouter } from "./domains/users/server/router";
import { t } from "./utils/trpc";

export { fetchRequestHandler } from "@trpc/server/adapters/fetch";

export { createTRPCContext } from "./utils/trpc";

export const appRouter = t.router({
	users: usersRouter,
});

export type AppRouter = typeof appRouter;

export const apiCaller = t.createCaller(appRouter);
