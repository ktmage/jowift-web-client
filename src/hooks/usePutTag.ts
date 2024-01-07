import { Tag } from '@/models';
import { TagRepository } from '@/repositories';
import { useState } from 'react';
import useNotification from './useNotification';

export default function usePutTag() {
	const [tag, setTag] = useState<Tag | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<Error | null>(null);
	const tagRepository = new TagRepository();
	const { dispatchNotification } = useNotification();

	const putTag = async (id: string, name: string) => {
		setIsLoading(true);
		try {
			const result = await tagRepository.put(id, name);
			setTag(result);
			setError(null);
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

	return { putTag, tag, isLoading, error };
}
