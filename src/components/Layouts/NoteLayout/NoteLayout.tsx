import { useNoteList, useResponsive, useFilteredNotes } from '@/hooks';
import { ListDetailLayout } from '..';
import { useNavigate, useMatch } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import { useState } from 'react';
import { TagModel } from '@/models';
import { Box, Button, Modal, Stack } from '@mui/material';
import { MultipleTagSelector } from '@/components/ui';

interface NoteLayoutProps {
	children: React.ReactNode;
}

export default function NoteLayout(props: NoteLayoutProps) {
	const { isDesktop } = useResponsive();
	const { noteList } = useNoteList();
	const [selectedTags, setSelectedTags] = useState<TagModel[]>([]);
	const { filteredNotes, isFiltered } = useFilteredNotes(noteList, selectedTags);

	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const navigate = useNavigate();
	const matchCreate = useMatch('/app/note/');

	return (
		<ListDetailLayout
			text={'ノート一覧'}
			items={
				filteredNotes?.map((note) => ({
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
					icon: isFiltered ? <FilterAltOffIcon /> : <FilterAltIcon />,
					onClick: () => handleOpen(),
				},
			]}
		>
			<Modal
				open={open}
				onClose={handleClose}
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Stack
					bgcolor={'background.paper'}
					width={isDesktop ? '50%' : '90%'}
					p={4}
				>
					<MultipleTagSelector
						value={selectedTags}
						setValue={setSelectedTags}
					/>
					<Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
						<Button
							onClick={() => setSelectedTags([])}
							disabled={!isFiltered}
						>
							リセット
						</Button>
					</Box>
				</Stack>
			</Modal>

			{props.children}
		</ListDetailLayout>
	);
}
