import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("./adapter", () => {
	return {
		commentsAdapter: {
			commentsIndex: vi.fn(),
			show: vi.fn(),
		},
	};
});

import { commentsAdapter } from "./adapter";
import { commentsService } from "./service";

describe("commentsService", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("delegates index to adapter with the same pagination payload", async () => {
		const payload: [
			{ id: number; postId: number; name: string; email: string; body: string }[],
			{ total: number },
		] = [
			[
				{
					id: 1,
					postId: 3,
					name: "Ada",
					email: "ada@example.com",
					body: "Great post",
				},
			],
			{ total: 1 },
		];
		vi.mocked(commentsAdapter.commentsIndex).mockResolvedValue(payload);
		const pagination = { page: 1, limit: 10, sort: "asc" as const };

		const result = await commentsService.index(pagination);

		expect(commentsAdapter.commentsIndex).toHaveBeenCalledWith(pagination);
		expect(result).toEqual(payload);
	});

	it("coerces string ids before delegating show to adapter", async () => {
		vi.mocked(commentsAdapter.show).mockResolvedValue({
			id: 12,
			postId: 8,
			name: "Grace",
			email: "grace@example.com",
			body: "Helpful explanation",
		});

		const result = await commentsService.show("12");

		expect(commentsAdapter.show).toHaveBeenCalledWith(12);
		expect(result.id).toBe(12);
	});
});
