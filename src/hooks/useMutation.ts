// src/hooks/useMutation.ts
import { useState } from 'react';
import useNotification from './useNotification';
import { MutationOptions } from '@/types';

export default function useMutation<T, Args extends unknown[]>(
	mutationFunction: (...args: Args) => Promise<T>,
	options: MutationOptions<T> = {},
) {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);
	const [data, setData] = useState<T | null>(null);
	const { dispatchNotification } = useNotification();

	const mutate = async (...args: Args) => {
		setIsLoading(true);
		options.onStart?.();

		try {
			const result = await mutationFunction(...args);
			setData(result);
			setError(null);
			dispatchNotification({
				severity: 'success',
			});
			options.onSuccess?.(result);
		} catch (error) {
			if (error instanceof Error) {
				setError(error);
				dispatchNotification({
					severity: 'error',
					message: error.message,
				});
				options.onError?.(error);
			}
		} finally {
			setIsLoading(false);
			options.onSettled?.(data, error);
		}
	};

	return { data, mutate, isLoading, error };
}
