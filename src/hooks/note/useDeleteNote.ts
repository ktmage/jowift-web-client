import { NoteRepository } from '@/repositories';
import { useMutation } from '@/hooks';

export default function useDeleteNote(id: string) {
	const noteRepository = new NoteRepository();

	const { data, mutate, isLoading, error } = useMutation<string>(async () => {
		return await noteRepository.delete(id);
	});

	return { deletedNoteId: data, deleteNote: mutate, isLoading, error };
}
