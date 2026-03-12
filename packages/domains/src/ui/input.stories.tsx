import type { Meta, StoryObj } from "@storybook/react-vite";

import { Input } from "@repo/ds/ui/input";

const meta = {
	title: "DS/Input",
	component: Input,
	args: {
		placeholder: "Type here...",
		value: "",
		type: "text",
		disabled: false,
	},
	argTypes: {
		type: {
			control: "select",
			options: ["text", "email", "password", "number", "url"],
		},
	},
	render: (args) => <Input {...args} onChange={() => {}} />,
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Disabled: Story = {
	args: {
		disabled: true,
		value: "Disabled input",
	},
};
