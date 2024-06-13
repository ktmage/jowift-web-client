import { SettingContext } from '@/providers/LocalStorageProvider';
import { useContext } from 'react';

export default function useSetting() {
	const { theme } = useContext(SettingContext);
	const themeConfig = {
		value: theme.value,
		setValue: theme.setValue,
		options: ['light', 'dark'],
		defaultValue: 'light',
	};

	return {
		themeConfig,
	};
}
