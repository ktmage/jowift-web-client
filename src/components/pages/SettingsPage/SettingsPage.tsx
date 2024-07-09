import { Backdrop, CircularProgress } from '@mui/material';
import { FormLayout } from '@/components/layouts';
import { useSetting } from '@/hooks';
import { SelectItem } from '@/components/elements';

export default function SettingsForm() {
	const { themeConfig } = useSetting();

	return (
		<>
			<Backdrop open={false}>
				<CircularProgress />
			</Backdrop>
			<FormLayout
				disableHeader
				headerItems={{
					right: [],
					left: [],
				}}
			>
				<SelectItem
					id='theme'
					label='Theme'
					value={themeConfig.value}
					onChange={(e) => themeConfig.setValue(e.target.value as 'light' | 'dark')}
					selectValues={themeConfig.options}
				/>
			</FormLayout>
		</>
	);
}
