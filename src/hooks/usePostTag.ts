import { Tag } from '@/models';
import { TagRepository } from '@/repositories';
import { useState } from 'react';
import useNotification from './useNotification';

export default function usePostTag() {
	const [tag, setTag] = useState<Tag | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<Error | null>(null);
	const tagRepository = new TagRepository();
	const { dispatchNotification } = useNotification();

	const postTag = async (name: string) => {
		setIsLoading(true);
		try {
			const result = await tagRepository.post(name);
			setTag(result);
			setError(null);
		} catch (e) {
			setError(e as Error);
		} finally {
			if (error) {
				dispatchNotification({
					severity: 'error',
					message: '送信に失敗しました。',
				});
			} else {
				dispatchNotification({
					severity: 'success',
					message: '送信に成功しました。',
				});
			}
			setIsLoading(false);
		}
	};

	return { postTag, tag, isLoading, error };
}
