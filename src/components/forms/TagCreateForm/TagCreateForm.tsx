import { Backdrop, CircularProgress, TextField } from '@mui/material';
import { FormLayout } from '@/components/layouts';
import SaveIcon from '@mui/icons-material/Save';
import { useEffect, useState } from 'react';
import { usePostTag } from '@/hooks';
import { useNavigate } from 'react-router-dom';

export default function TagCreateForm() {
	const navigate = useNavigate();

	const [name, setName] = useState<string>('');

	const [isChanged, setIsChanged] = useState<boolean>(false);

	const { postTag, isLoading } = usePostTag({
		onSuccess(createdTag) {
			// 作成に成功した場合、作成したTagの詳細ページに遷移
			navigate(`/app/tag/${createdTag.id}`);
		},
	});

	useEffect(() => {
		setIsChanged(name !== '');
	}, [name]);

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
						disabled: isLoading || !isChanged,
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
