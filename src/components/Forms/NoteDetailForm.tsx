import { FormLayout } from '../Layouts';
import SaveIcon from '@mui/icons-material/Save';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import DeleteIcon from '@mui/icons-material/Delete';
import { Backdrop, CircularProgress, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDeleteNote, useNote, useNoteList, usePutNote } from '@/hooks';
import { Tag } from '@/models';
import { MultipleTagSelector } from '../UI';
import { useNavigate } from 'react-router-dom';

interface NoteDetailFormProps {
	id: string;
}

export default function NoteDetailForm(props: NoteDetailFormProps) {
	const { data, isLoading: isLoadingGet } = useNote(props.id || '');
	const { mutate: mutateNotes } = useNoteList();
	const { putNote, isLoading: isLoadingPut } = usePutNote(props.id);
	const { deleteNote, isLoading: isLoadingDelete } = useDeleteNote();

	const Navigate = useNavigate();

	const [title, setTitle] = useState<string>('');
	const [tags, setTags] = useState<Tag[]>([]);
	const [content, setContent] = useState<string>('');

	const [isLocked, setIsLocked] = useState<boolean>(true);
	const [isChanged, setIsChanged] = useState<boolean>(false);

	const handleDelete = async () => {
		await deleteNote(props.id);
		await mutateNotes();
		Navigate('/app/note');
	};

	// 初期化処理
	const initialize = () => {
		setTitle(data?.title || '');
		setTags(data?.tags.map((tag) => tag) || []);
		setContent(data?.content || '');
	};

	// dataが変更されたら初期化処理を実行
	useEffect(() => {
		initialize();
	}, [data]);

	// 参照元のデータと比較して変更があったかどうかを判定、変更があった場合はフラグを立てる。
	useEffect(() => {
		const tagsChanged =
			JSON.stringify(data?.tags.map((tag) => tag.name)) !==
			JSON.stringify(tags.map((tag) => tag.name));
		const titleChanged = data?.title !== title;
		const contentChanged = data?.content !== content;
		setIsChanged(tagsChanged || titleChanged || contentChanged);
	}, [title, tags, content, data?.title, data?.tags, data?.content]);

	return (
		<>
			<Backdrop open={isLoadingGet || isLoadingPut || isLoadingDelete}>
				<CircularProgress />
			</Backdrop>
			<FormLayout
				headerItems={[
					{
						icon: <SaveIcon />,
						onClick: () => putNote({ title, content, tags }),
						disabled: !isChanged,
					},
					{
						// 任意のタイミングで初期化処理を実行
						icon: <AutorenewIcon />,
						onClick: () => initialize(),
						disabled: !isChanged,
					},
					{
						icon: <DeleteIcon />,
						onClick: () => handleDelete(),
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
					value={title}
					placeholder={data ? 'タイトル' : ''}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<MultipleTagSelector
					value={tags}
					setValue={setTags}
					readonly={isLocked}
				/>
				<TextField
					inputProps={{ readOnly: isLocked }}
					multiline
					value={content}
					placeholder={data ? '内容' : ''}
					onChange={(e) => setContent(e.target.value)}
				/>
			</FormLayout>
		</>
	);
}
