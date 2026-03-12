import { describe, expect, it } from "vitest";

import { userSchema } from "./schema";

describe("userSchema", () => {
	it("parses valid users and coerces numeric ids", () => {
		const parsed = userSchema.parse({
			id: "10",
			name: "Ada Lovelace",
			email: "ada@example.com",
			avatar: "https://example.com/avatar.png",
		});

		expect(parsed).toEqual({
			id: 10,
			name: "Ada Lovelace",
			email: "ada@example.com",
			avatar: "https://example.com/avatar.png",
		});
	});

	it("accepts optional address", () => {
		const parsed = userSchema.parse({
			id: 1,
			name: "Grace Hopper",
			email: "grace@example.com",
			avatar: "https://example.com/grace.png",
			address: "Main Street 10",
		});

		expect(parsed.address).toBe("Main Street 10");
	});

	it("rejects invalid email and avatar", () => {
		const result = userSchema.safeParse({
			id: 1,
			name: "John Doe",
			email: "invalid-email",
			avatar: "not-an-url",
		});

		expect(result.success).toBe(false);
	});
});
