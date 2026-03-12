import { z } from "zod/v4";

import { paginationSchema } from "../app/schema";

export const commentSchema = z.object({
	id: z.coerce.number(),
	postId: z.coerce.number(),
	name: z.string(),
	email: z.email(),
	body: z.string(),
});

export type CommentSchema = z.infer<typeof commentSchema>;

export const commentPaginationSchema = paginationSchema.and(
	z.object({
		postId: z.coerce.number(),
	}),
);

export type CommentPaginationSchema = z.infer<typeof commentPaginationSchema>;
