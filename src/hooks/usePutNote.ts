import { useState } from 'react';
import { API_URL } from '@/config';
import useNotification from './useNotification';

export default function usePutNote() {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const { dispatchNotification } = useNotification();

	const putNote = async (
		{
			title,
			content,
			tagIds,
		}: {
			title: string;
			content: string;
			tagIds: string[];
		},
		id: string,
	) => {
		setIsLoading(true);
		setError(null);

		try {
			const response = await fetch(API_URL + '/note/' + id, {
				method: 'PUT',
				mode: 'cors',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					title,
					content,
					tagId: tagIds,
				}),
			});

			if (!response.ok) {
				dispatchNotification({
					severity: 'error',
					message: '更新に失敗しました。',
				});
				throw new Error('Failed to post note');
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

	return { putNote, isLoading, error };
}
