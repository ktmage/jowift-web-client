import { NoteModel, TagModel } from '@/models';
import { NoteRepository } from '@/repositories';
import useMutation from '../useMutation';

export default function usePostNote(title: string, content: string, tagIds: TagModel[]) {
	const noteRepository = new NoteRepository();

	const { mutate, isLoading, error } = useMutation<NoteModel>(async () => {
		return await noteRepository.post(
			title,
			content,
			tagIds.map((tag: TagModel) => tag.id),
		);
	});

	return { postNote: mutate, isLoading, error };
}
