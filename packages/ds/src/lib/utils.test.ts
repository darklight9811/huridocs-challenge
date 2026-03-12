import { describe, expect, it } from "vitest";

import { cn } from "./utils";

describe("cn", () => {
	it("merges conditional classes", () => {
		const classes = cn("base", false && "never", true && "active");

		expect(classes).toBe("base active");
	});

	it("resolves conflicting tailwind classes with last one winning", () => {
		const classes = cn("px-2", "px-4", "text-sm", "text-lg");

		expect(classes).toContain("px-4");
		expect(classes).toContain("text-lg");
		expect(classes).not.toContain("px-2");
		expect(classes).not.toContain("text-sm");
	});
});
