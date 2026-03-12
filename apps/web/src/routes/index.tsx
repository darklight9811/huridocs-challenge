import { createFileRoute } from "@tanstack/react-router";

import { Input } from "@repo/ds/ui/input";

import { paginationSchema } from "@repo/domains/app/schema";
import { postsIndex } from "@repo/domains/posts/functions";
import { usePostsTable } from "@repo/domains/posts/table";
import { PostRow } from "@repo/domains/posts/ui/post-row";

export const Route = createFileRoute("/")({
	component: App,

	validateSearch: paginationSchema,

	loaderDeps: ({ search }) => search,

	loader({ deps }) {
		return postsIndex({ data: deps });
	},
});

function App() {
	const [data, pagination] = Route.useLoaderData();
	const postsTable = usePostsTable(data, pagination);

	return (
		<>
			<div className="bg-red-500 h-[60vh] flex items-end justify-center pb-[10vh]">
				<div className="max-w-sm w-full mx-auto">
					<Input placeholder="Search posts..." />
				</div>
			</div>

			<main className="flex flex-col gap-2 container mx-auto mt-4">
				{postsTable.getRowModel().rows.map((row) => (
					<PostRow data={row.original} key={row.id} />
				))}
			</main>
		</>
	);
}
