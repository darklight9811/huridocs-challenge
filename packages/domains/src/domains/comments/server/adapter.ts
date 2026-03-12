import { env } from "../../app/env";
import { commentsAdapterFetch } from "./adapter.fetch";
import { commentsAdapterMock } from "./adapter.mock";

export const commentsAdapter = env.adpater === "fetch" ? commentsAdapterFetch : commentsAdapterMock;
