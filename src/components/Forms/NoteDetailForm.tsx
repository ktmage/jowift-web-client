import { FormLayout } from '../Layouts';
import SaveIcon from '@mui/icons-material/Save';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNote } from '@/hooks';
import { Tag } from '@/types';
import { MultipleTagSelector } from '../UI';

export default function NoteDetailForm() {
	const { id } = useParams<{ id: string }>();
	const { data } = useNote(id || '');

	const [title, setTitle] = useState<string>('');
	const [tags, setTags] = useState<Tag[]>([]);
	const [content, setContent] = useState<string>('');

	const [isLocked, setIsLocked] = useState<boolean>(true);
	const [isChanged, setIsChanged] = useState<boolean>(false);

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
			JSON.stringify(data?.note.tags.map((tag) => tag.tag.name)) !== JSON.stringify(tags);
		const titleChanged = data?.note.title !== title;
		const contentChanged = data?.note.content !== content;
		setIsChanged(tagsChanged || titleChanged || contentChanged);
	}, [title, tags, content, data?.note.title, data?.note.tags, data?.note.content]);

	return (
		<FormLayout
			headerItems={[
				{
					icon: <SaveIcon />,
					onClick: () => (isChanged ? console.log('save') : console.log('no change')),
				},
				{
					// 任意のタイミングで初期化処理を実行
					icon: <AutorenewIcon />,
					onClick: () => initialize(),
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
	);
}
