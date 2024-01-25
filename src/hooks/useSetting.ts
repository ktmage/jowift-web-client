import { SettingContext } from '@/providers/LocalStorageProvider';
import { useContext } from 'react';

export default function useSetting() {
	const {
		theme,
		// language,
		// isHappiness
	} = useContext(SettingContext);
	const themeConfig = {
		value: theme.value,
		setValue: theme.setValue,
		options: ['light', 'dark'],
		defaultValue: 'light',
	};

	// const languageConfig = {
	// 	value: language.value,
	// 	setValue: language.setValue,
	// 	options: ['en', 'jp'],
	// 	defaultValue: 'en',
	// };

	// const isHappinessConfig = {
	// 	value: isHappiness.value,
	// 	setValue: isHappiness.setValue,
	// };

	return {
		themeConfig,
		// languageConfig,
		// isHappinessConfig
	};
}
