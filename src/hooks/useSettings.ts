import { LocalStorageContext } from '@/providers/LocalStorageProvider';
import { useContext } from 'react';

export default function useSettings() {
	const { theme } = useContext(LocalStorageContext);
	const themeConfig = {
		value: theme.value,
		setValue: (value: 'light' | 'dark') => {
			theme.setValue(value);
			document.querySelector('html')?.setAttribute('data-theme', value);
		},
		options: ['light', 'dark'],
		defaultValue: 'light',
	};

	return {
		themeConfig,
	};
}
