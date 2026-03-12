import type { PaginationSchema } from "../../app/schema";
import { usersAdapter } from "./adapter";

export const usersService = {
	async index(pagination: PaginationSchema) {
		const payload = await usersAdapter.usersIndex(pagination);

		return payload;
	},

	async show(id: number | string) {
		const payload = await usersAdapter.show(Number(id));

		return payload;
	},
};
