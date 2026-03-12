import type { PaginationSchema } from "../domains/app/schema";

export function paginate<T extends Record<string, unknown>>(data: T[], pagination: PaginationSchema, q?: (keyof T)[]) {
	let parsed: T[] = data;

	if (pagination.q && q) {
		const query = pagination.q.toLowerCase();
		parsed = parsed.filter((item) =>
			q.some((key) =>
				String(item[key] ?? "")
					.toLowerCase()
					.includes(query),
			),
		);
	}

	if (pagination.order) {
		const field = pagination.order as keyof T;
		parsed = parsed.sort((a, b) => {
			const aVal = String(a[field] ?? "");
			const bVal = String(b[field] ?? "");
			return pagination.sort === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
		});
	}

	return [
		parsed.splice((pagination.page - 1) * pagination.limit, pagination.limit),
		{
			...pagination,
			total: parsed.length,
		},
	] as const;
}
