import { z } from "zod/v4";

import { paginate } from "../../../utils/paginate";
import type { PaginationSchema } from "../../app/schema";
import { postSchema } from "../schema";

export const postsAdapterFetch = {
	postsIndex(pagination: PaginationSchema) {
		return fetch("https://api.mydummyapi.com/posts")
			.then((res) => res.json())
			.then((data) => paginate(z.array(postSchema).parse(data), pagination, ["title", "body"]));
	},

	show(id: number) {
		return fetch(`https://api.mydummyapi.com/posts/${id}`)
			.then((res) => res.json())
			.then(postSchema.parse);
	},
};
