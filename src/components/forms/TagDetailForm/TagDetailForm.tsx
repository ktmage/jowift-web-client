import { FormLayout } from '@/components/layouts';
import SaveIcon from '@mui/icons-material/Save';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import DeleteIcon from '@mui/icons-material/Delete';

import { Backdrop, CircularProgress, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useCachedTag, useDeleteTag, usePutTag } from '@/hooks';
import { useNavigate } from 'react-router-dom';

interface TagDetailFormProps {
	id: string;
}

export default function TagDetailForm(props: TagDetailFormProps) {
	const navigate = useNavigate();

	// タグの取得
	const { tag, isLoading: isLoadingGet } = useCachedTag(props.id);

	const [name, setName] = useState<string>('');

	useEffect(() => {
		setName(tag?.name || '');
	}, [tag, props.id]);

	// ----------------------------------------------------------------------------------------------------

	// ロック状態
	const [isLocked, setIsLocked] = useState<boolean>(true);

	const { deleteTag, isLoading: isLoadingDelete } = useDeleteTag({
		onSuccess: () => {
			navigate('/app/tag');
		},
	});

	// ----------------------------------------------------------------------------------------------------

	// 元の状態から変更されているかどうか
	const [isChanged, setIsChanged] = useState<boolean>(false);

	// 変更されたかどうかを判定
	useEffect(() => {
		setIsChanged(tag?.name !== name);
	}, [name, tag?.name]);

	const { putTag, isLoading: isLoadingPut } = usePutTag({
		onSuccess: () => {
			setIsLocked(true);
		},
	});

	return (
		<>
			<Backdrop open={isLoadingGet || isLoadingPut || isLoadingDelete}>
				<CircularProgress />
			</Backdrop>
			<FormLayout
				headerItems={[
					{
						icon: <SaveIcon />,
						onClick: () => putTag(props.id, name),
						disabled: !isChanged,
					},
					{
						icon: <DeleteIcon />,
						onClick: () => deleteTag(props.id),
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
					placeholder={tag ? 'タグ名' : ''}
					onChange={(e) => setName(e.target.value)}
				/>
			</FormLayout>
		</>
	);
}
