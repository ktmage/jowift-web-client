import { AuthService } from '@/repositories';
import { useMutation } from '@/hooks';
import { MutationOptions } from '@/types';

export default function useDeleteUser(options: MutationOptions<string> = {}) {
	const authService = new AuthService();

	const { mutate, isLoading, error } = useMutation<string>(
		async () => {
			return await authService.delete();
		},
		{
			...options,
		},
	);

	return { deleteUser: mutate, isLoading, error };
}
