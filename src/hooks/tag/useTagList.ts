import TagRepository from '@/repositories/TagRepository';
import Tag from '@/models/Tag';
import useSWR from 'swr';
import { SWR_TAG_LIST_REFRESH_INTERVAL_MINUTES } from '@/config';
import CacheKeyGenerator from '@/util/CacheKeyGenerator';

export default function useTagList() {
	const tagRepository = new TagRepository();

	const { data, isLoading, error, mutate } = useSWR<Tag[]>(
		CacheKeyGenerator.generateTagListKey,
		() => tagRepository.getAll(),
		{
			refreshInterval: 1000 * 60 * SWR_TAG_LIST_REFRESH_INTERVAL_MINUTES,
			revalidateIfStale: false,
		},
	);

	return { data, isLoading, error, mutate };
}
