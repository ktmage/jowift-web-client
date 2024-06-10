import { TagRepository } from '@/repositories';
import { useMutation } from '@/hooks';
import { TagModel } from '@/models';

export default function usePostTag(name: string) {
	const tagRepository = new TagRepository();

	const { mutate, isLoading, error } = useMutation<TagModel>(
		async () => {
			return await tagRepository.post(name);
		},
		'送信に成功しました',
		'送信に失敗しました',
	);

	return { postTag: mutate, isLoading, error };
}
