import { NoteRepository } from '@/repositories';
import { TagModel } from '@/models';
import { useMutation } from '@/hooks';

export default function usePutNote(id: string, title: string, content: string, tags: TagModel[]) {
	const noteRepository = new NoteRepository();

	const { mutate, isLoading, error } = useMutation(async () => {
		return await noteRepository.put(
			id,
			title,
			content,
			tags.map((tag: TagModel) => tag.id),
		);
	});

	return { putNote: mutate, isLoading, error };
}
