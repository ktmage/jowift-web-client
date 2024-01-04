import { FormLayout } from '../Layouts';
import SaveIcon from '@mui/icons-material/Save';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { Backdrop, CircularProgress, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { usePutTag, useTag, useTagList } from '@/hooks';

interface TagDetailFormProps {
	id: string;
}

export default function TagDetailForm(props: TagDetailFormProps) {
	const { data, isLoading: isLoadingGet, mutate: mutateTag } = useTag(props.id || '');
	const { mutate: mutateTagList } = useTagList();
	const { putTag, isLoading: isLoadingPut } = usePutTag();

	const [name, setName] = useState<string>('');

	// 編集ロックの状態を管理
	const [isLocked, setIsLocked] = useState<boolean>(true);

	// 変更があったかどうかを管理
	const [isChanged, setIsChanged] = useState<boolean>(false);

	const handleSave = async () => {
		await putTag(name, props.id);
		await mutateTag();
		await mutateTagList();
	};

	const initialize = () => {
		setName(data?.tag.name || '');
	};

	useEffect(() => {
		initialize();
	}, [data]);

	useEffect(() => {
		setIsChanged(data?.tag.name !== name);
	}, [name, data?.tag.name]);

	return (
		<>
			<Backdrop open={isLoadingGet || isLoadingPut}>
				<CircularProgress />
			</Backdrop>
			<FormLayout
				headerItems={[
					{
						icon: <SaveIcon />,
						onClick: () => handleSave(),
						disabled: !isChanged,
					},
					{
						icon: <AutorenewIcon />,
						onClick: () => initialize(),
						disabled: !isChanged,
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
		</>
	);
}
