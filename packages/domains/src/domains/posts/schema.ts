import { z } from "zod/v4";

import { paginationSchema } from "../app/schema";

export const postSchema = z.object({
	id: z.coerce.number(),
	title: z.string(),
	body: z.string(),
	userId: z.coerce.number(),
});

export type PostSchema = z.infer<typeof postSchema>;

export const postPaginationSchema = paginationSchema.and(z.object({ userId: z.coerce.number().optional() }));

export type PostPaginationSchema = z.infer<typeof postPaginationSchema>;
