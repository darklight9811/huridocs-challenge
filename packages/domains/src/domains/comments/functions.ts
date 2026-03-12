import { createServerFn } from "@tanstack/react-start";
import { z } from "zod/v4";

import { commentPaginationSchema } from "./schema";
import { commentsService } from "./server/service";

export const commentsIndex = createServerFn()
	.inputValidator(commentPaginationSchema)
	.handler(({ data }) => commentsService.index(data));

export const commentsShow = createServerFn()
	.inputValidator(z.number())
	.handler(({ data }) => commentsService.show(data));
