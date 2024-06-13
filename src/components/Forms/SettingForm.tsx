import { Backdrop, CircularProgress } from '@mui/material';
import { FormLayout } from '../Layouts';
import { useSetting } from '@/hooks';
import { SelectItem } from '../Elements';

export default function SettingForm() {
	const {
		themeConfig,
		// languageConfig,
		// isHappinessConfig
	} = useSetting();

	return (
		<>
			<Backdrop open={false}>
				<CircularProgress />
			</Backdrop>
			<FormLayout
				disableHeader
				headerItems={[]}
			>
				<SelectItem
					id='theme'
					label='Theme'
					value={themeConfig.value}
					onChange={(e) => themeConfig.setValue(e.target.value as 'light' | 'dark')}
					selectValues={themeConfig.options}
				/>
				{/* <SelectItem
					id='language'
					label='Language'
					value={languageConfig.value}
					onChange={(e) => languageConfig.setValue(e.target.value as 'en' | 'jp')}
					SelectValues={languageConfig.options}
				/> */}
				{/* <SwitchItem
					id='isHappiness'
					label='Happiness'
					checked={isHappinessConfig.value}
					onChange={(e) => isHappinessConfig.setValue(e.target.checked)}
				/> */}
			</FormLayout>
		</>
	);
}
