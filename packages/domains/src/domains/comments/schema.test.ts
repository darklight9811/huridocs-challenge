import { describe, expect, it } from "vitest";

import { commentSchema } from "./schema";

describe("commentSchema", () => {
	it("parses valid comments and coerces numeric ids", () => {
		const parsed = commentSchema.parse({
			id: "10",
			postId: "4",
			name: "A thoughtful title",
			email: "ada@example.com",
			body: "Great post!",
		});

		expect(parsed).toEqual({
			id: 10,
			postId: 4,
			name: "A thoughtful title",
			email: "ada@example.com",
			body: "Great post!",
		});
	});

	it("rejects invalid email", () => {
		const result = commentSchema.safeParse({
			id: 1,
			postId: 2,
			name: "John Doe",
			email: "invalid-email",
			body: "Hello",
		});

		expect(result.success).toBe(false);
	});
});
