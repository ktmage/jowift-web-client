import { FormLayout } from '@/components/Layouts';
import SaveIcon from '@mui/icons-material/Save';
import { Autocomplete, TextField } from '@mui/material';
import { useState } from 'react';

export default function NoteCreateForm() {
	const [title, setTitle] = useState<string>('');
	const [tags, setTags] = useState<string[]>([]);
	const [content, setContent] = useState<string>('');
	const tagOptions = ['tag1', 'tag2', 'tag3'];
	return (
		<FormLayout
			headerItems={[
				{
					icon: <SaveIcon />,
					onClick: () => console.log('save'),
				},
			]}
		>
			<TextField
				inputProps={{ sx: { fontSize: '1.5rem', fontWeight: 'bold' } }}
				value={title}
				placeholder='タイトル'
				onChange={(e) => setTitle(e.target.value)}
			/>
			<Autocomplete
				multiple
				options={tagOptions}
				value={tags}
				onChange={(e, value) => setTags(value)}
				renderInput={(params) => (
					<TextField
						{...params}
						placeholder='タグ'
						size='small'
					/>
				)}
			/>
			<TextField
				multiline
				value={content}
				placeholder='内容'
				onChange={(e) => setContent(e.target.value)}
			/>
		</FormLayout>
	);
}
