import { FormLayout } from '@/components/layouts';
import { usePostNote } from '@/hooks';
import SaveIcon from '@mui/icons-material/Save';
import { Backdrop, CircularProgress, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { MultipleTagSelector } from '@/components/ui';
import { TagModel } from '@/models';
import { useNavigate } from 'react-router-dom';

export default function NoteCreateForm() {
	const navigate = useNavigate();

	const [title, setTitle] = useState<string>('');
	const [tags, setTags] = useState<TagModel[]>([]);
	const [content, setContent] = useState<string>('');

	const [isChanged, setIsChanged] = useState<boolean>(false);

	const { postNote, isLoading } = usePostNote(title, content, tags, {
		onSuccess(createdNote) {
			// 作成に成功した場合、作成したNoteの詳細ページに遷移
			navigate(`/app/note/${createdNote.id}`);
		},
	});

	useEffect(() => {
		setIsChanged(title !== '' && content !== '' && tags.length > 0);
	}, [title, content, tags]);

	return (
		<>
			<Backdrop open={isLoading}>
				<CircularProgress />
			</Backdrop>
			<FormLayout
				headerItems={[
					{
						icon: <SaveIcon />,
						onClick: () => postNote(),
						disabled: isLoading || !isChanged,
					},
				]}
			>
				<TextField
					inputProps={{
						sx: { fontSize: '1.5rem', fontWeight: 'bold' },
						readOnly: isLoading,
					}}
					value={title}
					placeholder='タイトル'
					onChange={(e) => setTitle(e.target.value)}
				/>
				<MultipleTagSelector
					value={tags}
					setValue={setTags}
					readonly={isLoading}
				/>
				<TextField
					inputProps={{ readOnly: isLoading }}
					multiline
					value={content}
					placeholder='内容'
					onChange={(e) => setContent(e.target.value)}
				/>
			</FormLayout>
		</>
	);
}
