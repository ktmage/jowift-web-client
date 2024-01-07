import TagRepository from '@/repositories/TagRepository';
import Tag from '@/models/Tag';
import useSWR from 'swr';
import { SWR_TAG_DEDUPING_INTERVAL_MINUTES } from '@/config';
import CacheKeyGenerator from '@/util/CacheKeyGenerator';

export default function useTag(id: string) {
	const tagRepository = new TagRepository();

	const { data, isLoading, error, mutate } = useSWR<Tag>(
		CacheKeyGenerator.generateTagKey(id),
		() => tagRepository.get(id),
		{
			dedupingInterval: 1000 * 60 * SWR_TAG_DEDUPING_INTERVAL_MINUTES,
		},
	);

	return { data, isLoading, error, mutate };
}
