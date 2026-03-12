import z from "zod/v4";

import { t } from "../../../utils/trpc";
import { paginationSchema } from "../../app/schema";
import { postsService } from "./service";

export const postsRouter = t.router({
	index: t.route.input(paginationSchema).query(({ input }) => postsService.index(input)),

	show: t.route.input(z.string()).query(({ input }) => postsService.show(input)),
});
