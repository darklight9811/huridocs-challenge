import { createFileRoute, notFound } from "@tanstack/react-router";

import { postsShow } from "@repo/domains/posts/functions";
import { usePostsByUser } from "@repo/domains/posts/hooks";
import { PostRow } from "@repo/domains/posts/ui/post-row";
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
	const { data } = usePostsByUser(user.id, { limit: 5 });

	return (
		<div className="flex flex-col mt-20 md:flex-row grow mx-auto container gap-2">
			<main className="grow">
				<h1 className="text-3xl font-bold">{post.title}</h1>

				<div className="flex my-4">
					<UserAvatar data={user} displayName />
				</div>

				<p>{post.body}</p>
			</main>

			<aside className="w-1/4">
				<p className="font-bold mb-4">Related</p>

				<div className="flex flex-col gap-2">
					{data?.[0].map((post) => (
						<PostRow key={post.id} data={post} />
					))}
				</div>
			</aside>
		</div>
	);
}
