import { UserModel } from '@/models';
import { AuthService } from '@/repositories';
import { useMutation } from '@/hooks';

export default function useSignUp(name: string, email: string, password: string) {
	const authService = new AuthService();

	const { data, mutate, isLoading, error } = useMutation<UserModel>(async () => {
		return await authService.signup(name, email, password);
	});

	return { user: data, signUp: mutate, isLoading, error };
}
