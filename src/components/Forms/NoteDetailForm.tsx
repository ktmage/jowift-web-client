import { FormLayout } from '../Layouts';
import SaveIcon from '@mui/icons-material/Save';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { Autocomplete, TextField } from '@mui/material';
import { useEffect, useState } from 'react';

export default function NoteDetailForm() {
	// 仮のタグデータ
	const mockTags = ['tag1', 'tag2', 'tag3'];

	// 仮のノートデータ
	const mockNote = {
		title: 'テストタイトル',
		tags: [mockTags[0], mockTags[2]],
		content: 'テストコンテンツ',
	};

	const [title, setTitle] = useState<string>(mockNote.title);
	const [tags, setTags] = useState<string[]>(mockNote.tags);
	const [content, setContent] = useState<string>(mockNote.content);

	const [isLocked, setIsLocked] = useState<boolean>(true);
	const [isChanged, setIsChanged] = useState<boolean>(false);

	// 参照元のデータと比較して変更があったかどうかを判定、変更があった場合はフラグを立てる。
	useEffect(() => {
		const tagsChanged = JSON.stringify(mockNote.tags) !== JSON.stringify(tags);
		const titleChanged = mockNote.title !== title;
		const contentChanged = mockNote.content !== content;
		setIsChanged(tagsChanged || titleChanged || contentChanged);
	}, [title, tags, content, mockNote.title, mockNote.tags, mockNote.content]);

	return (
		<FormLayout
			headerItems={[
				{
					icon: <SaveIcon />,
					onClick: () => (isChanged ? console.log('save') : console.log('no change')),
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
				options={mockTags}
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
