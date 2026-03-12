import { env } from "../../app/env";
import type { PaginationSchema } from "../../app/schema";
import { postsAdapter } from "./adapter";

export const postsService = {
	async index(pagination: PaginationSchema) {
		const payload = await postsAdapter.postsIndex({
			limit: pagination?.limit || env.pagination.defaultLimit,
			page: pagination?.page || 1,
			sort: pagination?.sort || "desc",
			order: pagination?.order,
			q: pagination?.q,
		});

		return payload;
	},

	async show(id: number | string) {
		const payload = await postsAdapter.show(Number(id));

		return payload;
	},
};
