import { z } from "zod/v4";

export const userSchema = z.object({
	id: z.coerce.number(),
	name: z.string(),
	email: z.email(),
	avatar: z.url(),
	address: z.string().optional(),
});

export type UserSchema = z.infer<typeof userSchema>;
