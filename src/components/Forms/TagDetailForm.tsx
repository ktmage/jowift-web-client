import { FormLayout } from '../Layouts';
import SaveIcon from '@mui/icons-material/Save';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';

export default function TagDetailForm() {
	const mockTag = {
		name: 'tag1',
	};

	const [name, setName] = useState<string>(mockTag.name);

	// 編集ロックの状態を管理
	const [isLocked, setIsLocked] = useState<boolean>(true);

	// 変更があったかどうかを管理
	const [isChanged, setIsChanged] = useState<boolean>(false);

	// 参照元のデータと比較して変更があったかどうかを判定、変更があった場合はフラグを立てる。
	useEffect(() => {
		setIsChanged(mockTag.name !== name);
	}, [name, mockTag.name]);

	// フォームの内容をリセットする。
	const reset = () => {
		setName(mockTag.name);
	};

	return (
		<FormLayout
			headerItems={[
				{
					icon: <SaveIcon />,
					onClick: () => (isChanged ? console.log('save') : console.log('no change')),
				},
				{
					icon: <AutorenewIcon />,
					onClick: () => reset(),
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
