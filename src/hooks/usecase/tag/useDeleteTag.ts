import { TagRepository } from '@/repositories';
import { useState } from 'react';
import useNotification from '../../useNotification';
import useTagList from './useTagList';
import { useNavigate } from 'react-router-dom';

export default function useDeleteTag(id: string) {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<Error | null>(null);
	const tagRepository = new TagRepository();
	const { dispatchNotification } = useNotification();

	const { mutate: mutateTagList } = useTagList();
	const Navigate = useNavigate();

	// 削除の副作用
	const effect = async () => {
		await mutateTagList();
		Navigate('/app/tag');
	};

	const deleteTag = async () => {
		setIsLoading(true);
		try {
			await tagRepository.delete(id);
			setError(null);
			await effect();
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
