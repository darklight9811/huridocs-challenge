import { z } from "zod/v4";

export const postSchema = z.object({
	id: z.coerce.number(),
	title: z.string(),
	body: z.string(),
	userId: z.coerce.number(),
});

export type PostSchema = z.infer<typeof postSchema>;
