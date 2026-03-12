import { afterEach, describe, expect, it, vi } from "vitest";

import { usersAdapterFetch } from "./adapter.fetch";

describe("usersAdapterFetch", () => {
	afterEach(() => {
		vi.restoreAllMocks();
		vi.unstubAllGlobals();
	});

	it("fetches users index and returns paginated data", async () => {
		const payload = [
			{ id: 2, name: "Grace", email: "grace@example.com", avatar: "https://example.com/grace.png" },
			{ id: 1, name: "Ada", email: "ada@example.com", avatar: "https://example.com/ada.png" },
			{ id: 3, name: "Linus", email: "linus@example.com", avatar: "https://example.com/linus.png" },
		];
		const fetchMock = vi.fn().mockResolvedValue({ json: vi.fn().mockResolvedValue(payload) });
		vi.stubGlobal("fetch", fetchMock);

		const [users, meta] = await usersAdapterFetch.usersIndex({ page: 1, limit: 2, sort: "asc", order: "name" });

		expect(fetchMock).toHaveBeenCalledWith("https://api.mydummyapi.com/users");
		expect(users).toHaveLength(2);
		expect(users[0]?.name).toBe("Ada");
		expect(users[1]?.name).toBe("Grace");
		expect(meta.page).toBe(1);
		expect(meta.limit).toBe(2);
		expect(typeof meta.total).toBe("number");
	});

	it("fetches and parses a single user", async () => {
		const payload = {
			id: "7",
			name: "Margaret Hamilton",
			email: "margaret@example.com",
			avatar: "https://example.com/margaret.png",
		};
		const fetchMock = vi.fn().mockResolvedValue({ json: vi.fn().mockResolvedValue(payload) });
		vi.stubGlobal("fetch", fetchMock);

		const user = await usersAdapterFetch.show(7);

		expect(fetchMock).toHaveBeenCalledWith("https://api.mydummyapi.com/users/7");
		expect(user.id).toBe(7);
		expect(user.name).toBe("Margaret Hamilton");
	});
});
