import { FormLayout } from '@/components/Layouts';
import { usePostNote, useTagList } from '@/hooks';
import { Tag } from '@/types';
import SaveIcon from '@mui/icons-material/Save';
import { Autocomplete, TextField } from '@mui/material';
import { useState } from 'react';

export default function NoteCreateForm() {
	const [title, setTitle] = useState<string>('');
	const [tags, setTags] = useState<Tag[]>([]);
	const [content, setContent] = useState<string>('');

	const { data } = useTagList();
	const { postNote } = usePostNote();

	// valueと同じidを持つタグをTagsから探して返す。
	const getTagsFromValues = (values: Tag[]): Tag[] => {
		const availableTags = data?.tags ?? [];
		return values.map((value) => availableTags.find((tag) => tag.id === value.id) || value);
	};

	return (
		<FormLayout
			headerItems={[
				{
					icon: <SaveIcon />,
					onClick: () =>
						postNote({
							title,
							content,
							tagIds: tags.map((tag) => tag.id),
						}),
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
				options={data?.tags ? data.tags : []}
				getOptionLabel={(option) => option.name}
				value={getTagsFromValues(tags)}
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
