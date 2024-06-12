import { AuthService } from '@/repositories';
import { useEffect, useState } from 'react';

export default function useSession() {
	const authService = new AuthService();
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<Error | null>(null);
	const [data, setData] = useState<boolean | undefined>(undefined);

	const mutate = async () => {
		setIsLoading(true);
		try {
			setData(await authService.session());
			setError(null);
		} catch (error) {
			if (error instanceof Error) {
				setError(error);
			}
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		mutate();
	}, []);

	return { session: data, checkSession: mutate, isLoading, error };
}
