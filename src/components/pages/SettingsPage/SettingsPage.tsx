import { Backdrop, CircularProgress } from '@mui/material';
import { FormLayout } from '@/components/layouts';
import { useSetting, useSplitView } from '@/hooks';
import { SelectItem } from '@/components/elements';
import DehazeIcon from '@mui/icons-material/Dehaze';

export default function SettingsForm() {
	const { toggleSplitRatio } = useSplitView();

	const { themeConfig } = useSetting();

	return (
		<>
			<Backdrop open={false}>
				<CircularProgress />
			</Backdrop>
			<FormLayout
				headerItems={{
					right: [],
					left: [
						{
							icon: <DehazeIcon />,
							onClick: () => toggleSplitRatio(),
						},
					],
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
