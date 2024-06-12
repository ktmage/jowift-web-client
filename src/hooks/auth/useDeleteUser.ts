import { AuthService } from '@/repositories';
import { useMutation } from '@/hooks';

export default function useDeleteUser() {
	const authService = new AuthService();

	const { data, mutate, isLoading, error } = useMutation<boolean>(async () => {
		return await authService.delete();
	});

	return { data, deleteUser: mutate, isLoading, error };
}
