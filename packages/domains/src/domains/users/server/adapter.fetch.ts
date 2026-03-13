import { z } from "zod/v4";

import { paginate } from "../../../utils/paginate";
import type { PaginationSchema } from "../../app/schema";
import { userSchema } from "../schema";

export const usersAdapterFetch = {
	usersIndex(pagination: PaginationSchema) {
		return fetch("https://api.mydummyapi.com/users")
			.then((res) => res.json())
			.then((data) => paginate(z.array(userSchema).parse(data), pagination, ["name", "email"]));
	},

	show(id: number) {
		// This API only has 20 users, so we use the modulo operator to loop through them
		const parsedId = id % 21;

		return fetch(`https://api.mydummyapi.com/users/${parsedId}`)
			.then((res) => res.json())
			.then(userSchema.parse);
	},
};
