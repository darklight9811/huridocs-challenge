import { createMockGenerator } from "../../utils/mock-generator";
import { randomCuid2 } from "../../utils/random";

export const mockKeyValue = createMockGenerator({
	generator: ({ faker }) => {
		return {
			id: randomCuid2(),
			key: `${faker.word.noun()}_key`,
			value: faker.datatype.boolean(0.5)
				? { data: faker.word.noun() }
				: faker.datatype.boolean(0.5)
					? faker.number.int()
					: faker.word.noun(),
		};
	},
});
