import type { PaginationSchema } from "../../app/schema";
import { mockComment } from "../schema.mock";

export const commentsAdapterMock = {
	commentsIndex(pagination: PaginationSchema = {}) {
		const limit = pagination.limit || 20;

		return [
			mockComment.many(limit),
			{
				...pagination,
				total: limit,
			},
		] as const;
	},

	show(id: number) {
		return mockComment.single({ id });
	},
};
