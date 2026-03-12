import type { PaginationSchema } from "../../app/schema";
import { postsAdapter } from "./adapter";

export const postsService = {
	async index(pagination: PaginationSchema) {
		const payload = await postsAdapter.postsIndex(pagination);

		return payload;
	},

	async show(id: number | string) {
		const payload = await postsAdapter.show(Number(id));

		return payload;
	},
};
