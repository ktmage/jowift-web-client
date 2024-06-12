import { AuthService } from '@/repositories';
import { UserModel } from '@/models';
import { useMutation } from '@/hooks';
import { MutationOptions } from '@/types';

export default function useLogin(
	email: string,
	password: string,
	options: MutationOptions<UserModel> = {},
) {
	const authService = new AuthService();

	const { mutate, isLoading, error } = useMutation<UserModel>(
		async () => {
			return await authService.login(email, password);
		},
		{
			...options,
		},
	);

	return { login: mutate, isLoading, error };
}
