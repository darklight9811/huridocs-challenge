import { Link } from "@tanstack/react-router";

import type { CommentSchema } from "../schema";

export function CommentRow({ data, displayEmail }: { data: CommentSchema; displayEmail?: boolean }) {
	return (
		<div className="space-y-1">
			<Link to="/posts/$id" params={{ id: data.postId }} className="font-medium hover:underline">
				{data.name}
			</Link>
			{displayEmail && <p className="text-sm text-muted-foreground">{data.email}</p>}
			<p className="text-sm text-muted-foreground">{data.body}</p>
		</div>
	);
}
