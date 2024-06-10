import TagRepository from '@/repositories/TagRepository';
import { TagModel } from '@/models';
import { SWR_TAG_LIST_REFRESH_INTERVAL_MINUTES } from '@/config';
import CacheKeyGenerator from '@/util/CacheKeyGenerator';
import { useDataFetcher } from '@/hooks';

export default function useTagList() {
	const tagRepository = new TagRepository();

	const { data, isLoading, error, mutate } = useDataFetcher<TagModel[]>(
		{
			key: CacheKeyGenerator.generateTagListKey(),
			fetcher: () => tagRepository.getAll(),
			options: {
				dedupingInterval: 1000 * 60 * SWR_TAG_LIST_REFRESH_INTERVAL_MINUTES,
			},
		},
		'タグ一覧の取得に失敗しました',
	);

	return { data, isLoading, error, mutate };
}
