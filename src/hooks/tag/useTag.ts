import TagRepository from '@/repositories/TagRepository';
import { TagModel } from '@/models';
import { SWR_TAG_DEDUPING_INTERVAL_MINUTES } from '@/config';
import CacheKeyGenerator from '@/util/CacheKeyGenerator';
import { useDataFetcher } from '@/hooks';

export default function useTag(id: string) {
	const tagRepository = new TagRepository();

	const { data, isLoading, error, mutate } = useDataFetcher<TagModel>(
		CacheKeyGenerator.generateTagKey(id),
		() => tagRepository.get(id),
		{
			dedupingInterval: 1000 * 60 * SWR_TAG_DEDUPING_INTERVAL_MINUTES,
		},
	);

	return { data, isLoading, error, mutate };
}
