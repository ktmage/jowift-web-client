import { useNoteList } from '@/hooks';
import { Box, List, ListItemButton } from '@mui/material';
import { Link } from 'react-router-dom';

export default function ListView() {
	const { data } = useNoteList();
	return (
		<Box
			bgcolor={'background.paper'}
			height={'100%'}
			display={'flex'}
			flexDirection={'column'}
			overflow={'visible'}
			sx={{
				overflowX: 'hidden',
			}}
		>
			<List>
				{data?.notes.map((note) => (
					<ListItemButton
						key={note.id}
						component={Link}
						to={'/app/note/' + note.id}
					>
						{note.title}
					</ListItemButton>
				))}
			</List>
		</Box>
	);
}
