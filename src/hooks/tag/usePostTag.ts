import { TagRepository } from '@/repositories';
import { useMutation } from '@/hooks';
import { TagModel } from '@/models';

export default function usePostTag(name: string) {
	const tagRepository = new TagRepository();

	const { data, mutate, isLoading, error } = useMutation<TagModel>(async () => {
		return await tagRepository.post(name);
	});

	return { createdTag: data, postTag: mutate, isLoading, error };
}
