import {
	ChangeEvent,
	MouseEvent,
	MutableRefObject,
	ClipboardEvent,
	ReactNode,
	KeyboardEvent,
} from 'react';
import { IWithControlProps } from '../../hoc/with-control/types.ts';

export enum ClearButtonPositions {
	beforeExtraControls,
	afterExtraControls,
}

export interface IInputProps extends IWithControlProps<HTMLInputElement> {
	id?: string;
	maskoptions?: object;
	className?: string;

	/**
	 * Значение инпута
	 */
	value: string;
	/**
	 * Имя компонента
	 */
	name?: string;

	/**
	 * HTML-аттрибут auto-focus
	 */
	autoFocus?: boolean;

	/**
	 * HTML-аттрибут type
	 */
	type?: 'text' | 'password' | 'number' | 'phone' | 'date' | 'email';

	/**
	 * Отображаемый текст над инпутом
	 */
	label?: string;

	/**
	 * Плейсхолдер
	 */
	placeholder?: string;

	/**
	 * HTML-атрибут `disabled`
	 */
	disabled?: boolean;

	/**
	 * HTML-атрибут `readOnly`
	 */
	readOnly?: boolean;

	/**
	 * Состояние
	 * TODO: вынести в enum
	 */
	state?: 'default' | 'error';

	/**
	 * Отображаемый текст ошибки
	 */
	errorMessage?: string;

	/**
	 * Ширина компонента
	 * 200px, 50vw, 30%
	 * default 100%
	 */
	width?: string;

	/**
	 * Не отображать кнопку очистки
	 */
	hideClearButton?: boolean;

	/**
	 * Минимальное значение при использовании `type=number`
	 */
	min?: number | string;

	/**
	 * Максимальное значение при использовании `type=number`
	 */
	max?: number | string;

	/**
	 * HTML-атрибут `min-length`
	 */
	minLength?: number;

	/**
	 * HTML-атрибут `max-length`
	 */
	maxLength?: number;

	/**
	 * HTML-атрибут `required`
	 */
	required?: boolean;

	/**
	 * Дополнительный класс к контейнеру
	 */
	extraClass?: string;

	/**
	 * HTML-атрибут `tab-index`
	 */
	tabIndex?: number;

	/**
	 * Ссылка на корневой DOM элемент компонента
	 */
	rootRef?: MutableRefObject<HTMLDivElement>;

	/**
	 * Слот под дополнительные элементы (например <Hint />)
	 */
	extraControls?: ReactNode;

	/**
	 * Позиция кнопки очистки текста (до/после extraControls)
	 */
	clearButtonPosition?: ClearButtonPositions;
	/**
	 * Обработчик, вызываемы при срабатывании события `onChange`
	 * @param e
	 */
	onChange?(e: ChangeEvent<HTMLInputElement>): void;

	/**
	 *  Обработчик, вызываемый при срабатывании по клику по кнопке очистки
	 * @param e
	 */
	onClearClick?(e: MouseEvent<HTMLButtonElement>): void;

	/**
	 * Значение data-атрибута `data-testid` на контейнере
	 */
	testId?: string;

	maskPlaceholder?: ReactNode;

	onPaste?(e: ClipboardEvent<HTMLInputElement>): void;

	onKeyDown?(e: KeyboardEvent): void;

	validate?: () => void;
}
