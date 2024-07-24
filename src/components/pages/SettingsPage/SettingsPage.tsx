import { FormLayout } from '@/components/layouts';
import { useSettings, useSplitView } from '@/hooks';
import { SelectItem } from '@/components/elements';
import DehazeIcon from '@mui/icons-material/Dehaze';
import { Backdrop } from '@/components/ui';

export default function SettingsForm() {
	const { toggleSplitRatio } = useSplitView();

	const { themeConfig } = useSettings();

	return (
		<>
			<Backdrop open={false}>
				<span className='loading loading-spinner loading-lg'></span>
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
