import { describe, expect, it } from "vitest";

import { metadata } from "./metadata";

describe("metadata", () => {
	it("returns default metadata values", () => {
		const tags = metadata();

		expect(tags[0]).toEqual({ title: expect.stringContaining("Editorium") });
		expect(tags).toContainEqual({ name: "description", content: expect.stringContaining("Editorium is a modern") });
		expect(tags).toContainEqual({
			property: "og:image",
			content: expect.stringContaining("/brand/open-graph.png"),
		});
	});

	it("applies custom title, description and image", () => {
		const tags = metadata({
			title: "Assets",
			description: "Custom description",
			image: "https://cdn.example.com/image.png",
		});

		expect(tags[0]).toEqual({ title: expect.stringContaining("Assets") });
		expect(tags).toContainEqual({ name: "description", content: "Custom description" });
		expect(tags).toContainEqual({ property: "og:image", content: "https://cdn.example.com/image.png" });
	});
});
