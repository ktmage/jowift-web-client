import { NoteModel, TagModel } from '@/models';
import { NoteRepository } from '@/repositories';
import { useMutation, useNoteList } from '@/hooks';
import { MutationOptions } from '@/types';

export default function usePostNote(
	title: string,
	content: string,
	tagIds: TagModel[],
	options: MutationOptions<NoteModel> = {},
) {
	const noteRepository = new NoteRepository();
	const { noteList, mutate: noteListMutate } = useNoteList();

	const { mutate, isLoading, error } = useMutation<NoteModel>(
		async () => {
			return await noteRepository.post(
				title,
				content,
				tagIds.map((tag: TagModel) => tag.id),
			);
		},
		{
			...options,
			onSuccess: (createdNote: NoteModel) => {
				// 作成に成功した場合
				// NoteList(キャッシュ)に新しいNoteを追加 サーバー側と同期する。
				const newNoteList = noteList ? [...noteList, createdNote] : [createdNote];
				noteListMutate(newNoteList, false);

				options.onSuccess?.(createdNote);
			},
		},
	);

	return { postNote: mutate, isLoading, error };
}
