// src/hooks/useMutation.ts
import { useState } from 'react';
import useNotification from './useNotification';

export default function useMutation<T>(
	mutationFunction: () => Promise<T>,
	successMessage: string,
	errorMessage: string,
) {
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
				message: successMessage,
			});
		} catch (e) {
			setError(e as Error);
			dispatchNotification({
				severity: 'error',
				message: errorMessage,
			});
		} finally {
			setIsLoading(false);
		}
	};

	return { mutate, isLoading, error };
}
