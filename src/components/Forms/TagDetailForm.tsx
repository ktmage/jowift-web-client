import { FormLayout } from '../Layouts';
import SaveIcon from '@mui/icons-material/Save';
import LockIcon from '@mui/icons-material/Lock';
import AutorenewIcon from '@mui/icons-material/Autorenew';

export default function TagDetailForm() {
	return (
		<FormLayout
			headerItems={[
				{
					icon: <SaveIcon />,
					onClick: () => {},
				},
				{
					icon: <AutorenewIcon />,
					onClick: () => {},
				},
				{
					icon: <LockIcon />,
					onClick: () => {},
				},
			]}
		>
			<div>TagDetailForm</div>
		</FormLayout>
	);
}
