import type { Meta, StoryObj } from "@storybook/react-vite";

import {
	AvatarBadge,
	AvatarContainer,
	AvatarFallback,
	AvatarGroup,
	AvatarGroupCount,
	AvatarImage,
} from "@repo/ds/ui/avatar";

const meta = {
	title: "DS/Avatar",
	component: AvatarContainer,
} satisfies Meta<typeof AvatarContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => (
		<div className="flex items-center gap-4 p-4">
			<AvatarContainer {...args}>
				<AvatarImage src="https://i.pravatar.cc/80?img=12" alt="User" />
				<AvatarFallback>RC</AvatarFallback>
				<AvatarBadge />
			</AvatarContainer>
			<AvatarGroup>
				<AvatarContainer size="sm">
					<AvatarFallback>A</AvatarFallback>
				</AvatarContainer>
				<AvatarContainer size="sm">
					<AvatarFallback>B</AvatarFallback>
				</AvatarContainer>
				<AvatarGroupCount>+3</AvatarGroupCount>
			</AvatarGroup>
		</div>
	),
};
