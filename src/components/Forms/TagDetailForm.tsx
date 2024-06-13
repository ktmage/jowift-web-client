import { FormLayout } from '../layouts';
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

	const { deleteTag, isLoading: isLoadingDelete } = useDeleteTag(props.id, {
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

	const { putTag, isLoading: isLoadingPut } = usePutTag(props.id, name, {
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
						onClick: () => putTag(),
						disabled: !isChanged,
					},
					{
						icon: <DeleteIcon />,
						onClick: () => deleteTag(),
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

// import { FormLayout } from '../Layouts';
// import SaveIcon from '@mui/icons-material/Save';
// import LockIcon from '@mui/icons-material/Lock';
// import LockOpenIcon from '@mui/icons-material/LockOpen';
// import AutorenewIcon from '@mui/icons-material/Autorenew';
// import DeleteIcon from '@mui/icons-material/Delete';

// import { Backdrop, CircularProgress, TextField } from '@mui/material';
// import { useEffect, useState } from 'react';
// import { useDeleteTag, usePutTag, useTag } from '@/hooks';

// interface TagDetailFormProps {
// 	id: string;
// }

// export default function TagDetailForm(props: TagDetailFormProps) {
// 	const [name, setName] = useState<string>('');

// 	// 編集ロックの状態を管理
// 	const [isLocked, setIsLocked] = useState<boolean>(true);

// 	// 変更があったかどうかを管理
// 	const [isChanged, setIsChanged] = useState<boolean>(false);

// 	const { tag, isLoading: isLoadingGet } = useTag(props.id || '');
// 	const { putTag, isLoading: isLoadingPut, error } = usePutTag(props.id, name);
// 	const { deleteTag, isLoading: isLoadingDelete } = useDeleteTag(props.id);

// 	const initialize = () => {
// 		setName(tag?.name || '');
// 	};

// 	useEffect(() => {
// 		initialize();
// 	}, [tag]);

// 	useEffect(() => {
// 		setIsChanged(tag?.name !== name);
// 	}, [name, tag?.name]);

// 	const handlePutTag = async () => {
// 		await putTag();
// 		if (!error) setIsLocked(true);
// 	};

// 	return (
// 		<>
// 			<Backdrop open={isLoadingGet || isLoadingPut || isLoadingDelete}>
// 				<CircularProgress />
// 			</Backdrop>
// 			<FormLayout
// 				headerItems={[
// 					{
// 						icon: <SaveIcon />,
// 						onClick: () => handlePutTag(),
// 						disabled: !isChanged,
// 					},
// 					{
// 						icon: <AutorenewIcon />,
// 						onClick: () => initialize(),
// 						disabled: !isChanged,
// 					},
// 					{
// 						icon: <DeleteIcon />,
// 						onClick: () => deleteTag(),
// 					},
// 					{
// 						icon: isLocked ? <LockIcon /> : <LockOpenIcon />,
// 						onClick: () => setIsLocked(!isLocked),
// 					},
// 				]}
// 			>
// 				<TextField
// 					inputProps={{
// 						sx: { fontSize: '1.5rem', fontWeight: 'bold' },
// 						readOnly: isLocked,
// 					}}
// 					value={name}
// 					placeholder={tag ? 'タグ名' : ''}
// 					onChange={(e) => setName(e.target.value)}
// 				/>
// 			</FormLayout>
// 		</>
// 	);
// }
