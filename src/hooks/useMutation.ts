// src/hooks/useMutation.ts
import { useState } from 'react';
import useNotification from './useNotification';

export default function useMutation<T>(mutationFunction: () => Promise<T>) {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);
	const { dispatchNotification } = useNotification();

	const mutate = async () => {
		setIsLoading(true);
		try {
			await mutationFunction();
			setError(null);
			dispatchNotification({
				severity: 'success',
			});
		} catch (error) {
			if (error instanceof Error) {
				setError(error);
				dispatchNotification({
					severity: 'error',
					message: error.message,
				});
			}
		} finally {
			setIsLoading(false);
		}
	};

	return { mutate, isLoading, error };
}
