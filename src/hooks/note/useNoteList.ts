import { SWR_NOTE_LIST_REFRESH_INTERVAL_MINUTES } from '@/config';
import { NoteModel } from '@/models';
import { NoteRepository } from '@/repositories';
import CacheKeyGenerator from '@/util/CacheKeyGenerator';
import { useDataFetcher } from '@/hooks';

export default function useNoteList() {
	const repository = new NoteRepository();

	const { data, isLoading, error, mutate } = useDataFetcher<NoteModel[]>(
		CacheKeyGenerator.generateNoteListKey(),
		() => repository.getAll(),
		{
			dedupingInterval: 1000 * 60 * SWR_NOTE_LIST_REFRESH_INTERVAL_MINUTES,
		},
	);

	return { data, isLoading, error, mutate };
}
