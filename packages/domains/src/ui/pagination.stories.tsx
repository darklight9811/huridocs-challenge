import type { Meta, StoryObj } from "@storybook/react-vite";

import { PaginationContent, PaginationEllipsis, PaginationItem, PaginationWrapper } from "@repo/ds/ui/pagination";

const meta = {
	title: "DS/Pagination",
	component: PaginationWrapper,
} satisfies Meta<typeof PaginationWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => (
		<div className="p-4">
			<PaginationWrapper {...args}>
				<PaginationContent>
					<PaginationItem className="rounded-md border px-3 py-1 text-sm">1</PaginationItem>
					<PaginationItem className="rounded-md border px-3 py-1 text-sm">2</PaginationItem>
					<PaginationEllipsis />
					<PaginationItem className="rounded-md border px-3 py-1 text-sm">10</PaginationItem>
				</PaginationContent>
			</PaginationWrapper>
		</div>
	),
};
