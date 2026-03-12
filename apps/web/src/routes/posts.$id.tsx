import { createFileRoute, notFound } from "@tanstack/react-router";

import { useCommentsByPost } from "@repo/domains/comments/hooks";
import { CommentRow } from "@repo/domains/comments/ui/comment-row";
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
	const { data: posts } = usePostsByUser(user.id, { limit: 5 });
	const { data: comments } = useCommentsByPost(post.id);

	return (
		<>
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
						{posts?.[0].map((post) => (
							<PostRow key={post.id} data={post} />
						))}
					</div>
				</aside>
			</div>

			<div className="mx-auto container">
				<h2 className="text-2xl font-bold mb-4">Comments</h2>

				<div className="flex flex-col gap-4">
					{comments?.[0].map((comment) => (
						<CommentRow key={comment.id} data={comment} />
					))}
				</div>
			</div>
		</>
	);
}
