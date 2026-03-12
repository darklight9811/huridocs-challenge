/* @vitest-environment jsdom */

import "../lib/test-dom-env";

import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Pagination } from "./pagination";

vi.mock("@tanstack/react-router", () => ({
	Link: ({ children, to, ...props }: { children?: React.ReactNode; to: string }) => (
		<a href={to} {...props}>
			{children}
		</a>
	),
}));

describe("Pagination", () => {
	it("renders page links, the active page, and previous/next controls", () => {
		const view = render(<Pagination page={2} pages={4} />);

		expect(view.getByRole("navigation", { name: "pagination" })).not.toBeNull();
		expect(view.getByRole("link", { name: "1" }).getAttribute("href")).toBe("?page=1");
		expect(view.getByRole("link", { name: "2" }).getAttribute("aria-current")).toBe("page");
		expect(view.getByRole("link", { name: "3" }).getAttribute("href")).toBe("?page=3");

		const links = view.getAllByRole("link");
		expect(links[0]?.getAttribute("href")).toBe("?page=1");
		expect(links[links.length - 1]?.getAttribute("href")).toBe("?page=3");
	});

	it("omits previous or next controls at the edges and hides a single page", () => {
		const view = render(<Pagination page={1} pages={3} />);

		expect(view.getAllByRole("link")).toHaveLength(4);
		expect(view.getAllByRole("link")[0]?.getAttribute("href")).toBe("?page=1");
		const firstPageLinks = view.getAllByRole("link");
		expect(firstPageLinks[firstPageLinks.length - 1]?.getAttribute("href")).toBe("?page=2");

		view.rerender(<Pagination page={3} pages={3} />);
		const lastPageLinks = view.getAllByRole("link");
		expect(lastPageLinks).toHaveLength(4);
		expect(lastPageLinks[0]?.getAttribute("href")).toBe("?page=2");
		expect(lastPageLinks[lastPageLinks.length - 1]?.getAttribute("href")).toBe("?page=3");

		view.rerender(<Pagination page={1} pages={1} />);
		expect(view.queryByRole("navigation", { name: "pagination" })).toBeNull();
	});
});
