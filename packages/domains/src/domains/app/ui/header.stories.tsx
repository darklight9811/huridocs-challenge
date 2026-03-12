import type { Meta, StoryObj } from "@storybook/react-vite";

import { Header } from "./header";

const meta = {
	title: "Domains/App/Header",
	component: Header,
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
