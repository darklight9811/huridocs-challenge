import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ds/ui/select";

export function PaginationLimitSelect({
	value,
	onChange,
}: {
	value: string | number;
	onChange: (value: number) => void;
}) {
	return (
		<Select value={String(value)} onValueChange={(e) => onChange(Number(e))}>
			<SelectTrigger>
				<SelectValue placeholder="Select page" />
			</SelectTrigger>

			<SelectContent>
				<SelectItem value="5">5</SelectItem>
				<SelectItem value="10">10</SelectItem>
				<SelectItem value="20">20</SelectItem>
			</SelectContent>
		</Select>
	);
}
