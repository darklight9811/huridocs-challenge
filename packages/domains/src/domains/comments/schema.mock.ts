import { createMockGenerator } from "../../utils/mock-generator";

export const mockComment = createMockGenerator({
	generator: ({ faker }) => {
		return {
			id: faker.number.int(),
			postId: faker.number.int({ min: 1, max: 100 }),
			name: faker.lorem.sentence(),
			email: faker.internet.email(),
			body: faker.lorem.paragraphs(2),
		};
	},
});
