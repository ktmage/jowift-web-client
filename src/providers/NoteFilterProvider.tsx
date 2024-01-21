import { MultipleTagSelector } from '@/components/UI';
import { useNoteList, useResponsive } from '@/hooks';
import { Note, Tag } from '@/models';
import { Box, Button, Modal, Stack } from '@mui/material';
import { createContext, ReactNode, useEffect, useState } from 'react';

interface NoteFilterContextProps {
	filteredNotes: Note[];
	isFiltered: boolean;
	handleOpen: () => void;
}

export const NoteFilterContext = createContext({} as NoteFilterContextProps);

export const NoteFilterProvider = ({ children }: { children: ReactNode }) => {
	const { isDesktop } = useResponsive();

	const { data } = useNoteList();
	const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
	const [isFiltered, setIsFiltered] = useState(false);

	useEffect(() => {
		filterNotesByTagId();
	}, [data]);

	useEffect(() => {
		filterNotesByTagId();
		setIsFiltered(selectedTags.length > 0);
	}, [selectedTags]);

	const filterNotesByTagId = () => {
		const tagIds = selectedTags.map((tag) => tag.id ?? '');

		const filteredNotes = data?.filter((note) => {
			return tagIds.every((tagId) => note.tags?.some((tag) => tag.id === tagId));
		});
		setFilteredNotes(filteredNotes ?? []);
	};

	return (
		<NoteFilterContext.Provider
			value={{
				filteredNotes,
				isFiltered,
				handleOpen,
			}}
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
						<Button onClick={filterNotesByTagId}>絞り込み</Button>
						<Button
							onClick={() => setSelectedTags([])}
							disabled={!isFiltered}
						>
							リセット
						</Button>
					</Box>
				</Stack>
			</Modal>
			{children}
		</NoteFilterContext.Provider>
	);
};
