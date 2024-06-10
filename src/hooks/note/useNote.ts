import { NoteModel } from '@/models';
import { NoteRepository } from '@/repositories';
import CacheKeyGenerator from '@/util/CacheKeyGenerator';
import { useDataFetcher } from '@/hooks';

export default function useNote(id: string) {
	const noteRepository = new NoteRepository();

	const { data, isLoading, error, mutate } = useDataFetcher<NoteModel>(
		{
			key: CacheKeyGenerator.generateNoteKey(id),
			fetcher: () => noteRepository.get(id),
			options: {
				dedupingInterval: 1000 * 60 * 5,
			},
		},
		'ノートの取得に失敗しました',
	);

	return { data, isLoading, error, mutate };
}
