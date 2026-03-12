import { Link } from "@tanstack/react-router";

import type { PostSchema } from "../schema";

export function PostRow({ data }: { data: PostSchema }) {
	return (
		<Link
			to="/posts/$id"
			params={{ id: data.id }}
			className="border shadow rounded-lg p-4 w-full flex gap-2 flex-col"
		>
			<div className="text-xs text-muted-foreground">#{data.id}</div>
			<div className="font-bold h-6 overflow-hidden text-ellipsis">{data.title}</div>
		</Link>
	);
}
