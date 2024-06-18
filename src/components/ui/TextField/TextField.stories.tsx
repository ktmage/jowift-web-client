import { Meta, StoryObj } from '@storybook/react';
import TextField from './TextField';

const meta = {
	title: 'ui/TextField',
	component: TextField,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		className: { control: 'text' },
		value: { control: 'text' },
		placeholder: { control: 'text' },
		onChange: { action: 'changed' },
	},
} satisfies Meta<typeof TextField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Empty: Story = {
	args: {
		value: '',
		placeholder: 'Placeholder',
	},
};

export const Body: Story = {
	args: {
		value: 'Body',
		typography: 'body',
	},
};

export const Title: Story = {
	args: {
		value: 'Title',
		typography: 'title',
	},
};

export const Multiline: Story = {
	args: {
		value: 'Multiline\nText',
		placeholder: 'Multiline',
	},
};
