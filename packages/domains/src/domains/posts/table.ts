import {
	createColumnHelper,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";

import type { PaginationSchema } from "../app/schema";
import type { PostSchema } from "./schema";

const columnHelper = createColumnHelper<PostSchema>();

export const postColumns = [
	columnHelper.accessor("id", {
		cell: (info) => info.getValue(),
		header: () => "ID",
	}),
	columnHelper.accessor("title", {
		cell: (info) => info.getValue(),
		header: () => "Title",
	}),
	columnHelper.accessor("body", {
		cell: (info) => info.getValue(),
		header: () => "Body",
	}),
	columnHelper.accessor("userId", {
		cell: (info) => info.getValue(),
		header: () => "User ID",
	}),
];

export function usePostsTable(data: PostSchema[], pagination: PaginationSchema) {
	return useReactTable({
		columns: postColumns,
		data,
		state: {
			pagination: {
				pageIndex: pagination.page - 1,
				pageSize: pagination.limit,
			},
		},
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
	});
}
