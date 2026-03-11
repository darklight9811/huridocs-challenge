import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";

export default defineConfig((config) => ({
	publicDir: "../../public",
	
	resolve: {
		tsconfigPaths: true,
	},

	plugins: [
		devtools(),
		tailwindcss(),
		...[config.command === "build" ? [nitro()] : []],
		tanstackStart(),
		viteReact(),
	],
}));
