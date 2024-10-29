import { ComponentType, FocusEvent, MouseEvent, useState } from 'react';
import { IWithControlProps } from './types.ts';

export function withControl<T extends IWithControlProps>(
	WrappedComponent: ComponentType<T>
) {
	return function (props: T) {
		const Component = WrappedComponent as unknown as ComponentType<T>;
		const [focused, setFocused] = useState(props.focused ?? false);

		function onBlur(e: FocusEvent) {
			setFocused(false);
			if (typeof props.onBlur === 'function') {
				props.onBlur(e);
			}
		}

		function onFocus(e: FocusEvent) {
			setFocused(true);
			if (typeof props.onFocus === 'function') {
				props.onFocus(e);
			}
		}

		function onMouseDown(e: MouseEvent) {
			if (e.button !== 0) {
				return;
			}
			setFocused(true);
			if (typeof props.onMouseDown === 'function') {
				props.onMouseDown(e);
			}
		}

		function onMouseUp(e: MouseEvent) {
			if (e.button !== 0) {
				return;
			}

			setFocused(true);
			if (typeof props.onMouseUp === 'function') {
				props.onMouseUp(e);
			}
		}

		return (
			<Component
				{...props}
				focused={props.focused ? focused : undefined}
				disabled={props.disabled}
				onBlur={!props.disabled ? onBlur : undefined}
				onFocus={!props.disabled ? onFocus : undefined}
				onMouseDown={!props.disabled ? onMouseDown : undefined}
				onMouseUp={!props.disabled ? onMouseUp : undefined}
			/>
		);
	};
}
