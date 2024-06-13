import { TagRepository } from '@/repositories';
import { TagModel } from '@/models';
import { SWR_TAG_LIST_REFRESH_INTERVAL_MINUTES } from '@/config';
import { CacheKeyGenerator } from '@/utilities';
import { useDataFetcher } from '@/hooks';

export default function useTagList() {
	const tagRepository = new TagRepository();

	const { data, isLoading, error, mutate } = useDataFetcher<TagModel[]>(
		CacheKeyGenerator.generateTagListKey(),
		() => tagRepository.getAll(),
		{
			dedupingInterval: 1000 * 60 * SWR_TAG_LIST_REFRESH_INTERVAL_MINUTES,
		},
	);

	return { tagList: data, isLoading, error, mutateTagList: mutate };
}
