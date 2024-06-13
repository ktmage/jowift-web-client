import { NoteModel } from '@/models';
import { NoteRepository } from '@/repositories';
import { CacheKeyGenerator } from '@/utilities';
import { useDataFetcher } from '@/hooks';
import { SWR_NOTE_DEDUPING_INTERVAL_MINUTES } from '@/config';

export default function useNote(id: string) {
	const noteRepository = new NoteRepository();

	const { data, isLoading, error, mutate } = useDataFetcher<NoteModel>(
		CacheKeyGenerator.generateNoteKey(id),
		() => noteRepository.get(id),
		{
			dedupingInterval: 1000 * 60 * SWR_NOTE_DEDUPING_INTERVAL_MINUTES,
		},
	);

	return { note: data, isLoading, error, mutate };
}
