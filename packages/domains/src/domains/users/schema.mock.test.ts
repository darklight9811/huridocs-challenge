import { describe, expect, it } from "vitest";

import { userSchema } from "./schema";
import { mockUser } from "./schema.mock";

describe("mockUser", () => {
	it("generates a valid single user", () => {
		const user = mockUser.single();
		const parsed = userSchema.parse(user);

		expect(parsed).toBeDefined();
		expect(typeof parsed.id).toBe("number");
		expect(parsed.name.length).toBeGreaterThan(0);
	});

	it("applies overrides to single users", () => {
		const user = mockUser.single({ id: 99, name: "Custom User" });

		expect(user.id).toBe(99);
		expect(user.name).toBe("Custom User");
	});

	it("generates valid multiple users", () => {
		const users = mockUser.many(3);

		expect(users).toHaveLength(3);
		users.forEach((user) => {
			expect(() => userSchema.parse(user)).not.toThrow();
		});
	});

	it("supports deterministic seeded generation", () => {
		const userA = mockUser.seeded(123);
		const userB = mockUser.seeded(123);

		expect(userA).toEqual(userB);
	});
});
