import { Backdrop, CircularProgress } from '@mui/material';
import { FormLayout } from '../Layouts';

export default function InformationForm() {
	return (
		<>
			<Backdrop open={false}>
				<CircularProgress />
			</Backdrop>
			<FormLayout
				disableHeader
				headerItems={[]}
			>
				information form
			</FormLayout>
		</>
	);
}
