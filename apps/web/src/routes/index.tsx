import { createFileRoute } from "@tanstack/react-router";

import { paginationSchema } from "@repo/domains/app/schema";
import { usersIndex } from "@repo/domains/users/functions";

export const Route = createFileRoute("/")({
	component: App,

	validateSearch: paginationSchema,

	loaderDeps: ({ search }) => search,

	loader({ deps }) {
		return usersIndex({ data: deps });
	},
});

function App() {
	const [data, metadata] = Route.useLoaderData();

	return (
		<main className="page-wrap px-4 pb-8 pt-14">
			<pre>{JSON.stringify(data, null, 4)}</pre>
		</main>
	);
}
