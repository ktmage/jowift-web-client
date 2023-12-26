import { FormLayout } from '../Layouts';
import SaveIcon from '@mui/icons-material/Save';

export default function TagCreateForm() {
	return (
		<FormLayout
			headerItems={[
				{
					icon: <SaveIcon />,
					onClick: () => console.log('save'),
				},
			]}
		>
			<h1>Create Tag</h1>
		</FormLayout>
	);
}
