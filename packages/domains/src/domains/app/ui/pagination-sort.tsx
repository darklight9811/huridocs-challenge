import { ArrowDownNarrowWideIcon, ArrowUpNarrowWideIcon } from "lucide-react";

import { Button } from "@repo/ds/ui/button";

export function PaginationSort({ value, onChange }: { value: string; onChange: (value: string) => void }) {
	return (
		<Button onClick={() => onChange(value === "asc" ? "desc" : "asc")}>
			{value === "asc" ? <ArrowDownNarrowWideIcon /> : <ArrowUpNarrowWideIcon />}
		</Button>
	);
}
