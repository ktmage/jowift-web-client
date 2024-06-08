import { NoteRepository } from '@/repositories';
import { useState } from 'react';
import useNotification from '../useNotification';
import useNoteList from './useNoteList';
import { useNavigate } from 'react-router-dom';

export default function useDeleteNote(id: string) {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<Error | null>(null);
	const noteRepository = new NoteRepository();
	const { dispatchNotification } = useNotification();

	const { mutate: mutateNoteList } = useNoteList();
	const Navigate = useNavigate();

	// 削除の副作用
	const effect = async () => {
		await mutateNoteList();
		Navigate('/app/note');
	};

	const deleteNote = async () => {
		setIsLoading(true);
		try {
			await noteRepository.delete(id);
			setError(null);
			await effect();
			dispatchNotification({
				severity: 'success',
				message: '削除に成功しました。',
			});
		} catch (e) {
			dispatchNotification({
				severity: 'error',
				message: '削除に失敗しました。',
			});
			setError(e as Error);
		} finally {
			setIsLoading(false);
		}
	};

	return { deleteNote, isLoading, error };
}
