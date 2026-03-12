import { env } from "../../app/env";
import type { PostPaginationSchema } from "../schema";
import { mockPost } from "../schema.mock";

export const postsAdapterMock = {
	postsIndex(pagination: PostPaginationSchema) {
		return [
			mockPost.many(pagination?.limit || env.pagination.defaultLimit, { userId: pagination?.userId }),
			{
				...pagination,
				page: pagination?.page || 1,
				sort: "desc",
				limit: pagination?.limit || env.pagination.defaultLimit,
				total: pagination?.limit || env.pagination.defaultLimit,
			},
		] as const;
	},

	show(id: number) {
		return mockPost.single({ id });
	},
};
