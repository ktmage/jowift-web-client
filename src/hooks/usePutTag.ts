import { useState } from 'react';
import { API_URL } from '@/config';
import useNotification from './useNotification';

export default function usePutTag() {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const { dispatchNotification } = useNotification();

	const putTag = async (name: string, id: string) => {
		setIsLoading(true);
		setError(null);

		try {
			const response = await fetch(API_URL + '/tag/' + id, {
				method: 'PUT',
				mode: 'cors',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name,
				}),
			});

			if (!response.ok) {
				dispatchNotification({
					severity: 'error',
					message: '更新に失敗しました。',
				});
				throw new Error('Failed to post tag');
			}
			dispatchNotification({
				severity: 'success',
				message: '更新に成功しました。',
			});
			const result = await response.json();
			return result;
		} catch (err) {
			if (err instanceof Error) {
				setError(err.message);
			} else {
				setError('An unknown error occurred');
			}
		} finally {
			setIsLoading(false);
		}
	};

	return { putTag, isLoading, error };
}
