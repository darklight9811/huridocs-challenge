import type { Meta, StoryObj } from "@storybook/react-vite";

import { mockPost } from "../schema.mock";
import { PostRow } from "./post-row";

const meta = {
	title: "Domains/Posts/PostRow",
	component: PostRow,
	args: {
		data: mockPost.seeded(123),
	},
} satisfies Meta<typeof PostRow>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LongTitle: Story = {
	args: {
		data: mockPost.seeded(123, 1, {
			title: "A much longer post title to verify truncation behavior and overall link container layout in narrow widths",
		}),
	},
};
