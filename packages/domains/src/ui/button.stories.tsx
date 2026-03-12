import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "@repo/ds/ui/button";

const meta = {
	title: "DS/Button",
	component: Button,
	args: {
		children: "Button",
		variant: "default",
		size: "default",
		disabled: false,
	},
	argTypes: {
		variant: {
			control: "select",
			options: ["default", "primary", "outline", "secondary", "ghost", "destructive", "link"],
		},
		size: {
			control: "select",
			options: ["default", "xs", "sm", "lg", "icon", "icon-xs", "icon-sm", "icon-lg", "icon-xl"],
		},
	},
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
	render: (args) => (
		<div className="flex flex-wrap items-center gap-2 p-4">
			<Button {...args} variant="default">
				Default
			</Button>
			<Button variant="primary">Primary</Button>
			<Button variant="outline">Outline</Button>
			<Button variant="secondary">Secondary</Button>
			<Button variant="ghost">Ghost</Button>
			<Button variant="destructive">Destructive</Button>
			<Button variant="link">Link</Button>
		</div>
	),
};

export const Sizes: Story = {
	render: (args) => (
		<div className="flex flex-wrap items-center gap-2 p-4">
			<Button {...args} size="xs">
				XS
			</Button>
			<Button size="sm">SM</Button>
			<Button size="default">Default</Button>
			<Button size="lg">LG</Button>
			<Button size="icon">+</Button>
		</div>
	),
};
