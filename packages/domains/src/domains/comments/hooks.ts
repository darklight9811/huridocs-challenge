import { useQuery } from "@tanstack/react-query";

import { commentsIndex } from "./functions";
import type { CommentPaginationSchema } from "./schema";

export function useCommentsByPost(postId: number, pagination?: CommentPaginationSchema) {
	return useQuery({
		queryKey: ["comments", "post", postId, pagination] as const,
		queryFn: ({ queryKey: [, , postId, pagination = {}] }) => commentsIndex({ data: { postId, ...pagination } }),
	});
}
