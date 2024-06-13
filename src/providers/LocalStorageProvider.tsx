import { useLocalStorage } from '@/hooks';
import { ReactNode, createContext } from 'react';

interface SettingContextProps {
	theme: {
		value: 'light' | 'dark';
		setValue: (value: 'light' | 'dark') => void;
	};
}

export const SettingContext = createContext({} as SettingContextProps);

export const SettingProvider = ({ children }: { children: ReactNode }) => {
	const { value: theme, setValue: setTheme } = useLocalStorage<'light' | 'dark'>(
		'theme',
		'light',
		(value) => {
			return value === 'light' || value === 'dark';
		},
	);

	return (
		<SettingContext.Provider
			value={{
				theme: {
					value: theme,
					setValue: setTheme,
				},
			}}
		>
			{children}
		</SettingContext.Provider>
	);
};
