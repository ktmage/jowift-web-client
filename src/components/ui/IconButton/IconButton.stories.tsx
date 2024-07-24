import { Meta, StoryObj } from '@storybook/react';
import IconButton from './IconButton';
import SaveIcon from '@mui/icons-material/Save';

const meta = {
	title: 'ui/IconButton',
	component: IconButton,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		disabled: { control: 'boolean' },
		size: { control: { type: 'select', options: ['small', 'medium', 'large'] } },
		variant: { control: { type: 'select', options: ['contained', 'ghost'] } },
		mode: { control: { type: 'select', options: ['primary', 'secondary'] } },
	},
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		children: <SaveIcon />,
		mode: 'primary',
		onClick: () => console.log('Clicked'),
	},
};

export const Secondary: Story = {
	args: {
		children: <SaveIcon />,
		mode: 'secondary',
		onClick: () => console.log('Clicked'),
	},
};

export const Disabled: Story = {
	args: {
		children: <SaveIcon />,
		disabled: true,
		onClick: () => console.log('Clicked'),
	},
};

export const Large: Story = {
	args: {
		children: <SaveIcon />,
		size: 'large',
		onClick: () => console.log('Clicked'),
	},
};

export const Midium: Story = {
	args: {
		children: <SaveIcon />,
		size: 'medium',
		onClick: () => console.log('Clicked'),
	},
};

export const Small: Story = {
	args: {
		children: <SaveIcon />,
		size: 'small',
		onClick: () => console.log('Clicked'),
	},
};

export const Ghost: Story = {
	args: {
		children: <SaveIcon />,
		variant: 'ghost',
		onClick: () => console.log('Clicked'),
	},
};
