import { describe, expect, it } from "vitest";

import { paginate } from "./paginate";

type Item = { id: number; name: string; email: string };

const items: Item[] = [
	{ id: 1, name: "Zara", email: "zara@example.com" },
	{ id: 2, name: "Ada", email: "ada@example.com" },
	{ id: 3, name: "Bob", email: "bob@example.com" },
	{ id: 4, name: "Margaret", email: "margaret@example.com" },
	{ id: 5, name: "Linus", email: "linus@example.com" },
];

describe("paginate", () => {
	describe("pagination", () => {
		it("returns the first page of results", () => {
			const [page] = paginate([...items], { page: 1, limit: 2, sort: "asc" });

			expect(page).toHaveLength(2);
			expect(page[0]?.id).toBe(1);
			expect(page[1]?.id).toBe(2);
		});

		it("returns the second page of results", () => {
			const [page] = paginate([...items], { page: 2, limit: 2, sort: "asc" });

			expect(page).toHaveLength(2);
			expect(page[0]?.id).toBe(3);
			expect(page[1]?.id).toBe(4);
		});

		it("returns remaining items on the last partial page", () => {
			const [page] = paginate([...items], { page: 3, limit: 2, sort: "asc" });

			expect(page).toHaveLength(1);
			expect(page[0]?.id).toBe(5);
		});

		it("includes pagination metadata in the second tuple element", () => {
			const [, meta] = paginate([...items], { page: 1, limit: 2, sort: "asc" });

			expect(meta.page).toBe(1);
			expect(meta.limit).toBe(2);
			expect(typeof meta.total).toBe("number");
		});
	});

	describe("search (q)", () => {
		it("filters results by a search query against specified fields", () => {
			const [page] = paginate([...items], { page: 1, limit: 10, sort: "asc", q: "ada" }, ["name", "email"]);

			expect(page).toHaveLength(1);
			expect(page[0]?.name).toBe("Ada");
		});

		it("matches substrings in the specified fields", () => {
			const [page] = paginate([...items], { page: 1, limit: 10, sort: "asc", q: "example.com" }, ["email"]);

			expect(page).toHaveLength(5);
		});

		it("is case-insensitive", () => {
			const [page] = paginate([...items], { page: 1, limit: 10, sort: "asc", q: "LINUS" }, ["name"]);

			expect(page).toHaveLength(1);
			expect(page[0]?.name).toBe("Linus");
		});

		it("returns empty array when nothing matches", () => {
			const [page] = paginate([...items], { page: 1, limit: 10, sort: "asc", q: "zzznomatch" }, ["name"]);

			expect(page).toHaveLength(0);
		});

		it("skips filtering when no q fields are provided", () => {
			const [page] = paginate([...items], { page: 1, limit: 10, sort: "asc", q: "ada" });

			expect(page).toHaveLength(5);
		});
	});

	describe("ordering", () => {
		it("sorts by a field in ascending order", () => {
			const [page] = paginate([...items], { page: 1, limit: 10, sort: "asc", order: "name" });

			expect(page.map((i) => i.name)).toEqual(["Ada", "Bob", "Linus", "Margaret", "Zara"]);
		});

		it("sorts by a field in descending order", () => {
			const [page] = paginate([...items], { page: 1, limit: 10, sort: "desc", order: "name" });

			expect(page.map((i) => i.name)).toEqual(["Zara", "Margaret", "Linus", "Bob", "Ada"]);
		});

		it("does not sort when no order field is provided", () => {
			const [page] = paginate([...items], { page: 1, limit: 10, sort: "asc" });

			expect(page.map((i) => i.id)).toEqual([1, 2, 3, 4, 5]);
		});
	});

	describe("combined filter and sort", () => {
		it("filters and then sorts the matching subset", () => {
			const data: Item[] = [
				{ id: 10, name: "Charlie", email: "charlie@acme.com" },
				{ id: 11, name: "Alice", email: "alice@acme.com" },
				{ id: 12, name: "Bob", email: "bob@example.com" },
			];

			const [page] = paginate(data, { page: 1, limit: 10, sort: "asc", q: "acme", order: "name" }, ["email"]);

			expect(page).toHaveLength(2);
			expect(page[0]?.name).toBe("Alice");
			expect(page[1]?.name).toBe("Charlie");
		});
	});
});
