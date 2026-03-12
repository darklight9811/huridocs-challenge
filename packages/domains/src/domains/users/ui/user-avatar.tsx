import { Link } from "@tanstack/react-router";

import { Avatar } from "@repo/ds/ui/avatar";

import type { UserSchema } from "../schema";

export function UserAvatar({ data, displayName }: { data: UserSchema; displayName?: boolean }) {
	return (
		<Link to="/users/$id" params={{ id: data.id }} className="flex items-center">
			<Avatar image={data.avatar} label={data.name} />
			{displayName && <span className="ml-2">{data.name}</span>}
		</Link>
	);
}
