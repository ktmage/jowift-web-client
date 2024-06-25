import { NoteRepository } from '@/repositories';
import { NoteModel, TagModel } from '@/models';
import { useMutation, useNoteList } from '@/hooks';
import { MutationOptions } from '@/types';

type MutationFunctionArgs = {
	id: string;
	title: string;
	content: string;
	tags: TagModel[];
};

export default function usePutNote(options: MutationOptions<NoteModel> = {}) {
	const noteRepository = new NoteRepository();
	const { noteList, mutate: noteListMutate } = useNoteList();

	const {
		mutate: mutationMutate,
		isLoading,
		error,
	} = useMutation<NoteModel, MutationFunctionArgs[]>(
		async ({ id, title, content, tags }: MutationFunctionArgs) => {
			return await noteRepository.put(
				id,
				title,
				content,
				tags.map((tag: TagModel) => tag.id),
			);
		},
		{
			...options,
			onSuccess: (updatedNote: NoteModel) => {
				// 更新に成功した場合
				// NoteList(キャッシュ)の該当するNoteを更新 サーバー側と同期する。
				const newNoteList = noteList?.map((note: NoteModel) => {
					if (note.id === updatedNote.id) {
						return updatedNote;
					}
					return note;
				});
				noteListMutate(newNoteList, false);

				options.onSuccess?.(updatedNote);
			},
		},
	);

	return { putNote: mutationMutate, isLoading, error };
}
