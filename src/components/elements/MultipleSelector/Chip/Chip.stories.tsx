import { Meta, StoryObj } from '@storybook/react';
import Chip from './Chip';

const meta = {
	title: 'elements/MultipleSelector/Chip',
	component: Chip,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		label: { control: 'text' },
		onDelete: { action: 'deleted' },
		readOnly: { control: 'boolean' },
	},
} satisfies Meta<typeof Chip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: 'React',
		onDelete: () => {},
		readOnly: false,
	},
};

export const Readonly: Story = {
	args: {
		label: 'React',
		onDelete: () => {},
		readOnly: true,
	},
};
