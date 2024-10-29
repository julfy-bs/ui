import React from 'react';

export enum hintPosition {
	rightBottom = 'rightBottom',
	centerBottom = 'centerBottom',
}

export interface IHint {
	position?: hintPosition;
	children: React.ReactNode;
}
