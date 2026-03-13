import { createFileRoute } from "@tanstack/react-router";

import { InputSearch } from "@repo/ds/ui/input-search";
import { Pagination } from "@repo/ds/ui/pagination";

import { env } from "@repo/domains/app/env";
import { usePagination } from "@repo/domains/app/hooks";
import { paginationSchema } from "@repo/domains/app/schema";
import { PaginationLimitSelect } from "@repo/domains/app/ui/pagination-limit-select";
import { PaginationSort } from "@repo/domains/app/ui/pagination-sort";
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
	const [data, metadata] = Route.useLoaderData();
	const [pagination, setPagination, setPaginationDebounced] = usePagination();

	return (
		<>
			<div className="bg-[url(/images/wallpapers/01.jpg)] h-[60vh] flex flex-col items-center justify-center gap-12 relative">
				<div className="bg-linear-to-t from-black to-black/0 absolute top-0 left-0 w-full h-full" />

				<h1 className="text-white text-5xl font-bold z-10">Search incredible posts here</h1>

				<div className="max-w-sm w-full mx-auto z-10">
					<InputSearch
						placeholder="Search posts..."
						value={pagination.q}
						onChange={(value) => setPaginationDebounced({ q: value })}
					/>
				</div>
			</div>

			<main className="flex flex-col gap-4 container mx-auto mt-4 grow">
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
		</>
	);
}
