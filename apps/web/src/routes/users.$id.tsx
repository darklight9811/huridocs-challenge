import { createFileRoute, notFound } from "@tanstack/react-router";
import { MailIcon, MapIcon } from "lucide-react";

import { usePostsByUser } from "@repo/domains/posts/hooks";
import { PostRow } from "@repo/domains/posts/ui/post-row";
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
	const { data } = usePostsByUser(user.id, { limit: 5 });

	return (
		<div className="flex flex-col mt-20 md:flex-row grow mx-auto container">
			<main className="grow">
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

			<aside className="w-1/4">
				<p className="font-bold mb-4">Posts by user</p>

				<div className="flex flex-col gap-2">
					{data?.[0].map((post) => (
						<PostRow key={post.id} data={post} />
					))}
				</div>
			</aside>
		</div>
	);
}
