import { z } from "zod/v4";

import { paginate } from "../../../utils/paginate";
import type { PaginationSchema } from "../../app/schema";
import { commentSchema } from "../schema";

export const commentsAdapterFetch = {
	commentsIndex(pagination: PaginationSchema) {
		return fetch("https://api.mydummyapi.com/comments")
			.then((res) => res.json())
			.then((data) => paginate(z.array(commentSchema).parse(data), pagination, ["name", "email", "body"]));
	},

	show(id: number) {
		return fetch(`https://api.mydummyapi.com/comments/${id}`)
			.then((res) => res.json())
			.then(commentSchema.parse);
	},
};
