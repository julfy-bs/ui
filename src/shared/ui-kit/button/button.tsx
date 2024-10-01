import { ReactElement, useMemo } from 'react';
import { clsx } from 'clsx';
import { ButtonColor, ButtonProps } from './types';
import cs from './button.module.scss';

export const Button = ({
  type,
  color,
  count,
  countAccent,
  rounded,
  disabled,
  waiting,
  children,
  onClick,
  className,
}: ButtonProps): ReactElement => {
  const colorClass = useMemo(() => {
    switch (color) {
    case ButtonColor.blue:
      return cs.colorBlue;
    case ButtonColor.primary:
      return cs.colorPrimary;
    case ButtonColor.secondary:
      return cs.colorSecondary;
    case ButtonColor.outline:
      return cs.colorOutline;
    }
  }, [color]);

  return (
    <button
      className={ clsx(
        cs.button,
        colorClass,
        rounded && cs.rounded,
        countAccent && cs.countAccent,
        waiting && cs.waiting,
        className
      ) }
      type={ type }
      disabled={ disabled }
      data-count={ count }
      onClick={ onClick }
      data-testid={ 'button' }
    >
      { children }
    </button>
  );
};
