// biome-ignore lint/suspicious/noExplicitAny: simplify type declaration
type Callbacks = Partial<Record<"onError" | "onSuccess" | "onSettled" | "onMutate", (...args: any[]) => unknown>>;

export type MutationCallbacks<
	Mutation extends {
		mutationOptions: () => Callbacks;
	},
	Options extends Callbacks = ReturnType<Mutation["mutationOptions"]>,
> = Pick<Options, "onError" | "onSuccess">;
