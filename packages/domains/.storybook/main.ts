import type { StorybookConfig } from "@storybook/react-vite";
import tailwindcss from "@tailwindcss/vite";

const config: StorybookConfig = {
	framework: {
		name: "@storybook/react-vite",
		options: {},
	},
	stories: ["../src/**/*.stories.@(ts|tsx)"],
	addons: ["@storybook/addon-a11y", "@storybook/addon-vitest"],
	staticDirs: ["../../../public"],
	async viteFinal(config) {
		return {
			...config,
			plugins: [...(config.plugins ?? []), tailwindcss()],
			optimizeDeps: {
				...config.optimizeDeps,
				include: ["react", "react-dom", "react-dom/client", "react/jsx-runtime"],
			},
		};
	},
};

export default config;
