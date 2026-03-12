import { createServerFn } from "@tanstack/react-start";
import { z } from "zod/v4";

import { paginationSchema } from "../app/schema";
import { postsService } from "./server/service";

export const postsIndex = createServerFn()
	.inputValidator(paginationSchema)
	.handler(({ data }) => postsService.index(data));

export const postsShow = createServerFn()
	.inputValidator(z.string())
	.handler(({ data }) => postsService.show(data));
