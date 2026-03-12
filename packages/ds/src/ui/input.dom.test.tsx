/* @vitest-environment jsdom */

import "../lib/test-dom-env";

import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Input } from "./input";

describe("Input", () => {
	it("renders provided value and falls back to empty string", () => {
		const view = render(<Input aria-label="Name" value={null} />);

		const input = view.getByRole("textbox", { name: "Name" }) as HTMLInputElement;
		expect(input.value).toBe("");

		view.rerender(<Input aria-label="Name" value="Editorium" />);
		expect(input.value).toBe("Editorium");
	});
});
