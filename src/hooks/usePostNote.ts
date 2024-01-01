import { useState } from 'react';
import { API_URL } from '@/config';
import { Note } from '@/types';

export default function usePostNote() {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const postNote = async (data: Note) => {
		setIsLoading(true);
		setError(null);

		try {
			const response = await fetch(API_URL + '/note', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});

			if (!response.ok) {
				throw new Error('Failed to post note');
			}

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
