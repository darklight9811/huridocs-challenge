import { createFileRoute } from "@tanstack/react-router";

import { Pagination } from "@repo/ds/ui/pagination";

import { env } from "@repo/domains/app/env";
import { usePagination } from "@repo/domains/app/hooks";
import { paginationSchema } from "@repo/domains/app/schema";
import { PaginationLimitSelect } from "@repo/domains/app/ui/pagination-limit-select";
import { PaginationSort } from "@repo/domains/app/ui/pagination-sort";
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
	const [data, metadata] = Route.useLoaderData();
	const [pagination, setPagination] = usePagination();

	return (
		<main className="flex flex-col gap-4 container mx-auto mt-20 grow">
			<h1 className="font-bold text-3xl">Posts</h1>

			<div className="flex justify-between items-center">
				<span>total: {data.length}</span>

				<div className="flex gap-2">
					<PaginationSort value={pagination.sort} onChange={(value) => setPagination({ sort: value })} />

					<PaginationLimitSelect
						value={pagination.limit || env.pagination.defaultLimit}
						onChange={(value) => setPagination({ limit: value })}
					/>
				</div>
			</div>

			{data.map((post) => (
				<PostRow data={post} key={post.id} />
			))}

			<div>
				<Pagination {...metadata} />
			</div>
		</main>
	);
}
