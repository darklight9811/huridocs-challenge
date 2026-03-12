import type { PaginationSchema } from "../../app/schema";
import { mockUser } from "../schema.mock";

export const usersAdapterMock = {
	usersIndex(pagination: PaginationSchema) {
		return [
			mockUser.many(pagination.limit || 20),
			{
				...pagination,
				total: pagination.limit || 20,
			},
		] as const;
	},

	show(id: number) {
		return mockUser.single({ id });
	},
};
