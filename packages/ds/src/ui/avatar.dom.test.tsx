/* @vitest-environment jsdom */

import "../lib/test-dom-env";

import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Avatar, AvatarBadge, AvatarContainer } from "./avatar";

describe("Avatar", () => {
	it("renders an uppercase fallback from the label when there is no image", () => {
		const view = render(<Avatar label="editorium" />);

		expect(view.getByText("E")).not.toBeNull();
		expect(view.container.querySelector('[data-slot="avatar"]')?.getAttribute("data-size")).toBe("default");
	});

	it("renders an image element when an image source is provided", () => {
		const view = render(<Avatar label="editorium" image="/images/avatar.png" />);

		expect(view.container.querySelector('[data-slot="avatar-image"]')?.getAttribute("src")).toBe(
			"/images/avatar.png",
		);
	});

	it("preserves container sizing props for composition helpers", () => {
		const view = render(
			<AvatarContainer size="lg">
				<AvatarBadge data-testid="badge" />
			</AvatarContainer>,
		);

		expect(view.container.querySelector('[data-slot="avatar"]')?.getAttribute("data-size")).toBe("lg");
		expect(view.getByTestId("badge").getAttribute("data-slot")).toBe("avatar-badge");
	});
});
