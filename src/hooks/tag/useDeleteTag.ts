import { TagRepository } from '@/repositories';
import { useMutation } from '@/hooks';

export default function useDeleteTag(id: string) {
	const tagRepository = new TagRepository();

	const { data, mutate, isLoading, error } = useMutation<string>(async () => {
		return await tagRepository.delete(id);
	});

	return { deletedTagId: data, deleteTag: mutate, isLoading, error };
}
