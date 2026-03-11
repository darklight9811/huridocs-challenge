import { deleteCookie, getCookie, setCookie } from "@tanstack/react-start/server";
import { initTRPC } from "@trpc/server";
import { treeifyError, ZodError } from "zod/v4";

import { transformer } from "./trpc-utils";

export const createTRPCContext = async (opts: { request: Request }) => {
	return {
		...opts,
		cookie: {
			set: setCookie,
			get: getCookie,
			remove: deleteCookie,
		},
	};
};
type Context = Awaited<ReturnType<typeof createTRPCContext>>;
const trpc = initTRPC.context<Context>().create({
	transformer: transformer,
	errorFormatter: ({ shape, error }) => {
		return {
			...shape,
			data: {
				...shape.data,
				zodError: error.cause instanceof ZodError ? treeifyError(error.cause) : null,
			},
		};
	},
});

export const createCallerFactory = trpc.createCallerFactory;
export const createTRPCRouter = trpc.router;
export const publicProcedure = trpc.procedure;

export const t = {
	router: trpc.router,
	route: publicProcedure,
	createCaller: trpc.createCallerFactory,
};
