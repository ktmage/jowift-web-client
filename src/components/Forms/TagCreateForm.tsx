import { TextField } from '@mui/material';
import { FormLayout } from '../Layouts';
import SaveIcon from '@mui/icons-material/Save';
import { useState } from 'react';
import { usePostTag } from '@/hooks';

export default function TagCreateForm() {
	const [name, setName] = useState<string>('');
	const { postTag } = usePostTag();
	return (
		<FormLayout
			headerItems={[
				{
					icon: <SaveIcon />,
					onClick: () => postTag(name),
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
