import { createServerFn } from "@tanstack/react-start";
import { z } from "zod/v4";

import { paginationSchema } from "../app/schema";
import { usersService } from "./server/service";

export const usersIndex = createServerFn()
	.inputValidator(paginationSchema)
	.handler(({ data }) => usersService.index(data));

export const usersShow = createServerFn()
	.inputValidator(z.string())
	.handler(({ data }) => usersService.show(data));
