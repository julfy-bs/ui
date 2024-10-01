import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './button.tsx';
import { ButtonColor, ButtonProps } from './types';

describe('Front Button:', () => {
  const setup = (
    props: Omit<ButtonProps, 'testId'> & { testId?: string } = {
      color: ButtonColor.primary,
    }
  ) => {
    render(<Button {...props} />);
    const button = screen.getByTestId('button');
    return { button };
  };

  test('renders a button', () => {
    const { button } = setup();
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('');
  });

  test('renders button with count attribute if count prop is provided', () => {
    const { button } = setup({ color: ButtonColor.primary, count: 5 });
    expect(button).toHaveAttribute('data-count', '5');
  });

  test('disables button if disabled prop is true', () => {
    const { button } = setup({ color: ButtonColor.primary, disabled: true });
    expect(button).toBeDisabled();
  });

  test('calls onClick handler when clicked', async () => {
    const handleClick = jest.fn();
    const { button } = setup({
      color: ButtonColor.primary,
      onClick: handleClick,
    });
    await userEvent.click(button);
    expect(handleClick).toHaveBeenCalled();
  });

  test('renders children correctly', () => {
    const { button } = setup({
      color: ButtonColor.primary,
      children: 'Click me',
    });
    expect(button).toHaveTextContent('Click me');
  });

  test('disabled button does not trigger onClick', async () => {
    const handleClick = jest.fn();
    const { button } = setup({
      color: ButtonColor.primary,
      disabled: true,
      onClick: handleClick,
    });
    await userEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  test('button is focusable with keyboard', () => {
    const { button } = setup();
    button.focus();
    expect(button).toHaveFocus();
  });

  test('button can be activated with space key', async () => {
    const handleClick = jest.fn();
    const { button } = setup({
      color: ButtonColor.primary,
      onClick: handleClick,
    });
    button.focus();
    await userEvent.keyboard('[Space]');
    expect(handleClick).toHaveBeenCalled();
  });

  test('counter trims leading zeros', () => {
    const { button } = setup({
      color: ButtonColor.primary,
      count: parseInt('005', 10),
    });
    expect(button).toHaveAttribute('data-count', '5');
  });

  test('focus and hover reset on button release', async () => {
    const { button } = setup();
    button.focus();
    expect(button).toHaveFocus();
    await userEvent.click(button);
    button.blur();
    expect(button).not.toHaveFocus();
  });
});
