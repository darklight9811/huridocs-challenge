import { Link } from "@tanstack/react-router";

import type { PostSchema } from "../schema";

export function UserAvatar({ data }: { data: PostSchema }) {
	return <Link to="/users/$id" params={{ id: data.userId }}></Link>;
}
