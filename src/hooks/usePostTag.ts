import { useState } from 'react';
import { API_URL } from '@/config';

export default function usePostTag() {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const postTag = async (name: string) => {
		setIsLoading(true);
		setError(null);

		try {
			const response = await fetch(API_URL + '/tag', {
				method: 'POST',
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
				throw new Error('Failed to post tag');
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

	return { postTag, isLoading, error };
}
