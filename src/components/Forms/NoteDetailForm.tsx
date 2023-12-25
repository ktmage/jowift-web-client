import { FormLayout } from '../Layouts';
import SaveIcon from '@mui/icons-material/Save';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { Autocomplete, TextField } from '@mui/material';
import { useState } from 'react';

export default function NoteDetailForm() {
	const [title, setTitle] = useState<string>('');
	const [tags, setTags] = useState<string[]>([]);
	const [content, setContent] = useState<string>('');
	const tagOptions = ['tag1', 'tag2', 'tag3'];

	const [isLocked, setIsLocked] = useState<boolean>(true);
	return (
		<FormLayout
			headerItems={[
				{
					icon: <SaveIcon />,
					onClick: () => console.log('save'),
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
			<Autocomplete
				readOnly={isLocked}
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
				inputProps={{ readOnly: isLocked }}
				multiline
				value={content}
				placeholder='内容'
				onChange={(e) => setContent(e.target.value)}
			/>
		</FormLayout>
	);
}
