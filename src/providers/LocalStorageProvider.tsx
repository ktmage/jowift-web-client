import { useLocalStorage } from '@/hooks';
import { ReactNode, createContext } from 'react';

interface LocalStorageContextProps {
	theme: {
		value: 'light' | 'dark';
		setValue: (value: 'light' | 'dark') => void;
	};
}

export const LocalStorageContext = createContext({} as LocalStorageContextProps);

// ローカルストレージ内のデータを提供するProvider
export const LocalStorageProvider = ({ children }: { children: ReactNode }) => {
	// テーマの設定をローカルストレージから取得
	const { value: theme, setValue: setTheme } = useLocalStorage<'light' | 'dark'>(
		'theme',
		'light',
		(value) => {
			return value === 'light' || value === 'dark';
		},
	);

	return (
		<LocalStorageContext.Provider
			value={{
				theme: {
					value: theme,
					setValue: setTheme,
				},
			}}
		>
			{children}
		</LocalStorageContext.Provider>
	);
};
