import { describe, expect, it } from "vitest";

import { usersAdapterMock } from "./adapter.mock";

describe("usersAdapterMock", () => {
	it("returns requested amount of users with matching pagination metadata", () => {
		const [users, meta] = usersAdapterMock.usersIndex({ page: 2, limit: 5, sort: "asc", q: "ada" });

		expect(users).toHaveLength(5);
		expect(meta).toEqual({
			page: 2,
			limit: 5,
			sort: "asc",
			q: "ada",
			total: 5,
		});
	});

	it("defaults to 20 users when no limit is provided", () => {
		const [users, meta] = usersAdapterMock.usersIndex({});

		expect(users).toHaveLength(20);
		expect(meta.total).toBe(20);
	});

	it("returns a user with the requested id", () => {
		const user = usersAdapterMock.show(42);

		expect(user.id).toBe(42);
	});
});
