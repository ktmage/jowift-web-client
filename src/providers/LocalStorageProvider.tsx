import { useLocalStorage } from '@/hooks';
import { ReactNode, createContext } from 'react';

interface SettingContextProps {
	theme: {
		value: 'light' | 'dark';
		setValue: (value: 'light' | 'dark') => void;
	};
	// language: {
	// 	value: 'en' | 'jp';
	// 	setValue: (value: 'en' | 'jp') => void;
	// };
	// isHappiness: {
	// 	value: boolean;
	// 	setValue: (value: boolean) => void;
	// };
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
	// const { value: language, setValue: setLanguage } = useLocalStorage<'en' | 'jp'>(
	// 	'language',
	// 	'en',
	// 	(value) => {
	// 		return value === 'en' || value === 'jp';
	// 	},
	// );
	// const { value: isHappiness, setValue: setIsHappiness } = useLocalStorage<boolean>(
	// 	'isHappiness',
	// 	false,
	// 	(value) => {
	// 		return typeof value === 'boolean';
	// 	},
	// );

	return (
		<SettingContext.Provider
			value={{
				theme: {
					value: theme,
					setValue: setTheme,
				},
				// language: {
				// 	value: language,
				// 	setValue: setLanguage,
				// },
				// isHappiness: {
				// 	value: isHappiness,
				// 	setValue: setIsHappiness,
				// },
			}}
		>
			{children}
		</SettingContext.Provider>
	);
};
