import { describe, expect, it } from "vitest";

import { commentSchema } from "./schema";
import { mockComment } from "./schema.mock";

describe("mockComment", () => {
	it("generates a valid single comment", () => {
		const comment = mockComment.single();
		const parsed = commentSchema.parse(comment);

		expect(parsed).toBeDefined();
		expect(typeof parsed.id).toBe("number");
		expect(typeof parsed.postId).toBe("number");
		expect(parsed.body.length).toBeGreaterThan(0);
	});

	it("applies overrides to single comments", () => {
		const comment = mockComment.single({ id: 99, postId: 15, body: "Custom comment" });

		expect(comment.id).toBe(99);
		expect(comment.postId).toBe(15);
		expect(comment.body).toBe("Custom comment");
	});

	it("generates valid multiple comments", () => {
		const comments = mockComment.many(3);

		expect(comments).toHaveLength(3);
		comments.forEach((comment) => {
			expect(() => commentSchema.parse(comment)).not.toThrow();
		});
	});

	it("supports deterministic seeded generation", () => {
		const commentA = mockComment.seeded(123);
		const commentB = mockComment.seeded(123);

		expect(commentA).toEqual(commentB);
	});
});
