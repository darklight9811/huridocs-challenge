import { env } from "../../app/env";
import type { PaginationSchema } from "../../app/schema";
import { mockPost } from "../schema.mock";

export const postsAdapterMock = {
	postsIndex(pagination: PaginationSchema) {
		return [
			mockPost.many(pagination?.limit || env.pagination.defaultLimit),
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
