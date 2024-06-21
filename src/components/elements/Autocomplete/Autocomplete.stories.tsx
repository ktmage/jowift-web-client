import { Meta, StoryObj } from '@storybook/react';
import Autocomplete from './Autocomplete';

const meta = {
	title: 'elements/Autocomplete',
	component: Autocomplete,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		className: { control: 'text' },
	},
} satisfies Meta<typeof Autocomplete>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		value: '',
	},
};
