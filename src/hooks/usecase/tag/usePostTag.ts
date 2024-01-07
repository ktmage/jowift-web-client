import { Tag } from '@/models';
import { TagRepository } from '@/repositories';
import { useState } from 'react';
import useNotification from '../../useNotification';
import useTagList from './useTagList';
import { useNavigate } from 'react-router-dom';

export default function usePostTag() {
	const [tag, setTag] = useState<Tag | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<Error | null>(null);
	const tagRepository = new TagRepository();
	const { dispatchNotification } = useNotification();

	const { mutate: mutateTagList } = useTagList();
	const Navigate = useNavigate();

	const effect = async (id: string) => {
		await mutateTagList();
		Navigate(`/app/tag/${id}`);
	};

	const postTag = async (name: string) => {
		setIsLoading(true);
		try {
			const result = await tagRepository.post(name);
			setTag(result);
			setError(null);
			console.log(result);
			await effect(result.id);
			dispatchNotification({
				severity: 'success',
				message: '送信に成功しました。',
			});
		} catch (e) {
			console.log(e);
			dispatchNotification({
				severity: 'error',
				message: '送信に失敗しました。',
			});
			setError(e as Error);
		} finally {
			setIsLoading(false);
		}
	};

	return { postTag, tag, isLoading, error };
}
