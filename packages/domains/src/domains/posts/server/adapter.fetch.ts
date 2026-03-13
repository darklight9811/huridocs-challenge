import { z } from "zod/v4";

import { paginate } from "../../../utils/paginate";
import type { PaginationSchema } from "../../app/schema";
import { postSchema } from "../schema";

export const postsAdapterFetch = {
	async postsIndex(pagination: PaginationSchema) {
		const posts = await fetch("https://api.mydummyapi.com/posts").then((res) => res.json());

		return paginate(z.array(postSchema).parse(posts), { ...pagination, pages: 2 }, ["title", "body"]);
	},

	async show(id: number) {
		const post = await fetch(`https://api.mydummyapi.com/posts/${id}`).then((res) => res.json());

		return postSchema.parse(post);
	},
};
