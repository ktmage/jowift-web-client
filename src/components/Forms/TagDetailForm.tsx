import { FormLayout } from '../Layouts';
import SaveIcon from '@mui/icons-material/Save';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { TextField } from '@mui/material';
import { useState } from 'react';

export default function TagDetailForm() {
	const mockTag = {
		name: 'tag1',
	};

	const [name, setName] = useState<string>(mockTag.name);

	// 編集ロックの状態を管理
	const [isLocked, setIsLocked] = useState<boolean>(true);

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
					icon: isLocked ? <LockIcon /> : <LockOpenIcon />,
					onClick: () => setIsLocked(!isLocked),
				},
			]}
		>
			<TextField
				inputProps={{
					sx: { fontSize: '1.5rem', fontWeight: 'bold' },
					readOnly: isLocked,
				}}
				value={name}
				placeholder='タグの名前'
				onChange={(e) => setName(e.target.value)}
			/>
		</FormLayout>
	);
}
