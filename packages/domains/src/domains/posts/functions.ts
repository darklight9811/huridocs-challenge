import { createServerFn } from "@tanstack/react-start";
import { z } from "zod/v4";

import { postPaginationSchema } from "./schema";
import { postsService } from "./server/service";

export const postsIndex = createServerFn()
	.inputValidator(postPaginationSchema)
	.handler(({ data }) => postsService.index(data));

export const postsShow = createServerFn()
	.inputValidator(z.number())
	.handler(({ data }) => postsService.show(data));
