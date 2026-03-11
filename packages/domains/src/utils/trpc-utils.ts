import { parse, stringify } from "devalue";

export const transformer = {
	deserialize: (object: string) => parse(object),
	serialize: (object: unknown) => stringify(object),
};
