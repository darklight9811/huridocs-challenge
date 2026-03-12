import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("./adapter", () => {
	return {
		usersAdapter: {
			usersIndex: vi.fn(),
			show: vi.fn(),
		},
	};
});

import { usersAdapter } from "./adapter";
import { usersService } from "./service";

describe("usersService", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("delegates index to adapter with the same pagination payload", async () => {
		const payload: [
			{ id: number; name: string; email: string; avatar: string; address: string }[],
			{ total: number },
		] = [
			[
				{
					id: 1,
					name: "Ada",
					email: "ada@example.com",
					avatar: "https://example.com/ada.png",
					address: "Main Street 1",
				},
			],
			{ total: 1 },
		];
		vi.mocked(usersAdapter.usersIndex).mockResolvedValue(payload);
		const pagination = { page: 1, limit: 10, sort: "asc" as const };

		const result = await usersService.index(pagination);

		expect(usersAdapter.usersIndex).toHaveBeenCalledWith(pagination);
		expect(result).toEqual(payload);
	});

	it("coerces string ids before delegating show to adapter", async () => {
		vi.mocked(usersAdapter.show).mockResolvedValue({
			id: 12,
			name: "Grace",
			email: "grace@example.com",
			avatar: "https://example.com/grace.png",
			address: "Main Street 1",
		});

		const result = await usersService.show("12");

		expect(usersAdapter.show).toHaveBeenCalledWith(12);
		expect(result.id).toBe(12);
	});
});
