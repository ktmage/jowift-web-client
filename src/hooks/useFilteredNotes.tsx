import { useState, useEffect } from 'react';
import { NoteModel, TagModel } from '@/models';

export default function useFilteredNotes(data: NoteModel[] | undefined, selectedTags: TagModel[]) {
	const [filteredNotes, setFilteredNotes] = useState<NoteModel[]>([]);
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
