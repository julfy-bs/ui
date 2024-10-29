import { forwardRef, useEffect, MutableRefObject, ChangeEvent } from 'react';
import { useIMask } from 'react-imask';
import { useCombinedRefs } from '../../hooks/use-combined-refs';
import { IInputProps } from './types';

const MaskedInput = forwardRef<HTMLInputElement, IInputProps>(
	({ value, onChange, controlRef, maskoptions, ...props }, ref) => {
		const {
			ref: maskRef,
			setValue,
			setTypedValue,
		} = useIMask(maskoptions ?? {}, {
			onAccept: (value) => {
				if (typeof onChange === 'function') {
					onChange({
						target: { value: value, name: props.name },
					} as ChangeEvent<HTMLInputElement>);
				}
			},
			// @ts-expect-error @todo fix typings
			defaultTypedValue: value,
		});

		const combinedRef = useCombinedRefs(
			ref,
			controlRef,
			maskRef as MutableRefObject<HTMLInputElement>
		);

		useEffect(() => {
			// @ts-expect-error @todo fix typings
			setTypedValue(value);
		}, [value, setValue, setTypedValue]);

		return <input {...props} ref={combinedRef} />;
	}
);

export default MaskedInput;
