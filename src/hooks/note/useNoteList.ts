import { SWR_NOTE_LIST_REFRESH_INTERVAL_MINUTES } from '@/config';
import { NoteModel } from '@/models';
import { NoteRepository } from '@/repositories';
import CacheKeyGenerator from '@/util/CacheKeyGenerator';
import useSWR from 'swr';

export default function useNoteList() {
	const repository = new NoteRepository();

	const { data, isLoading, error, mutate } = useSWR<NoteModel[]>(
		CacheKeyGenerator.generateNoteListKey(),
		() => repository.getAll(),
		{
			refreshInterval: 1000 * 60 * SWR_NOTE_LIST_REFRESH_INTERVAL_MINUTES,
			revalidateIfStale: false,
		},
	);

	return { data, isLoading, error, mutate };
}
