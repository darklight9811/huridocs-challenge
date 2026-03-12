import { afterEach, describe, expect, it, vi } from "vitest";

import { commentsAdapterFetch } from "./adapter.fetch";

describe("commentsAdapterFetch", () => {
	afterEach(() => {
		vi.restoreAllMocks();
		vi.unstubAllGlobals();
	});

	it("fetches comments index and returns paginated data", async () => {
		const payload = [
			{
				id: 2,
				postId: 1,
				name: "Second comment",
				email: "grace@example.com",
				body: "Body B",
			},
			{
				id: 1,
				postId: 1,
				name: "First comment",
				email: "ada@example.com",
				body: "Body A",
			},
			{
				id: 3,
				postId: 2,
				name: "Third comment",
				email: "linus@example.com",
				body: "Body C",
			},
		];
		const fetchMock = vi.fn().mockResolvedValue({ json: vi.fn().mockResolvedValue(payload) });
		vi.stubGlobal("fetch", fetchMock);

		const [comments, meta] = await commentsAdapterFetch.commentsIndex({
			page: 1,
			limit: 2,
			sort: "asc",
			order: "name",
		});

		expect(fetchMock).toHaveBeenCalledWith("https://api.mydummyapi.com/comments");
		expect(comments).toHaveLength(2);
		expect(comments[0]?.name).toBe("First comment");
		expect(comments[1]?.name).toBe("Second comment");
		expect(meta.page).toBe(1);
		expect(meta.limit).toBe(2);
		expect(typeof meta.total).toBe("number");
	});

	it("fetches and parses a single comment", async () => {
		const payload = {
			id: "7",
			postId: "3",
			name: "Helpful comment",
			email: "margaret@example.com",
			body: "Nice writeup",
		};
		const fetchMock = vi.fn().mockResolvedValue({ json: vi.fn().mockResolvedValue(payload) });
		vi.stubGlobal("fetch", fetchMock);

		const comment = await commentsAdapterFetch.show(7);

		expect(fetchMock).toHaveBeenCalledWith("https://api.mydummyapi.com/comments/7");
		expect(comment.id).toBe(7);
		expect(comment.postId).toBe(3);
		expect(comment.name).toBe("Helpful comment");
	});
});
