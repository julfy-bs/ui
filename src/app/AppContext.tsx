/* eslint-disable react-refresh/only-export-components */

import React, { ReactElement, useContext } from 'react';

export type AppContextType = unknown;

export const AppContext = React.createContext<AppContextType>({});

interface AppContextProviderProps {
	children: React.ReactNode;
}

export function AppContextProvider({
	children,
}: AppContextProviderProps): ReactElement {
	return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
}

export function useAppContext(): AppContextType {
	return useContext(AppContext);
}
