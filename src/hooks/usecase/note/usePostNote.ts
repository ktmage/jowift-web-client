import { useState } from 'react';
import { API_URL } from '@/config';
import useNotification from '../../useNotification';

export default function usePostNote() {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const { dispatchNotification } = useNotification();

	const postNote = async ({
		title,
		content,
		tagIds,
	}: {
		title: string;
		content: string;
		tagIds: string[];
	}) => {
		setIsLoading(true);
		setError(null);

		try {
			const response = await fetch(API_URL + '/note', {
				method: 'POST',
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
					message: '送信に失敗しました。',
				});
				throw new Error('Failed to post note');
			}
			dispatchNotification({
				severity: 'success',
				message: '送信に成功しました。',
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

	return { postNote, isLoading, error };
}
