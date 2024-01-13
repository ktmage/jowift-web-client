import { ReactNode, createContext, useState, useEffect } from 'react';

interface ThemeSetting {
	options: string[];
	selected: string;
	default: string;
}

interface LanguageSetting {
	options: string[];
	selected: string;
	default: string;
}

interface NotificationSetting {
	enabled: boolean;
}

interface Settings {
	theme: ThemeSetting;
	language: LanguageSetting;
	notification: NotificationSetting;
}

interface SettingContextProps extends Settings {
	updateSettings: (newSettings: Partial<Settings>) => void;
}

const defaultSettings: Settings = {
	theme: {
		options: ['light', 'dark'],
		selected: 'light',
		default: 'light',
	},
	language: {
		options: ['english', 'japanese'],
		selected: 'english',
		default: 'english',
	},
	notification: {
		enabled: false,
	},
};
export const SettingContext = createContext({} as SettingContextProps);

export const SettingProvider = ({ children }: { children: ReactNode }) => {
	const [settings, setSettings] = useState<SettingContextProps>(() => {
		const localSettings = localStorage.getItem('settings');
		return localSettings ? JSON.parse(localSettings) : defaultSettings;
	});

	useEffect(() => {
		localStorage.setItem('settings', JSON.stringify(settings));
	}, [settings]);

	const updateSettings = (newSettings: Partial<Settings>) => {
		setSettings((prevSettings) => ({
			...prevSettings,
			...newSettings,
			theme: {
				...prevSettings.theme,
				...newSettings.theme,
			},
			language: {
				...prevSettings.language,
				...newSettings.language,
			},
			notification: {
				...prevSettings.notification,
				...newSettings.notification,
			},
		}));
	};

	return (
		<SettingContext.Provider value={{ ...settings, updateSettings }}>
			{children}
		</SettingContext.Provider>
	);
};
