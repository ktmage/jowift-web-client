import { useState } from 'react';
import { API_URL } from '@/config';
import useNotification from './useNotification';

export default function useDeleteNote() {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const { dispatchNotification } = useNotification();

	const deleteNote = async (id: string) => {
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
				body: JSON.stringify({ noteId: id }),
			});

			if (!response.ok) {
				dispatchNotification({
					severity: 'error',
					message: '削除に失敗しました。',
				});
				throw new Error('Failed to post note');
			}
			dispatchNotification({
				severity: 'success',
				message: '削除に成功しました。',
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

	return { deleteNote, isLoading, error };
}
