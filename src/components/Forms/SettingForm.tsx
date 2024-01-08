import { Backdrop, CircularProgress } from '@mui/material';
import { FormLayout } from '../Layouts';
import SaveIcon from '@mui/icons-material/Save';

export default function SettingForm() {
	return (
		<>
			<Backdrop open={false}>
				<CircularProgress />
			</Backdrop>
			<FormLayout
				headerItems={[
					{
						icon: <SaveIcon />,
						onClick: () => console.log('save'),
					},
				]}
			>
				<>setting</>
			</FormLayout>
		</>
	);
}
