import { NoteRepository } from '@/repositories';
import { NoteModel, TagModel } from '@/models';
import { useMutation } from '@/hooks';

export default function usePutNote(id: string, title: string, content: string, tags: TagModel[]) {
	const noteRepository = new NoteRepository();

	const { data, mutate, isLoading, error } = useMutation<NoteModel>(async () => {
		return await noteRepository.put(
			id,
			title,
			content,
			tags.map((tag: TagModel) => tag.id),
		);
	});

	return { updatedNote: data, putNote: mutate, isLoading, error };
}
