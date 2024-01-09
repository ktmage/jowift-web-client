interface SettingDefinition<T> {
	key: string;
	defaultValue: T;
}

interface SettingDefinitions {
	mode: SettingDefinition<'light' | 'dark'>;
	language: SettingDefinition<'jp' | 'en'>;
	fontsize: SettingDefinition<number>;
	autoSave: SettingDefinition<boolean>;
}

const settings: SettingDefinitions = {
	mode: {
		key: 'mode',
		defaultValue: 'light',
	},
	language: {
		key: 'language',
		defaultValue: 'jp',
	},
	fontsize: {
		key: 'fontsize',
		defaultValue: 24,
	},
	autoSave: {
		key: 'autoSave',
		defaultValue: true,
	},
};

const SettingRepository = {
	get<K extends keyof SettingDefinitions>(key: K): SettingDefinitions[K]['defaultValue'] {
		const data = localStorage.getItem(settings[key].key);
		return data
			? (JSON.parse(data) as SettingDefinitions[K]['defaultValue'])
			: settings[key].defaultValue;
	},

	set<K extends keyof SettingDefinitions>(
		key: K,
		value: SettingDefinitions[K]['defaultValue'],
	): void {
		localStorage.setItem(settings[key].key, JSON.stringify(value));
	},
};

export default SettingRepository;
