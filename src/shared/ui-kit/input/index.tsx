import React, {
	ChangeEvent,
	FocusEvent,
	MouseEvent,
	useCallback,
	useEffect,
	useRef,
} from 'react';
import MaskedInput from './MaskedInput';
import RegularInput from './RegularInput';
import clsx from 'clsx';
import { ClearButtonPositions, IInputProps } from './types';
import styles from './style.module.scss';
import { useCombinedRefs } from '../../hooks/use-combined-refs';
import { withControl } from '../../hoc/with-control/with-control.tsx';

function Input({
	type = 'text',
	value,
	name,
	extraClass,
	onClearClick,
	extraControls,
	readOnly,
	disabled,
	placeholder,
	label = '',
	errorMessage = '',
	rootRef,
	controlRef,
	testId,
	focused,
	required,
	onChange,
	onBlur,
	maskPlaceholder,
	width = '100%',
	hideClearButton = false,
	clearButtonPosition = ClearButtonPositions.beforeExtraControls,
	maskoptions,
	validate: _validate,
	...props
}: IInputProps) {
	const innerRef = useRef<HTMLInputElement>(null);
	const ref = useCombinedRefs(innerRef, controlRef);
	//const [valueInput, setValueInput] = useState(value);

	const forceFocus = useCallback(() => {
		ref?.current?.focus();
	}, [ref]);

	const onWrapperClick = (e: MouseEvent<HTMLDivElement>) => {
		if (readOnly || disabled) {
			return;
		}
		e.stopPropagation();
		if (e.button !== 0) {
			return;
		}

		forceFocus();
	};

	const handleClearClick = useCallback(
		(e: React.MouseEvent<HTMLButtonElement>) => {
			e.stopPropagation();
			onChange?.({
				target: { value: '', name },
			} as ChangeEvent<HTMLInputElement>);

			if (e.button !== 0) {
				return;
			}
			if (typeof onClearClick === 'function') {
				onClearClick(e);
			}
			forceFocus();
		},
		[onClearClick, forceFocus, onChange, name]
	);

	const isValueEmpty = (value ?? '').toString().length === 0;
	const hasExtraControls = !!extraControls;
	const showLabel =
		label?.length > 0 && (!isValueEmpty || (!disabled && !readOnly && focused));

	const showClearButton =
		!hideClearButton && !readOnly && !disabled && !isValueEmpty;

	function handleBlur(e: FocusEvent<HTMLInputElement>) {
		if (disabled || readOnly) {
			return;
		}

		if (typeof onBlur === 'function') {
			onBlur(e);
		}
	}

	const showMaskPlaceholder =
		focused && !readOnly && !disabled && maskPlaceholder;

	useEffect(() => {
		if (ref.current) {
			if (errorMessage.length) {
				ref.current.setCustomValidity(errorMessage);
			} else {
				ref.current.setCustomValidity('');
			}
		}
	}, [ref, errorMessage]);

	const isError = errorMessage.length > 0;

	const inputWrapperStyles = clsx(
		styles['input'],
		disabled && styles['input_disabled'],
		readOnly && styles['input_readonly'],
		isError && styles['input_has-error'],
		extraClass,
		{
			[styles['input_focused']]: focused && !readOnly && !disabled,
		}
	);

	const inputStyles = clsx(
		styles['input__field'],
		styles['input__field_default'],
		styles[`input__field_type_${type}`],
		styles[
			`input__field_interval_right_${hasExtraControls ? 'large' : 'small'}`
		]
	);

	const buttonStyles = clsx(
		styles['input__btn'],
		styles['input__btn_type_clear-text'],
		clearButtonPosition === ClearButtonPositions.afterExtraControls &&
			styles['input__btn_position_last']
	);

	const InputComponent = maskoptions ? MaskedInput : RegularInput;
	const isPlaceholderShown =
		focused && !readOnly && !disabled ? '' : placeholder;

	return (
		<div className={styles['input-wrapper']} ref={rootRef} style={{ width }}>
			<div
				className={inputWrapperStyles}
				onMouseUp={onWrapperClick}
				data-testid={`group-input`}
			>
				{showLabel && (
					<label htmlFor={name} className={styles['input__label']}>
						{label}
					</label>
				)}
				{showMaskPlaceholder && (
					<div className={styles['input__mask-wrapper']}>{maskPlaceholder}</div>
				)}
				<InputComponent
					{...props}
					type={type}
					value={value}
					ref={ref}
					id={name}
					name={name}
					onChange={onChange}
					onBlur={handleBlur}
					className={inputStyles}
					required={required}
					disabled={disabled}
					readOnly={readOnly}
					placeholder={isPlaceholderShown}
					data-testid={testId ? testId : 'pure-input'}
					maskoptions={maskoptions}
				/>
				<div className={styles['input__controls']}>
					{showClearButton && (
						<button
							className={buttonStyles}
							onClick={handleClearClick}
							type="button"
							data-testid={`${testId ? testId : ''}${
								testId ? '-' : ''
							}clear-button`}
						/>
					)}
					{hasExtraControls && extraControls}
				</div>
			</div>
			<p className={`${styles['error-message']} ${isError && styles['show-error']}`}>{isError && errorMessage}&nbsp;</p>
		</div>
	);
}

const WrappedWithControlInput = withControl(Input);

export default WrappedWithControlInput;
