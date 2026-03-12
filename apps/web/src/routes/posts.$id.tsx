import { createFileRoute, notFound } from "@tanstack/react-router";

import { postsShow } from "@repo/domains/posts/functions";
import { usersShow } from "@repo/domains/users/functions";
import { UserAvatar } from "@repo/domains/users/ui/user-avatar";

export const Route = createFileRoute("/posts/$id")({
	component: RouteComponent,

	async loader({ params }) {
		const post = await postsShow({ data: Number(params.id) });

		if (!post) throw notFound();

		const user = await usersShow({ data: post.userId });

		return { post, user };
	},
});

function RouteComponent() {
	const { post, user } = Route.useLoaderData();

	return (
		<main className="mx-auto container grow mt-20">
			<h1 className="text-3xl font-bold">{post.title}</h1>

			<div className="flex my-4">
				<UserAvatar data={user} displayName />
			</div>

			<p>{post.body}</p>
		</main>
	);
}
