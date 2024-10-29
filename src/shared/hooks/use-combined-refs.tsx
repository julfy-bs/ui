import React from 'react';

export function useCombinedRefs<T = HTMLElement>(
	...refs: Array<React.MutableRefObject<T> | React.LegacyRef<T> | undefined>
): React.MutableRefObject<T | null> {
	const targetRef = React.useRef<T>(null);
	React.useEffect(() => {
		refs.forEach((ref) => {
			if (typeof ref === 'function') {
				ref(targetRef.current);
			} else if (ref != null) {
				(ref as React.MutableRefObject<T | null>).current = targetRef.current;
			}
		});
	}, [refs]);
	return targetRef;
}
