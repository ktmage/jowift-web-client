import { UserRepository } from '@/repositories';
import { SWR_USER_DEDUPING_INTERVAL_MINUTES } from '@/config';
import CacheKeyGenerator from '@/util/CacheKeyGenerator';
import useSWR from 'swr';

export default function useUser() {
	const { data, isLoading, error, mutate } = useSWR(
		CacheKeyGenerator.generateUserKey(),
		() => UserRepository.get(),
		{
			dedupingInterval: 1000 * 60 * SWR_USER_DEDUPING_INTERVAL_MINUTES,
		},
	);
	return { data, isLoading, error, mutate };
}
