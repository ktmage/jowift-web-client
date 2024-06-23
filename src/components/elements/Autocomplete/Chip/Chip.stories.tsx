import { Meta, StoryObj } from '@storybook/react';
import Chip from './Chip';

const meta = {
	title: 'elements/Autocomplete/Chip',
	component: Chip,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		label: { control: 'text' },
		onDelete: { action: 'deleted' },
		readonly: { control: 'boolean' },
	},
} satisfies Meta<typeof Chip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: 'React',
		onDelete: () => {},
		readonly: false,
	},
};

export const Readonly: Story = {
	args: {
		label: 'React',
		onDelete: () => {},
		readonly: true,
	},
};
