import { TagRepository } from '@/repositories';
import { useState } from 'react';
import useNotification from '../../useNotification';
import useTag from './useTag';
import useTagList from './useTagList';

export default function usePutTag(id: string) {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<Error | null>(null);
	const tagRepository = new TagRepository();
	const { dispatchNotification } = useNotification();

	const { mutate: mutateTag } = useTag(id);
	const { mutate: mutateTagList } = useTagList();

	const effect = async () => {
		await mutateTag();
		await mutateTagList();
	};

	const putTag = async (name: string) => {
		setIsLoading(true);
		try {
			await tagRepository.put(id, name);
			setError(null);
			await effect();
			dispatchNotification({
				severity: 'success',
				message: '送信に成功しました。',
			});
		} catch (e) {
			dispatchNotification({
				severity: 'error',
				message: '送信に失敗しました。',
			});
			setError(e as Error);
		} finally {
			setIsLoading(false);
		}
	};

	return { putTag, isLoading, error };
}
