import { createFileRoute, notFound } from "@tanstack/react-router";
import { MailIcon, MapIcon } from "lucide-react";

import { usersShow } from "@repo/domains/users/functions";
import { UserAvatar } from "@repo/domains/users/ui/user-avatar";

export const Route = createFileRoute("/users/$id")({
	component: RouteComponent,

	async loader({ params }) {
		const user = await usersShow({ data: Number(params.id) });

		if (!user) throw notFound();

		return { user };
	},
});

function RouteComponent() {
	const { user } = Route.useLoaderData();

	return (
		<main className="mx-auto container grow mt-20">
			<h1 className="text-3xl font-bold">
				<UserAvatar data={user} displayName />
			</h1>

			<div className="flex my-4 gap-2 items-center">
				<MailIcon size={16} /> {user.email}
			</div>

			<div className="flex gap-2 items-center">
				<MapIcon size={16} /> {user.address}
			</div>
		</main>
	);
}
