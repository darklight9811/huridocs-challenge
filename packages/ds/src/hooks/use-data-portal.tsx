import { observable } from "@legendapp/state";
import { use$ } from "@legendapp/state/react";
import type { ZodType, z } from "zod/v4";

const dataPortal$ = observable({
	data: {} as Record<string, unknown>,
});

export function useDataPortal<Schema extends ZodType>(
	id: string,
	schema: Schema,
): {
	open(data: z.infer<Schema>): void;
	open(id: string, data: z.infer<Schema>): void;
	close(): void;
	close(id: string): void;
	data: z.infer<Schema> | undefined;
} {
	const source = use$(() => dataPortal$.data[id]);

	return {
		data: source ? schema.safeParse(source)?.data : undefined,
		open(dataOrId: string | z.infer<Schema>, data?: z.infer<Schema>) {
			if (typeof dataOrId === "string" && schema.safeParse(data).success) {
				dataPortal$.data[dataOrId].set(data as unknown as {});
			} else {
				dataPortal$.data[id].set(dataOrId as unknown as {});
			}
		},
		close(idToClose?: string) {
			if (idToClose) {
				dataPortal$.data[idToClose].delete();
			} else {
				dataPortal$.data[id].delete();
			}
		},
	};
}
