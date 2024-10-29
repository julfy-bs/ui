import { ChangeEvent, useRef, useState, useEffect, forwardRef } from 'react';
import { useCombinedRefs } from '../../hooks/use-combined-refs';
import { IInputProps } from './types';

const RegularInput = forwardRef<HTMLInputElement, IInputProps>(({ value, onChange, controlRef, ...rest }, ref) => {
	const innerRef = useRef<HTMLInputElement>(null);
	const combinedRef = useCombinedRefs(innerRef, controlRef, ref);
	const [valueInput, setValueInput] = useState(value);

	const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValueInput(e.target.value);
		if (typeof onChange === 'function') {
			onChange(e);
		}
	};

	useEffect(() => {
		setValueInput(value);
	}, [value]);

	return (
		<input
			{...rest}
			value={valueInput}
			ref={combinedRef}
			onChange={onInputChange}
		/>
	);
});

export default RegularInput;
