import { Backdrop, CircularProgress, TextField } from '@mui/material';
import { FormLayout } from '@/components/layouts';
import SaveIcon from '@mui/icons-material/Save';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import DeleteIcon from '@mui/icons-material/Delete';
import { MultipleTagSelector } from '@/components/ui';
import { useEffect, useState } from 'react';
import { TagModel } from '@/models';
import { useCachedNote, useDeleteNote, usePutNote } from '@/hooks';
import { useNavigate } from 'react-router-dom';

interface NoteDetailFormProps {
	id: string;
}

export default function NoteDetailForm(props: NoteDetailFormProps) {
	const navigate = useNavigate();

	// ノートの取得
	const { note, isLoading: isLoadingGet } = useCachedNote(props.id);

	const [title, setTitle] = useState<string>('');
	const [content, setContent] = useState<string>('');
	const [tags, setTags] = useState<TagModel[]>([]);

	// 取得したNoteListから該当するNoteのデータを取得
	useEffect(() => {
		setTitle(note?.title || '');
		setContent(note?.content || '');
		setTags(note?.tags || []);
	}, [note, props.id]);

	// ----------------------------------------------------------------------------------------------------

	// ロック状態
	const [isLocked, setIsLocked] = useState<boolean>(true);

	const { deleteNote, isLoading: isLoadingDelete } = useDeleteNote(props.id, {
		onSuccess: () => {
			// 削除に成功した場合、一覧ページに遷移
			navigate('/app/note');
		},
	});

	// ----------------------------------------------------------------------------------------------------

	// 元の状態から変更されているかどうか
	const [isChanged, setIsChanged] = useState<boolean>(false);

	// 変更されたかどうかを判定
	useEffect(() => {
		if (note) {
			setIsChanged(
				title !== note.title ||
					content !== note.content ||
					tags.length !== note.tags.length ||
					tags.some((tag: TagModel, index: number) => tag.id !== note.tags[index].id),
			);
		}
	}, [note, title, content, tags, props.id]);

	const { putNote, isLoading: isLoadingPut } = usePutNote(props.id, title, content, tags, {
		onSuccess: () => {
			// 更新に成功した場合、編集ロック状態にする
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
						onClick: () => putNote(),
						disabled: !isChanged,
					},
					{
						icon: <DeleteIcon />,
						onClick: () => deleteNote(),
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
					value={title || ''}
					placeholder={title ? 'タイトル' : ''}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<MultipleTagSelector
					value={tags || []}
					setValue={setTags}
					readonly={isLocked}
				/>
				<TextField
					inputProps={{ readOnly: isLocked }}
					multiline
					value={content}
					placeholder={content ? '内容' : ''}
					onChange={(e) => setContent(e.target.value)}
				/>
			</FormLayout>
		</>
	);
}
