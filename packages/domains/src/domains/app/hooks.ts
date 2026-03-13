import { useDebouncedCallback } from "@tanstack/react-pacer/debouncer";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useState } from "react";

import type { PaginationSchema } from "./schema";

export function usePagination() {
	const search = useSearch({ strict: false });
	const navigate = useNavigate();

	const [value, setValue] = useState<Partial<PaginationSchema>>(search || {});

	const onSearch = (value: Partial<PaginationSchema>) => {
		setValue((prev) => ({ ...prev, ...value }));
		navigate({ search: { ...search, ...value } });
	};

	const onSearchDebounce = useDebouncedCallback(
		(value: Partial<PaginationSchema>) => navigate({ search: { ...search, ...value } }),
		{
			wait: 500,
		},
	);

	return [
		{ ...search, ...value },
		onSearch,
		(value: Partial<PaginationSchema>) => {
			setValue((prev) => ({ ...prev, ...value }));
			onSearchDebounce(value);
		},
	] as const;
}
