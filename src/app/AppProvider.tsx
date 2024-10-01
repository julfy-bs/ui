import React, { ReactElement } from 'react';

import './app.scss';
import { AppContextProvider } from './AppContext.tsx';

export interface AppProviderProps {
	children: React.ReactNode;
}

export function AppProvider({ children }: AppProviderProps): ReactElement {
	return (
		<AppContextProvider>
			<div className="App">{children}</div>
		</AppContextProvider>
	);
}
