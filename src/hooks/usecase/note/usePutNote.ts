import { NoteRepository } from '@/repositories';
import { useState } from 'react';
import useNotification from '../../useNotification';
import useNote from './useNote';
import useNoteList from './useNoteList';
import { Tag } from '@/models';

export default function usePutNote(id: string) {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<Error | null>(null);
	const noteRepository = new NoteRepository();
	const { dispatchNotification } = useNotification();

	const { mutate: mutateNote } = useNote(id);
	const { mutate: mutateNoteList } = useNoteList();

	const effect = async () => {
		await mutateNote();
		await mutateNoteList();
	};

	const putNote = async ({
		title,
		content,
		tags,
	}: {
		title: string;
		content: string;
		tags: Tag[];
	}) => {
		setIsLoading(true);
		try {
			await noteRepository.put(
				id,
				title,
				content,
				tags.map((tag: Tag) => tag.id),
			);
			setError(null);
			await effect();
			dispatchNotification({
				severity: 'success',
				message: '送信に成功しました。',
			});
		} catch (e) {
			dispatchNotification({
				severity: 'error',
				message: '送信に失敗しました。',
			});
			setError(e as Error);
		} finally {
			setIsLoading(false);
		}
	};

	return { putNote, isLoading, error };
}
