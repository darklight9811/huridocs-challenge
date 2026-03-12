import type { PaginationSchema } from "../../app/schema";
import { mockUser } from "../schema.mock";

export const usersAdapterMock = {
	usersIndex(pagination: PaginationSchema = {}) {
		const limit = pagination.limit || 20;

		return [
			mockUser.many(limit),
			{
				...pagination,
				total: limit,
			},
		] as const;
	},

	show(id: number) {
		return mockUser.single({ id });
	},
};
