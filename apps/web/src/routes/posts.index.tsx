import { createFileRoute } from "@tanstack/react-router";

import { paginationSchema } from "@repo/domains/app/schema";
import { postsIndex } from "@repo/domains/posts/functions";
import { PostRow } from "@repo/domains/posts/ui/post-row";

export const Route = createFileRoute("/posts/")({
	component: App,

	validateSearch: paginationSchema,

	loaderDeps: ({ search }) => ({ ...search }),

	loader({ deps }) {
		return postsIndex({ data: deps });
	},
});

function App() {
	const [data, pagination] = Route.useLoaderData();

	return (
		<main className="flex flex-col gap-4 container mx-auto mt-20 grow">
			<h1 className="font-bold text-3xl">Posts</h1>

			<div>
				<span>total: {pagination.total}</span>
			</div>

			{data.map((post) => (
				<PostRow data={post} key={post.id} />
			))}
		</main>
	)
}
