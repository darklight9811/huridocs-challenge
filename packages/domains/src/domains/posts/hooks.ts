import { useQuery } from "@tanstack/react-query";

import type { PaginationSchema } from "../app/schema";
import { postsIndex } from "./functions";

export function usePostsByUser(userId: number, pagination?: PaginationSchema) {
	return useQuery({
		queryKey: ["posts", "user", userId, pagination] as const,
		queryFn: ({ queryKey: [, , userId, pagination = {}] }) => postsIndex({ data: { userId, ...pagination } }),
	});
}
