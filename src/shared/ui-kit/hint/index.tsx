import clsx from 'clsx';
import styles from './style.module.scss';
import React from 'react';
import { IHint, hintPosition } from './types.ts';
 
const Hint: React.FC<React.PropsWithChildren<IHint>> = ({
	children,
	position,
}) => {
	return (
		<button type="button" className={clsx(styles['hint'])}>
			<div
				className={clsx({
					[styles['hint__tooltip']]: true,
					[styles['hint__tooltip_position_right-bottom']]:
						position === hintPosition.rightBottom,
					[styles['hint__tooltip_position_center-bottom']]:
						position === hintPosition.centerBottom,
				})}
			>
				{children}
			</div>
		</button>
	);
};

export default Hint;
