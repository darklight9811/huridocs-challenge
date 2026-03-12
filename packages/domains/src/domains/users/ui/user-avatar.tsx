import { Link } from "@tanstack/react-router";

import type { UserSchema } from "../schema";

export function UserAvatar({ data }: { data: UserSchema }) {
	return <Link to="/users/$id" params={{ id: data.id }}></Link>;
}
