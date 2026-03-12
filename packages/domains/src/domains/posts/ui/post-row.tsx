import { Link } from "@tanstack/react-router";

import type { PostSchema } from "../schema";

export function PostRow({ data }: { data: PostSchema }) {
	return (
		<Link to="/posts/$id" params={{ id: data.id }} className="border shadow rounded-lg p-4">
			<p>{data.title}</p>
		</Link>
	);
}
