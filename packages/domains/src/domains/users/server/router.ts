import z from "zod/v4";

import { t } from "../../../utils/trpc";
import { paginationSchema } from "../../app/schema";
import { usersService } from "./service";

export const usersRouter = t.router({
	index: t.route.input(paginationSchema).query(({ input }) => usersService.index(input)),

	show: t.route.input(z.string()).query(({ input }) => usersService.show(input)),
});
