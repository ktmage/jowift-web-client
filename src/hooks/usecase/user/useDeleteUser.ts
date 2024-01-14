import { UserRepository } from '@/repositories';
import { useState } from 'react';
import { useAuth, useNotification } from '@/hooks';

export default function useUser() {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<Error | null>(null);
	const { logout } = useAuth();
	const { dispatchNotification } = useNotification();

	const effect = () => {
		logout();
	};

	const deleteUser = async () => {
		setIsLoading(true);
		try {
			await UserRepository.delete();
			setError(null);
			effect();
			dispatchNotification({
				severity: 'success',
				message: '削除に成功しました。',
			});
		} catch (e) {
			setError(e as Error);
		} finally {
			setIsLoading(false);
		}
	};

	return { deleteUser, isLoading, error };
}
