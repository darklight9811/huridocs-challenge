import { env } from "../../app/env";
import { usersAdapterFetch } from "./adapter.fetch";
import { usersAdapterMock } from "./adapter.mock";

export const usersAdapter = env.adpater === "fetch" ? usersAdapterFetch : usersAdapterMock;