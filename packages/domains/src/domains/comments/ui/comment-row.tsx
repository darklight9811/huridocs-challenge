import { Link } from "@tanstack/react-router";

import { Avatar } from "@repo/ds/ui/avatar";

import type { CommentSchema } from "../schema";

export function CommentRow({ data }: { data: CommentSchema }) {
	return (
		<div className="space-y-1">
			<Link
				to="/posts/$id"
				params={{ id: data.postId }}
				className="font-medium hover:underline flex gap-2 items-center"
			>
				<Avatar className="size-10" label={data.name} />
				<div>
					{data.name}
					<p className="text-sm text-muted-foreground">{data.email}</p>
				</div>
			</Link>
			<p className="text-sm text-muted-foreground">{data.body}</p>
		</div>
	);
}
