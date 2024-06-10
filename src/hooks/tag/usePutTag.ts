import { TagRepository } from '@/repositories';
import { useMutation } from '@/hooks';
import { TagModel } from '@/models';

export default function usePutTag(id: string, name: string) {
	const tagRepository = new TagRepository();

	const { data, mutate, isLoading, error } = useMutation<TagModel>(async () => {
		return await tagRepository.put(id, name);
	});

	return { updatedTag: data, putTag: mutate, isLoading, error };
}
