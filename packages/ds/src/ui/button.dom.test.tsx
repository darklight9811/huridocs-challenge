/* @vitest-environment jsdom */

import "../lib/test-dom-env";

import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Button } from "./button";

describe("Button", () => {
	it("handles click and defaults type to button", () => {
		const onClick = vi.fn();

		const view = render(<Button onClick={onClick}>Save</Button>);

		const button = view.getByRole("button", { name: "Save" });
		expect(button.getAttribute("type")).toBe("button");

		fireEvent.click(button);
		expect(onClick).toHaveBeenCalledTimes(1);
	});
});
