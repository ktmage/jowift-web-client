import { FormLayout } from '@/components/layouts';
import { usePostNote, usePostTag, useTagList } from '@/hooks';
import SaveIcon from '@mui/icons-material/Save';
import { Backdrop, CircularProgress } from '@mui/material';
import TextField from '@/components/ui/TextField/TextField';
import { useEffect, useState } from 'react';
import MultipleSelector from '@/components/elements/MultipleSelector/MultipleSelector';
import { TagModel } from '@/models';
import { useNavigate } from 'react-router-dom';

export default function NoteCreateForm() {
	const { tagList } = useTagList();
	const { postTag } = usePostTag();

	const navigate = useNavigate();

	const [title, setTitle] = useState<string>('');
	const [tags, setTags] = useState<TagModel[]>([]);
	const [content, setContent] = useState<string>('');

	const [isChanged, setIsChanged] = useState<boolean>(false);

	const { postNote, isLoading } = usePostNote({
		onSuccess(createdNote) {
			// 作成に成功した場合、作成したNoteの詳細ページに遷移
			navigate(`/${createdNote.id}`);
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
				headerItems={{
					right: [
						{
							icon: <SaveIcon />,
							onClick: () =>
								postNote({
									title,
									content,
									tags,
								}),
							disabled: isLoading || !isChanged,
						},
					],
					left: [
						{
							icon: <SaveIcon />,
							onClick: () =>
								postNote({
									title,
									content,
									tags,
								}),
							disabled: isLoading || !isChanged,
						},
					],
				}}
			>
				<TextField
					value={title}
					typography='title'
					placeholder='タイトル'
					onChange={(e) => setTitle(e.target.value)}
					readOnly={isLoading}
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
					readOnly={isLoading}
				/>
				<TextField
					value={content}
					typography='body'
					placeholder='内容'
					onChange={(e) => setContent(e.target.value)}
					readOnly={isLoading}
				/>
			</FormLayout>
		</>
	);
}
