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
		return fetch(`https://api.mydummyapi.com/users/${id}`)
			.then((res) => res.json())
			.then(userSchema.parse);
	},
};
