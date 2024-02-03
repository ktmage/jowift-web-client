import { useState, useEffect } from 'react';
import { Note, Tag } from '@/models';

export default function useFilteredNotes(data: Note[] | undefined, selectedTags: Tag[]) {
	const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
	const [isFiltered, setIsFiltered] = useState(false);

	useEffect(() => {
		const tagIds = selectedTags.map((tag) => tag.id ?? '');

		const filteredNotes = data?.filter((note) => {
			return tagIds.every((tagId) => note.tags?.some((tag) => tag.id === tagId));
		});
		setFilteredNotes(filteredNotes ?? []);
		setIsFiltered(selectedTags.length > 0);
	}, [data, selectedTags]);

	return { filteredNotes, isFiltered };
}
