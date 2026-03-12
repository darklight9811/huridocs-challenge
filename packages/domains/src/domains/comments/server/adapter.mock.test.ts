import { describe, expect, it } from "vitest";

import { commentsAdapterMock } from "./adapter.mock";

describe("commentsAdapterMock", () => {
	it("returns requested amount of comments with matching pagination metadata", () => {
		const [comments, meta] = commentsAdapterMock.commentsIndex({
			page: 2,
			limit: 5,
			sort: "asc",
			q: "ada",
		});

		expect(comments).toHaveLength(5);
		expect(meta).toEqual({
			page: 2,
			limit: 5,
			sort: "asc",
			q: "ada",
			total: 5,
		});
	});

	it("defaults to 20 comments when no limit is provided", () => {
		const [comments, meta] = commentsAdapterMock.commentsIndex({});

		expect(comments).toHaveLength(20);
		expect(meta.total).toBe(20);
	});

	it("returns a comment with the requested id", () => {
		const comment = commentsAdapterMock.show(42);

		expect(comment.id).toBe(42);
	});
});
