import { NoteRepository } from '@/repositories';
import { useMutation } from '@/hooks';

export default function useDeleteNote(id: string) {
	const noteRepository = new NoteRepository();

	const { mutate, isLoading, error } = useMutation<void>(
		async () => {
			return await noteRepository.delete(id);
		},
		'削除に成功しました',
		'削除に失敗しました',
	);

	return { deleteNote: mutate, isLoading, error };
}
