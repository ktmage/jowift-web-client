import { NoteModel } from '@/models';
import { NoteRepository } from '@/repositories';
import CacheKeyGenerator from '@/util/CacheKeyGenerator';
import { useDataFetcher } from '@/hooks';

export default function useNote(id: string) {
	const noteRepository = new NoteRepository();

	const { data, isLoading, error, mutate } = useDataFetcher<NoteModel>(
		CacheKeyGenerator.generateNoteKey(id),
		() => noteRepository.get(id),
		{
			dedupingInterval: 1000 * 60 * 5,
		},
	);

	return { data, isLoading, error, mutate };
}
