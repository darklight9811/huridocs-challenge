import type { PaginationSchema } from "../domains/app/schema";

export function paginate<T extends Record<string, unknown>>(
	data: T[],
	pagination: PaginationSchema & { pages?: number },
	q?: (keyof T)[],
) {
	const page = pagination?.page ?? 1;
	const limit = pagination?.limit ?? 25;
	const sort = pagination?.sort ?? "asc";
	const order = pagination?.order;
	const query = pagination?.q;

	let parsed: T[] = data;

	if (query && q) {
		const normalised = query.toLowerCase();
		parsed = parsed.filter((item) =>
			q.some((key) =>
				String(item[key] ?? "")
					.toLowerCase()
					.includes(normalised),
			),
		);
	}

	if (order) {
		const field = order as keyof T;
		parsed = parsed.sort((a, b) => {
			const aVal = String(a[field] ?? "");
			const bVal = String(b[field] ?? "");
			return sort === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
		});
	}

	return [
		parsed.splice((page - 1) * limit, limit),
		{
			...pagination,
			total: parsed.length,
		},
	] as const;
}
