import { CacheKeyGenerator } from '@/util';
import { useDataFetcher } from '@/hooks';
import { SWR_USER_DEDUPING_INTERVAL_MINUTES } from '@/config';
import { UserModel } from '@/models';
import { AuthService } from '@/repositories';

export default function useProfile() {
	const authService = new AuthService();

	const { data, isLoading, error, mutate } = useDataFetcher<UserModel>(
		CacheKeyGenerator.generateUserKey(),
		() => authService.getProfile(),
		{
			dedupingInterval: 1000 * 60 * SWR_USER_DEDUPING_INTERVAL_MINUTES,
		},
	);

	return { profile: data, isLoading, error, mutateProfile: mutate };
}
