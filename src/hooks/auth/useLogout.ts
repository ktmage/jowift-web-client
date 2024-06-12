import { AuthService } from '@/repositories';
import { useMutation } from '@/hooks';

export default function useLogout() {
	const authService = new AuthService();

	const { mutate, isLoading, error } = useMutation<boolean>(async () => {
		return await authService.logout();
	});

	return { logout: mutate, isLoading, error };
}
