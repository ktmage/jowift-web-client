import { ReactNode, createContext } from 'react';

interface SettingContextProps {}

export const SettingContext = createContext({} as SettingContextProps);

export const SettingProvider = ({ children }: { children: ReactNode }) => {
	return <SettingContext.Provider value={{}}>{children}</SettingContext.Provider>;
};
