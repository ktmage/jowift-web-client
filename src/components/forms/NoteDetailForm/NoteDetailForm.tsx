import { Backdrop, CircularProgress } from '@mui/material';
import TextField from '@/components/ui/TextField/TextField';
import MultipleSelector from '@/components/elements/MultipleSelector/MultipleSelector';
import { FormLayout } from '@/components/layouts';
import SaveIcon from '@mui/icons-material/Save';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import DeleteIcon from '@mui/icons-material/Delete';
// import { MultipleTagSelector } from '@/components/ui';
import { useEffect, useState } from 'react';
import { TagModel } from '@/models';
import { useCachedNote, useDeleteNote, usePutNote, useTagList, usePostTag } from '@/hooks';
import { useNavigate } from 'react-router-dom';

interface NoteDetailFormProps {
	id: string;
}

export default function NoteDetailForm(props: NoteDetailFormProps) {
	const navigate = useNavigate();

	// ノートの取得
	const { note, isLoading: isLoadingGet } = useCachedNote(props.id);
	const { tagList } = useTagList();
	const { postTag } = usePostTag();

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

	const { deleteNote, isLoading: isLoadingDelete } = useDeleteNote({
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

	const { putNote, isLoading: isLoadingPut } = usePutNote({
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
						onClick: () => putNote({ id: props.id, title, content, tags }),
						disabled: !isChanged,
					},
					{
						icon: <DeleteIcon />,
						onClick: () => deleteNote(props.id),
					},
					{
						icon: isLocked ? <LockIcon /> : <LockOpenIcon />,
						onClick: () => setIsLocked(!isLocked),
					},
				]}
			>
				<TextField
					typography='title'
					readOnly={isLocked}
					value={title || ''}
					placeholder={title ? 'タイトル' : ''}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<MultipleSelector
					options={tagList?.map((tag) => tag.name) ?? []}
					value={tags.map((tag) => tag.name)}
					placeholder='タグ'
					onChange={(newTags) => {
						const updatedTags = newTags.map((newTag) => {
							const existingTag = tagList?.find((tag) => tag.name === newTag);
							if (existingTag) {
								return existingTag;
							} else {
								return { id: '', name: newTag } as TagModel;
							}
						});
						setTags(updatedTags);
					}}
					onCreate={(newTag) => postTag(newTag)}
					readOnly={isLocked}
				/>
				<TextField
					readOnly={isLocked}
					value={content}
					placeholder={content ? '内容' : ''}
					onChange={(e) => setContent(e.target.value)}
				/>
			</FormLayout>
		</>
	);
}
