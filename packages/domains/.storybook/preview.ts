/// <reference path="./override.d.ts" />

import "@repo/ds/style";

import type { Preview } from "@storybook/react-vite";
import { QueryClientProvider } from "@tanstack/react-query";
import { createMemoryHistory, createRootRoute, createRouter, RouterProvider } from "@tanstack/react-router";
import { createElement } from "react";

import { queryClient } from "../src/domains/app/query";

const preview: Preview = {
	beforeEach() {
		queryClient.clear();
	},
	decorators: [
		(Story) => {
			const rootRoute = createRootRoute({
				component: () => createElement(Story),
			});

			const router = createRouter({
				routeTree: rootRoute,
				history: createMemoryHistory({
					initialEntries: ["/"],
				}),
			});

			return createElement(
				QueryClientProvider,
				{ client: queryClient },
				createElement(RouterProvider, { router }),
			);
		},
	],
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		a11y: {
			options: {
				runOnly: ["wcag2a", "wcag2aa", "wcag21aa"],
			},
		},
	},
};

export default preview;
