import { createFileRoute } from "@tanstack/react-router";

import { Input } from "@repo/ds/ui/input";

import { paginationSchema } from "@repo/domains/app/schema";
import { postsIndex } from "@repo/domains/posts/functions";
import { PostRow } from "@repo/domains/posts/ui/post-row";

export const Route = createFileRoute("/")({
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
		<>
			<div className="bg-[url(/images/wallpapers/01.jpg)] h-[60vh] flex flex-col items-center justify-center gap-12 relative">
				<div className="bg-linear-to-t from-black to-black/0 absolute top-0 left-0 w-full h-full" />

				<h1 className="text-white text-5xl font-bold z-10">Search incredible posts here</h1>

				<div className="max-w-sm w-full mx-auto z-10">
					<Input placeholder="Search posts..." />
				</div>
			</div>

			<main className="flex flex-col gap-4 container mx-auto mt-4 grow">
				<div>
					<span>total: {pagination.total}</span>
				</div>

				{data.map((post) => (
					<PostRow data={post} key={post.id} />
				))}
			</main>
		</>
	);
}
