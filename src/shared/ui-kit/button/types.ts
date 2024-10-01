import { ReactNode } from 'react';

export type ButtonProps = {
  type?: ButtonType;
  color: ButtonColor;
  count?: number;
  countAccent?: boolean;
  rounded?: boolean;
  disabled?: boolean;
  waiting?: boolean;
  onClick?: () => void;
  children?: ReactNode;
  className?: string;
}

export enum ButtonType {
  button = 'button',
  submit = 'submit',
  reset = 'reset',
}

export enum ButtonColor {
  blue = 'blue',
  primary = 'primary',
  secondary = 'secondary',
  outline = 'outline',
}
