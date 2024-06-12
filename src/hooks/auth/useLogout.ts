import { AuthService } from '@/repositories';
import { useMutation } from '@/hooks';
import { MutationOptions } from '@/types';

export default function useLogout(options: MutationOptions<boolean> = {}) {
	const authService = new AuthService();

	const { mutate, isLoading, error } = useMutation<boolean>(
		async () => {
			return await authService.logout();
		},
		{
			...options,
		},
	);

	return { logout: mutate, isLoading, error };
}
