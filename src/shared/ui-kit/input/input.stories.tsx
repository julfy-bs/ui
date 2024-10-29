import type { Meta, StoryObj } from '@storybook/react';

import Input from './index.tsx';
import React, { useCallback, useEffect } from 'react';
import Hint from '../hint';

import { useArgs } from '@storybook/preview-api';
import { hintPosition } from '../hint/types.ts';
import { ClearButtonPositions } from './types.ts';

const meta: Meta<typeof Input> = {
	title: 'UI-kit/Controls/Input/Field',
	component: Input,
	tags: ['autodocs'],
	parameters: {
		controls: {
			include: [
				'type',
				'value',
				'label',
				'placeholder',
				'state',
				'errorMessage',
				'disabled',
				'readOnly',
				'autoFocus',
				'width',
				'clearButtonPosition',
			],
		},
	},
	argTypes: {
		state: {
			control: {
				type: 'radio',
			},
			options: ['Default', 'Error'],
			mapping: {
				Default: 'default',
				Error: 'error',
			},
		},
		type: {
			control: {
				type: 'radio',
			},
			options: ['text', 'number'],
		},
		clearButtonPosition: {
			control: {
				type: 'radio',
			},
			options: ['Before Extra Controls', 'After Extra Controls'],
			mapping: {
				['Before Extra Controls']: ClearButtonPositions.beforeExtraControls,
				['After Extra Controls']: ClearButtonPositions.afterExtraControls,
			},
		},
	},
	args: {
		type: 'text',
		value: '',
		label: 'Some input label',
		placeholder: 'Some input placeholder',
		width: '400px',
		errorMessage: 'Some input text error message',
		disabled: false,
		readOnly: false,
	},
	decorators: [
		(Story, { args }) => {
			const [{ type }, updateArgs] = useArgs();

			const onClear = useCallback(() => {
				updateArgs({ value: '' });
			}, [updateArgs]);

			const onChange = useCallback(
				(e: React.ChangeEvent<HTMLInputElement>) => {
					updateArgs({ value: e.target.value });
				},
				[updateArgs]
			);

			useEffect(() => {
				onClear();
			}, [type, onClear]);

			return <Story args={{ ...args, onClearClick: onClear, onChange }} />;
		},
	],
};

export default meta;

type Story = StoryObj<typeof Input>;

export const InputDefault: Story = {
	args: {},
};

export const InputWithHint: Story = {
	args: {
		extraControls: (
			<Hint position={hintPosition.centerBottom}>{'Some input hint text'}</Hint>
		),
	},
};
