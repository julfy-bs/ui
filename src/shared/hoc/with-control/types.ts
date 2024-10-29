import { FocusEventHandler, MouseEventHandler, MutableRefObject } from 'react';

export interface IWithControlProps<T = Element> {
	disabled?: boolean;

	focused?: boolean;

	onBlur?: FocusEventHandler<T>;

	onFocus?: FocusEventHandler<T>;

	onMouseDown?: MouseEventHandler<T>;

	onMouseUp?: MouseEventHandler<T>;
	/**
	 * Ссылка на дом-ноду нативного контрола.
	 */
	controlRef?: MutableRefObject<T | null>;
}
