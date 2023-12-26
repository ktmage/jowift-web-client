import { TextField } from '@mui/material';
import { FormLayout } from '../Layouts';
import SaveIcon from '@mui/icons-material/Save';
import { useState } from 'react';

export default function TagCreateForm() {
	const [name, setName] = useState<string>('');
	return (
		<FormLayout
			headerItems={[
				{
					icon: <SaveIcon />,
					onClick: () => console.log('save'),
				},
			]}
		>
			<TextField
				inputProps={{ sx: { fontSize: '1.5rem', fontWeight: 'bold' } }}
				value={name}
				placeholder='タグの名前'
				onChange={(e) => setName(e.target.value)}
			/>
		</FormLayout>
	);
}
