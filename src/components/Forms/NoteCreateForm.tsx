import { FormLayout } from '@/components/Layouts';
import { usePostNote } from '@/hooks';
import SaveIcon from '@mui/icons-material/Save';
import { Backdrop, CircularProgress, TextField } from '@mui/material';
import { useState } from 'react';
import { MultipleTagSelector } from '../UI';
import { Tag } from '@/models';

export default function NoteCreateForm() {
	const [title, setTitle] = useState<string>('');
	const [tags, setTags] = useState<Tag[]>([]);
	const [content, setContent] = useState<string>('');

	const { postNote, isLoading } = usePostNote({
		title,
		content,
		tags,
	});

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
						disabled: isLoading,
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
