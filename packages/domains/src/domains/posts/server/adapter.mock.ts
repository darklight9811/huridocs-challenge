import type { PaginationSchema } from "../../app/schema";
import { mockPost } from "../schema.mock";

export const postsAdapterMock = {
	postsIndex(pagination: PaginationSchema) {
		return [
			mockPost.many(pagination.limit || 20),
			{
				...pagination,
				total: pagination.limit || 20,
			},
		] as const;
	},

	show(id: number) {
		return mockPost.single({ id });
	},
};
