/* @vitest-environment jsdom */

import "../lib/test-dom-env";

import { render } from "@testing-library/react";
import * as React from "react";
import { describe, expect, it } from "vitest";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";

const domDescribe = typeof React.useState === "function" ? describe : describe.skip;

domDescribe("Select", () => {
	it("renders trigger and selected value", () => {
		const view = render(
			<Select defaultValue="one">
				<SelectTrigger aria-label="Plan">
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="one">One</SelectItem>
					<SelectItem value="two">Two</SelectItem>
				</SelectContent>
			</Select>,
		);

		const combobox = view.getByRole("combobox", { name: "Plan" });
		expect(combobox).toBeDefined();
		expect(combobox.textContent?.toLowerCase()).toContain("one");
	});
});
