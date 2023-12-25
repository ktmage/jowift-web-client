import { FormLayout } from '../Layouts';
import SaveIcon from '@mui/icons-material/Save';
import LockIcon from '@mui/icons-material/Lock';

export default function NoteDetailForm() {
	return (
		<FormLayout
			headerItems={[
				{
					icon: <SaveIcon />,
					onClick: () => console.log('save'),
				},
				{
					icon: <LockIcon />,
					onClick: () => console.log('lock'),
				},
			]}
		>
			<>note detail</>
		</FormLayout>
	);
}
