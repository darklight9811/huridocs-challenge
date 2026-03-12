import { z } from "zod/v4";

import type { PaginationSchema } from "../../app/schema";
import { userSchema } from "../schema";

export const usersService = {
	index(pagination: PaginationSchema) {
		return fetch("https://api.mydummyapi.com/users")
			.then((res) => res.json())
			.then((data) => {
				const parsed = z.array(userSchema).parse(data);

				return [
					parsed.splice((pagination.page - 1 || 0) * (pagination.limit || 0), pagination.limit),
					{
						...pagination,
						total: data.length,
					},
				] as const;
			});
	},

	show(id: string) {
		return fetch(`https://api.mydummyapi.com/users/${id}`)
			.then((res) => res.json())
			.then(userSchema.parse);
	},
};
