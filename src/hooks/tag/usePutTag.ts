import { TagRepository } from '@/repositories';
import { useMutation } from '@/hooks';

export default function usePutTag(id: string, name: string) {
	const tagRepository = new TagRepository();

	const { mutate, isLoading, error } = useMutation<void>(
		async () => {
			return await tagRepository.put(id, name);
		},
		'送信に成功しました',
		'送信に失敗しました',
	);

	return { putTag: mutate, isLoading, error };
}
