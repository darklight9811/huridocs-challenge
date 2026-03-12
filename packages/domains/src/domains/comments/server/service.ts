import type { PaginationSchema } from "../../app/schema";
import { commentsAdapter } from "./adapter";

export const commentsService = {
	async index(pagination: PaginationSchema) {
		const payload = await commentsAdapter.commentsIndex(pagination);

		return payload;
	},

	async show(id: number | string) {
		const payload = await commentsAdapter.show(Number(id));

		return payload;
	},
};
