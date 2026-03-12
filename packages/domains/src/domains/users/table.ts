import {
	createColumnHelper,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";

import type { PaginationSchema } from "../app/schema";
import type { UserSchema } from "./schema";

const columnHelper = createColumnHelper<UserSchema>();

export const userColumns = [
	columnHelper.accessor("id", {
		cell: (info) => info.getValue(),
		header: () => "ID",
	}),
	columnHelper.accessor("name", {
		cell: (info) => info.getValue(),
		header: () => "Name",
	}),
	columnHelper.accessor("email", {
		cell: (info) => info.getValue(),
		header: () => "Email",
	}),
	columnHelper.accessor("avatar", {
		cell: (info) => info.getValue(),
		header: () => "Avatar",
	}),
	columnHelper.accessor("address", {
		cell: (info) => info.getValue(),
		header: () => "Address",
	}),
];

export function useUsersTable(data: UserSchema[], pagination: PaginationSchema) {
	return useReactTable({
		columns: userColumns,
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
