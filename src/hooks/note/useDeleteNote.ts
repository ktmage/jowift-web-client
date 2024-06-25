import { NoteRepository } from '@/repositories';
import { useMutation, useNoteList } from '@/hooks';
import { NoteModel } from '@/models';
import { MutationOptions } from '@/types';

export default function useDeleteNote(options: MutationOptions<string> = {}) {
	const noteRepository = new NoteRepository();
	const { noteList, mutate: noteListMutate } = useNoteList();

	const { mutate, isLoading, error } = useMutation<string, string[]>(
		async (id: string) => {
			return await noteRepository.delete(id);
		},
		{
			...options,
			onSuccess: (deletedNoteId: string) => {
				// 削除に成功した場合
				// NoteList(キャッシュ)の該当するNoteを削除 サーバー側と同期する。
				const newNoteList = noteList?.filter(
					(note: NoteModel) => note.id !== deletedNoteId,
				);
				noteListMutate(newNoteList, false);

				options.onSuccess?.(deletedNoteId);
			},
		},
	);

	return { deleteNote: mutate, isLoading, error };
}
