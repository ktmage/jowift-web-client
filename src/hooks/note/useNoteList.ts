import { SWR_NOTE_LIST_REFRESH_INTERVAL_MINUTES } from '@/config';
import { NoteModel } from '@/models';
import { NoteRepository } from '@/repositories';
import CacheKeyGenerator from '@/util/CacheKeyGenerator';
import { useDataFetcher } from '@/hooks';

export default function useNoteList() {
	const repository = new NoteRepository();

	const { data, isLoading, error, mutate } = useDataFetcher<NoteModel[]>(
		{
			key: CacheKeyGenerator.generateNoteListKey(),
			fetcher: () => repository.getAll(),
			options: {
				refreshInterval: 1000 * 60 * SWR_NOTE_LIST_REFRESH_INTERVAL_MINUTES,
				revalidateIfStale: false,
			},
		},
		'ノートの取得に失敗しました',
	);

	return { data, isLoading, error, mutate };
}
