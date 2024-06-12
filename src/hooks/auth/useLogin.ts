import { AuthService } from '@/repositories';
import { UserModel } from '@/models';
import { useMutation } from '@/hooks';

export default function useLogin(email: string, password: string) {
	const authService = new AuthService();

	const { data, mutate, isLoading, error } = useMutation<UserModel>(async () => {
		return await authService.login(email, password);
	});

	return { user: data, login: mutate, isLoading, error };
}
