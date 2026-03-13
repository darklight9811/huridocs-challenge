import { XIcon } from "lucide-react";
import type { ComponentProps } from "react";

import { Input } from "./input";

export function InputSearch(props: ComponentProps<typeof Input>) {
	return (
		<div className="relative">
			<Input {...props} />
			<button
				className="transition-opacity absolute right-2 top-1.5"
				style={{ opacity: props.value ? 1 : 0 }}
				type="button"
				onClick={(e) => props.onChange?.("", e)}
			>
				<XIcon />
			</button>
		</div>
	);
}
