import { createMockGenerator } from "../../utils/mock-generator";

export const mockPost = createMockGenerator({
	generator: ({ faker }) => {
		return {
			id: faker.number.int(),
			title: faker.lorem.sentence(),
			body: faker.lorem.paragraphs(3),
			userId: faker.number.int({ min: 1, max: 20 }),
		};
	},
});
