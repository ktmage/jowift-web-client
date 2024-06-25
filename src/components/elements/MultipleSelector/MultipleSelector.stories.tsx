import { Meta, StoryObj } from '@storybook/react';
import MultipleSelector from './MultipleSelector';

const meta = {
	title: 'elements/MultipleSelector',
	component: MultipleSelector,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		options: { control: 'object' },
		value: { control: 'object' },
		placeholder: { control: 'text' },
		onChange: { action: 'changed' },
		onCreate: { action: 'created' },
		readOnly: { control: 'boolean' },
	},
} satisfies Meta<typeof MultipleSelector>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		options: [
			'option1',
			'option2',
			'option3',
			'option4',
			'option5',
			'option6',
			'option7',
			'option8',
			'option9',
			'option10',
		],
		value: ['option1'],
		placeholder: 'Select...',
		onChange: (newTags) => {
			console.log('changed', newTags);
		},
		onCreate: (newTag) => {
			console.log('created', newTag);
		},
	},
};

export const Empty: Story = {
	args: {
		options: [
			'option1',
			'option2',
			'option3',
			'option4',
			'option5',
			'option6',
			'option7',
			'option8',
			'option9',
			'option10',
		],
		value: [],
		placeholder: 'Select...',
		onChange: (newTags) => {
			console.log('changed', newTags);
		},
		onCreate: (newTag) => {
			console.log('created', newTag);
		},
	},
};

export const Multi: Story = {
	args: {
		options: [
			'option1',
			'option2',
			'option3',
			'option4',
			'option5',
			'option6',
			'option7',
			'option8',
			'option9',
			'option10',
		],
		value: ['option1', 'option2'],
		placeholder: 'Select...',
		onChange: (newTags) => {
			console.log('changed', newTags);
		},
		onCreate: (newTag) => {
			console.log('created', newTag);
		},
	},
};
