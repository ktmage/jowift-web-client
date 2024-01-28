import { useNoteFilter } from '@/hooks';
import { ListDetailLayout } from '..';
import { useNavigate, useMatch } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';

interface NoteLayoutProps {
	children: React.ReactNode;
}

export default function NoteLayout(props: NoteLayoutProps) {
	const { filteredNotes: data, handleOpen, isFiltered } = useNoteFilter();
	const navigate = useNavigate();
	const matchCreate = useMatch('/app/note/');

	return (
		<ListDetailLayout
			text={'ノート一覧'}
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
					disabled: !!matchCreate,
				},
				{
					icon: isFiltered ? <FilterAltIcon /> : <FilterAltOffIcon />,
					onClick: () => handleOpen(),
				},
			]}
		>
			{props.children}
		</ListDetailLayout>
	);
}
