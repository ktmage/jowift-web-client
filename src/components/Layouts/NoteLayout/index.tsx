import { useNoteList } from '@/hooks';
import { ListDetailLayout } from '..';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

interface NoteLayoutProps {
	children: React.ReactNode;
}

export default function NoteLayout(props: NoteLayoutProps) {
	const { data } = useNoteList();
	const navigate = useNavigate();

	return (
		<ListDetailLayout
			items={
				data?.map((note) => ({
					text: note.title,
					to: `/app/note/${note.id}`,
				})) ?? []
			}
			listHeaderItems={[
				{
					icon: <AddIcon />,
					onClick: () => navigate('/app/note'),
				},
			]}
		>
			{props.children}
		</ListDetailLayout>
	);
}
