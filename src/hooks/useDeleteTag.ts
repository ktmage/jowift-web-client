import { TagRepository } from '@/repositories';
import { useState } from 'react';
import useNotification from './useNotification';

export default function useDeleteTag() {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<Error | null>(null);
	const tagRepository = new TagRepository();
	const { dispatchNotification } = useNotification();

	const deleteTag = async (id: string) => {
		setIsLoading(true);
		try {
			await tagRepository.delete(id);
			setError(null);
			dispatchNotification({
				severity: 'success',
				message: '削除に成功しました。',
			});
		} catch (e) {
			dispatchNotification({
				severity: 'error',
				message: '削除に失敗しました。',
			});
			setError(e as Error);
		} finally {
			setIsLoading(false);
		}
	};

	return { deleteTag, isLoading, error };
}
