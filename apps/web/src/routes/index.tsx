import { createFileRoute } from "@tanstack/react-router";

import { paginationSchema } from "@repo/domains/app/schema";
import { postsIndex } from "@repo/domains/posts/functions";
import { usePostsTable } from "@repo/domains/posts/table";

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
		<main className="page-wrap px-4 pb-8 pt-14">
			{postsTable.getRowModel().rows.map((row) => (
				<div key={row.id}>{row.getValue("id")}</div>
			))}
		</main>
	);
}
