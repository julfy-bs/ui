import '@testing-library/jest-dom';
import { render, within, cleanup } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import React, { useState } from 'react';
import Input from '../index';
import { IInputProps } from '../types';

describe('Front Input:', () => {
	afterEach(() => {
		jest.restoreAllMocks();
		cleanup;
	});

	const setup = () => {
		const Template: React.FC<IInputProps> = () => {
			const [value, setValue] = useState('');
			const handleChange = jest.fn((e) => {
				setValue(e.currentTarget?.value);
			});

			return (
				<Input
					placeholder="Test Placeholder"
					value={value}
					onChange={handleChange}
					onClearClick={handleChange}
				/>
			);
		};

		const user = userEvent.setup();
		const { getByPlaceholderText } = render(<Template value={''} />);

		const parentElement = within(
			getByPlaceholderText('Test Placeholder').parentElement!
		);
		const input = parentElement.getByTestId('pure-input');

		return { user, input, parentElement };
	};

	test('should render an input', () => {
		const { input } = setup();

		expect(input).toBeInTheDocument();
	});

	test('should pass the value to the input', async () => {
		const { input } = setup();

		await userEvent.type(input, 'Test Value');

		expect(input).toHaveValue('Test Value');
	});

	test('rendered input has type text', () => {
		const { input } = setup();

		expect(input).toHaveAttribute('type', 'text');
	});

	test('should display disabled input', () => {
		const { getByPlaceholderText } = render(
			<Input
				placeholder="Test Placeholder"
				value=""
				onChange={() => {}}
				disabled
			/>
		);

		const parentElement = within(
			getByPlaceholderText('Test Placeholder').parentElement!
		);
		const input = parentElement.getByTestId('pure-input');

		expect(input).not.toBeEnabled();
		expect(input).toBeVisible();
	});

	test('readonly input content cannot be changed', async () => {
		const user = userEvent.setup();

		const { getByPlaceholderText } = render(
			<Input placeholder="Test Placeholder" value="" readOnly={true} />
		);

		const parentElement = within(
			getByPlaceholderText('Test Placeholder').parentElement!
		);
		const input = parentElement.getByTestId('pure-input');
		await user.type(input, 'Test Value');

		expect(input.getAttribute('value')).toContain('');
	});

	test('readonly input content can be copied', async () => {
		const user = userEvent.setup();

		const { getByPlaceholderText } = render(
			<Input
				placeholder="Test Placeholder"
				value="Test Value"
				readOnly={true}
			/>
		);

		const parentElement = within(
			getByPlaceholderText('Test Placeholder').parentElement!
		);
		const input = parentElement.getByTestId('pure-input');
		await user.click(input);
		await user.tripleClick(input);
		await user.copy();
		const copiedText = await window.navigator.clipboard.readText();

		expect(copiedText).toContain('Test Value');
	});

	test('should render cancel button if the input has at least a chars', async () => {
		const { user, input } = setup();

		await user.type(input, 'T');

		expect(input).toBeInTheDocument();
	});

	test('should clear the input if cancel input button is pressed on', async () => {
		const { user, input, parentElement } = setup();

		await user.type(input, 'Test Value');
		await user.click(parentElement.getByTestId('clear-button'));
		expect(input).toHaveValue('');
	});

	test('should have text in one line', async () => {
		const { user, input } = setup();

		await user.type(input, 'Test Value 1\n Test Value 2');

		expect(input).not.toHaveValue('\n');
	});

	test('clicking on tab button should come focus to the input', async () => {
		const { user, input } = setup();

		await user.click(document.body);
		await user.type(document.body, 'testquery{tab}');

		expect(input).toBe(document.activeElement);
	});

	test('should handle blur event', async () => {
		const mockOnBlur = jest.fn();

		const { getByTestId } = render(<Input value="" onBlur={mockOnBlur} />);

		const parentElement = within(getByTestId('pure-input').parentElement!);

		await userEvent.type(parentElement.getByTestId('pure-input'), 'Test Value');
		await userEvent.type(document.body, 'testquery{tab}');

		expect(mockOnBlur).toHaveBeenCalled();
	});
});
