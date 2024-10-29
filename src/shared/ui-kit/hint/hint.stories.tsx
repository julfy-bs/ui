import Hint from './index.tsx';
import { Meta, StoryObj } from '@storybook/react';
import { Story } from '@storybook/blocks';
import { hintPosition } from './types.ts';

const meta: Meta<typeof Hint> = {
	title: 'UI-kit/Information/Hint',
	component: Hint,
	decorators: [
		(Story, { args }) => {
			return (
				<div style={{ padding: '50px', textAlign: 'center' }}>
					<Story args={{ ...args }} />
				</div>
			);
		},
	],
	argTypes: {
		position: {
			control: { type: 'radio' },
			options: ['Default', 'Center-Bottom', 'Right-Bottom'],
			mapping: {
				Default: undefined,
				'Center-Bottom': hintPosition.centerBottom,
				'Right-Bottom': hintPosition.rightBottom,
			},
		},
	},
	args: {
		children: "I'm some hint text content",
	},
};

export default meta;

type Story = StoryObj<typeof Hint>;

export const HintDefault: Story = {
	args: {},
};
