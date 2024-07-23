import { SWR_NOTE_LIST_REFRESH_INTERVAL_MINUTES } from '@/config';
import { NoteModel, TagModel } from '@/models';
import { NoteRepository } from '@/repositories';
import { CacheKeyGenerator } from '@/utilities';
import { useDataFetcher } from '@/hooks';
import { useEffect, useState } from 'react';

export default function useNoteList() {
	const repository = new NoteRepository();

	const { data, isLoading, error, mutate } = useDataFetcher<NoteModel[]>(
		CacheKeyGenerator.generateNoteListKey(),
		() => repository.getAll(),
		{
			dedupingInterval: 1000 * 60 * SWR_NOTE_LIST_REFRESH_INTERVAL_MINUTES,
		},
	);

	const [filteredNotes, setFilteredNotes] = useState<NoteModel[]>([]);
	const [filterTags, setFilterTags] = useState<TagModel[]>([]);

	// 特定のタグでフィルタリングする
	useEffect(() => {
		if (data) {
			if (filterTags.length === 0) {
				setFilteredNotes(data);
			} else {
				const filtered = data.filter((note) => {
					return filterTags.every((tag) =>
						note.tags.some((noteTag) => noteTag.id === tag.id),
					);
				});
				setFilteredNotes(filtered);
			}
		}
	}, [data, filterTags]);

	return { noteList: filteredNotes, isLoading, error, mutate, filterTags, setFilterTags };
}
