import { createEnv } from "@t3-oss/env-core";
import { z } from "zod/v4";

const runtimeEnv =
	typeof process !== "undefined" ? (process.env as Record<string, string | undefined>) : import.meta.env;

const client = createEnv({
	clientPrefix: "VITE_",
	client: {
		VITE_APP_VERSION: z.string().default("0.1.0"),
		VITE_APP_TYPE: z.enum(["dev", "prod"]).default("dev"),
		VITE_APP_URL: z.url().default("http://localhost:3000"),
	},
	runtimeEnv,
	emptyStringAsUndefined: true,
});

export const env = {
	name: "Huridocs",
	version: client.VITE_APP_VERSION,
	type: client.VITE_APP_TYPE,
	app_url: client.VITE_APP_URL,
};
