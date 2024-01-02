import { Backdrop, CircularProgress, TextField } from '@mui/material';
import { FormLayout } from '../Layouts';
import SaveIcon from '@mui/icons-material/Save';
import { useState } from 'react';
import { usePostTag } from '@/hooks';

export default function TagCreateForm() {
	const [name, setName] = useState<string>('');
	const { postTag, isLoading } = usePostTag();
	return (
		<>
			<Backdrop open={isLoading}>
				<CircularProgress />
			</Backdrop>
			<FormLayout
				headerItems={[
					{
						icon: <SaveIcon />,
						onClick: () => postTag(name),
						disabled: isLoading,
					},
				]}
			>
				<TextField
					inputProps={{
						sx: { fontSize: '1.5rem', fontWeight: 'bold' },
						readOnly: isLoading,
					}}
					value={name}
					placeholder='タグの名前'
					onChange={(e) => setName(e.target.value)}
				/>
			</FormLayout>
		</>
	);
}
