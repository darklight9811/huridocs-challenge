import { useDebouncedCallback } from "@tanstack/react-pacer/debouncer";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { Input } from "@repo/ds/ui/input";
import { Pagination } from "@repo/ds/ui/pagination";

import { env } from "@repo/domains/app/env";
import { type PaginationSchema, paginationSchema } from "@repo/domains/app/schema";
import { PaginationSelect } from "@repo/domains/app/ui/pagination-select";
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
	const search = Route.useSearch();
	const navigate = Route.useNavigate();
	const [data, metadata] = Route.useLoaderData();

	const [value, setValue] = useState(search?.q || "");

	const onSearch = (value: Partial<PaginationSchema>) => navigate({ search: { ...search, ...value } });

	const onSearchDebounce = useDebouncedCallback(onSearch, {
		wait: 500,
	});

	return (
		<>
			<div className="bg-[url(/images/wallpapers/01.jpg)] h-[60vh] flex flex-col items-center justify-center gap-12 relative">
				<div className="bg-linear-to-t from-black to-black/0 absolute top-0 left-0 w-full h-full" />

				<h1 className="text-white text-5xl font-bold z-10">Search incredible posts here</h1>

				<div className="max-w-sm w-full mx-auto z-10">
					<Input
						placeholder="Search posts..."
						value={value}
						onChange={(value) => {
							setValue(value);
							onSearchDebounce({ q: value });
						}}
					/>
				</div>
			</div>

			<main className="flex flex-col gap-4 container mx-auto mt-4 grow">
				<div className="flex justify-between items-center">
					<span>total: {data.length}</span>

					<PaginationSelect
						value={search?.limit || env.pagination.defaultLimit}
						onChange={(value) => onSearch({ limit: value })}
					/>
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
