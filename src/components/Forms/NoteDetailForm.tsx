import { FormLayout } from '../Layouts';
import SaveIcon from '@mui/icons-material/Save';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { Backdrop, CircularProgress, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNote, useNoteList, usePutNote } from '@/hooks';
import { Tag } from '@/types';
import { MultipleTagSelector } from '../UI';

interface NoteDetailFormProps {
	id: string;
}

export default function NoteDetailForm(props: NoteDetailFormProps) {
	const { data, isLoading, mutate: mutateNote } = useNote(props.id || '');
	const { mutate: mutateNotes } = useNoteList();

	const [title, setTitle] = useState<string>('');
	const [tags, setTags] = useState<Tag[]>([]);
	const [content, setContent] = useState<string>('');

	const [isLocked, setIsLocked] = useState<boolean>(true);
	const [isChanged, setIsChanged] = useState<boolean>(false);

	const { putNote } = usePutNote();

	const handleSave = async () => {
		await putNote(
			{
				title: title,
				content: content,
				tagIds: tags.map((tag) => tag.id),
			},
			props.id,
		);
		await mutateNotes();
		await mutateNote();
	};

	// 初期化処理
	const initialize = () => {
		setTitle(data?.note.title || '');
		setTags(data?.note.tags.map((tag) => tag.tag) || []);
		setContent(data?.note.content || '');
	};

	// dataが変更されたら初期化処理を実行
	useEffect(() => {
		initialize();
	}, [data]);

	// 参照元のデータと比較して変更があったかどうかを判定、変更があった場合はフラグを立てる。
	useEffect(() => {
		const tagsChanged =
			JSON.stringify(data?.note.tags.map((tag) => tag.tag.name)) !==
			JSON.stringify(tags.map((tag) => tag.name));
		const titleChanged = data?.note.title !== title;
		const contentChanged = data?.note.content !== content;
		setIsChanged(tagsChanged || titleChanged || contentChanged);
	}, [title, tags, content, data?.note.title, data?.note.tags, data?.note.content]);

	return (
		<>
			<Backdrop open={isLoading}>
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
						// 任意のタイミングで初期化処理を実行
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
					value={title}
					placeholder='タイトル'
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
					placeholder='内容'
					onChange={(e) => setContent(e.target.value)}
				/>
			</FormLayout>
		</>
	);
}
