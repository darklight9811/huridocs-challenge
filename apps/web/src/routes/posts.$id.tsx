import { createFileRoute, notFound } from "@tanstack/react-router";

import { postsShow } from "@repo/domains/posts/functions";

export const Route = createFileRoute("/posts/$id")({
	component: RouteComponent,

	loader({ params }) {
		if (!params.id) throw notFound();

		return postsShow({ data: params.id });
	},
});

function RouteComponent() {
	const data = Route.useLoaderData();

	return (
		<main className="mx-auto container grow mt-20">
			<h1 className="text-3xl font-bold">{data.title}</h1>
		</main>
	);
}
