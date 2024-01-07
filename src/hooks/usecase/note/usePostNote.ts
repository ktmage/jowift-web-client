import { Tag } from '@/models';
import { NoteRepository } from '@/repositories';
import { useState } from 'react';
import useNotification from '../../useNotification';

import useNoteList from './useNoteList';
import { useNavigate } from 'react-router-dom';

export default function usePostNote({
	title,
	content,
	tags,
}: {
	title: string;
	content: string;
	tags: Tag[];
}) {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<Error | null>(null);
	const noteRepository = new NoteRepository();
	const { dispatchNotification } = useNotification();

	const { mutate: mutateNoteList } = useNoteList();
	const Navigate = useNavigate();

	const effect = async (id: string) => {
		await mutateNoteList();
		Navigate(`/app/note/${id}`);
	};

	const postNote = async () => {
		setIsLoading(true);
		try {
			const result = await noteRepository.post(
				title,
				content,
				tags.map((tag: Tag) => tag.id),
			);
			setError(null);
			await effect(result.id);
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

	return { postNote, isLoading, error };
}
