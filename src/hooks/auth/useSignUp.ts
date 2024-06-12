import { UserModel } from '@/models';
import { AuthService } from '@/repositories';
import { useMutation, useProfile } from '@/hooks';
import { MutationOptions } from '@/types';

export default function useSignUp(
	name: string,
	email: string,
	password: string,
	options: MutationOptions<UserModel> = {},
) {
	const authService = new AuthService();
	const { mutateProfile } = useProfile();

	const { data, mutate, isLoading, error } = useMutation<UserModel>(
		async () => {
			return await authService.signup(name, email, password);
		},
		{
			...options,
			onSuccess: (data) => {
				mutateProfile(data, false);
			},
		},
	);

	return { user: data, signUp: mutate, isLoading, error };
}
