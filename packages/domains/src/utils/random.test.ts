import { describe, expect, it } from "vitest";

import { randomCuid2 } from "./random";

describe("randomCuid2", () => {
	it("returns a non-empty string", () => {
		expect(typeof randomCuid2()).toBe("string");
		expect(randomCuid2().length).toBeGreaterThan(0);
	});

	it("generates unique ids on successive calls", () => {
		const ids = new Set(Array.from({ length: 100 }, () => randomCuid2()));

		expect(ids.size).toBe(100);
	});

	it("does not contain whitespace", () => {
		const id = randomCuid2();

		expect(id).not.toMatch(/\s/);
	});

	it("contains only alphanumeric and base-36 characters", () => {
		const id = randomCuid2();

		expect(id).toMatch(/^[a-z0-9]+$/i);
	});
});
