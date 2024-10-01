import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button.tsx';
import { ButtonColor, ButtonType } from './types';

const meta: Meta<typeof Button> = {
	title: 'UI-kit/Controls/Button',
	component: Button,
	parameters: {
		tag: 'centered',
	},
	tags: ['autodocs'],
	args: {
		color: ButtonColor.blue,
		countAccent: false,
		rounded: false,
		disabled: false,
		waiting: false,
		type: ButtonType.button,

	},
	argTypes: {
		color: {
			name: 'color',
			options: Object.values(ButtonColor),
			mapping: Object.values(ButtonColor),
			control: {
				type: 'select',
				labels: Object.keys(ButtonColor),
			},
			description: 'Button color',
		},
		count: {
			name: 'count',
			control: 'number',
			description: 'Counter in circle',
		},
		countAccent: {
			name: 'countAccent',
			control: 'boolean',
			description: 'Override counter colors with accent color',
		},
		rounded: {
			name: 'rounded',
			control: 'boolean',
			description: 'Is button rounded',
		},
		disabled: {
			name: 'disabled',
			control: 'boolean',
			description: 'Is button disabled',
		},
		waiting: {
			name: 'waiting',
			control: 'boolean',
			description: 'Is button waiting',
		},
		onClick: {
			name: 'onClick',
			description: 'Click handler',
		},
		type: {
			name: 'type',
			options: Object.values(ButtonType),
			mapping: Object.values(ButtonType),
			control: {
				type: 'select',
				labels: Object.keys(ButtonType),
			},
			description: 'Button type',
		},
	},
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Blue: Story = {
	args: { color: ButtonColor.blue, children: 'Button Text' },
};

export const Primary: Story = {
	args: { color: ButtonColor.primary, children: 'Button Text' },
};

export const PrimaryDisabled: Story = {
	args: {
		color: ButtonColor.primary,
		disabled: true,
		children: 'Button Text',
	},
};

export const PrimaryWaiting: Story = {
	args: {
		color: ButtonColor.primary,
		waiting: true,
		children: 'Button Text',
	},
};

export const PrimaryWithCounter: Story = {
	args: {
		color: ButtonColor.primary,
		count: 2,
		children: 'Button Text',
	},
};

export const Secondary: Story = {
	args: { color: ButtonColor.secondary, children: 'Button Text' },
};

export const Outline: Story = {
	args: { color: ButtonColor.outline, children: 'Button Text' },
};

export const OutlineWithCounter: Story = {
	args: {
		color: ButtonColor.outline,
		count: 2,
		children: 'Button Text',
	},
};

export const OutlineWithAccentCounter: Story = {
	args: {
		color: ButtonColor.outline,
		count: 2,
		countAccent: true,
		children: 'Button Text',
	},
};
