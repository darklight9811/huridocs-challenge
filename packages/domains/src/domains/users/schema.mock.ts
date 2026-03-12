import { createMockGenerator } from "../../utils/mock-generator";

export const mockUser = createMockGenerator({
	generator: ({ faker }) => {
		return {
			id: faker.number.int(),
			name: faker.person.fullName(),
			email: faker.internet.email(),
			avatar: faker.image.avatar(),
			address: faker.location.streetAddress(),
		};
	},
});
