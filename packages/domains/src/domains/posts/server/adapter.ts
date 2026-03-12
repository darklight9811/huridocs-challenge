import { env } from "../../app/env";
import { postsAdapterFetch } from "./adapter.fetch";
import { postsAdapterMock } from "./adapter.mock";

export const postsAdapter = env.adpater === "fetch" ? postsAdapterFetch : postsAdapterMock;
