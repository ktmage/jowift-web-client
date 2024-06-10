import { TagRepository } from '@/repositories';
import { useMutation } from '@/hooks';

export default function useDeleteTag(id: string) {
	const tagRepository = new TagRepository();

	const { mutate, isLoading, error } = useMutation<void>(
		async () => {
			return await tagRepository.delete(id);
		},
		'削除に成功しました',
		'削除に失敗しました',
	);

	return { deleteTag: mutate, isLoading, error };
}
