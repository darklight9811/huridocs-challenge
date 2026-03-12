import { env } from "./env";

type ConfigValue = {
	title?: string;
	description?: string;
	image?: string;
};

export function metadata(config: ConfigValue = {}) {
	const baseTitle = env.name + (env.type === "dev" ? " (dev)" : "");
	const title = config.title ? `${baseTitle} - ${config.title}` : baseTitle;
	const description =
		config.description ||
		"Editorium is a modern platform for storing and sharing your 3d assets. Allowing you to optimize and easily view them online.";
	const url = env.app_url;
	const creator = "@darklight9811";
	const image = config.image || `${url}/brand/open-graph.png`;

	return [
		{
			title,
		},
		{ name: "description", content: description },
		{
			name: "og:description",
			content: description,
		},
		{
			name: "twitter:description",
			content: description,
		},
		/**
		 * ### MARK: OG Metadata
		 */
		{
			property: "og:title",
			content: title,
		},
		{
			property: "og:logo",
			content: `${url}/icon.svg`,
		},
		{
			property: "og:site_name",
			content: env.name,
		},
		{
			property: "og:type",
			content: "website",
		},
		{
			property: "og:url",
			content: url,
		},
		{
			property: "og:creator",
			content: creator,
		},
		{
			property: "og:image",
			content: image,
		},
		/**
		 * ### MARK: Apple Metadata
		 */
		{
			name: "mobile-web-app-capable",
			content: "yes",
		},
		{
			name: "apple-mobile-web-app-capable",
			content: "yes",
		},
		{
			name: "apple-mobile-web-app-title",
			content: env.name,
		},
		{
			name: "apple-mobile-web-app-status-bar-style",
			content: "default",
		},
		/**
		 * ### MARK: Twitter Metadata
		 */
		{
			name: "twitter:card",
			content: "summary_large_image",
		},
		{
			name: "twitter:title",
			content: title,
		},
		{
			name: "twitter:site",
			content: url,
		},
		{
			name: "twitter:creator",
			content: creator,
		},
		{
			name: "twitter:image",
			content: image,
		},
		{
			name: "twitter:image:alt",
			content: title,
		},
		{
			name: "twitter:app:name:iphone",
			content: env.name,
		},
		{
			name: "twitter:app:name:ipad",
			content: env.name,
		},
		{
			name: "twitter:app:name:googleplay",
			content: env.name,
		},
		/**
		 * ### MARK: General Metadata
		 */
		{
			name: "viewport",
			content: "width=device-width, initial-scale=1.0, maximum-scale=1, viewport-fit=cover",
		},
	];
}
