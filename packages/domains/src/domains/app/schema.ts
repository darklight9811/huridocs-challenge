import { z } from "zod/v4";

export const paginationSchema = z
	.object({
		page: z.coerce.number(),
		limit: z.coerce.number(),
		q: z.coerce.string().optional(),
		sort: z.enum(["asc", "desc"]),
		order: z.string().optional(),
	})
	.partial()
	.optional();

export type PaginationSchema = z.infer<typeof paginationSchema>;

export function paginatedSchema<Response extends z.ZodType>(schema: Response) {
	return z
		.object({
			data: z.array(schema),
			pages: z.number(),
			items: z.number(),
		})
		.and(paginationSchema);
}

export function syncSchema<Response extends z.ZodObject>(schema: Response) {
	return z
		.object({
			payload: schema,
		})
		.or(z.object({ id: z.string(), payload: schema.partial() }));
}

export type SyncSchema<Response> = { payload: Response } | { id: string; payload: Partial<Response> };
