import { NoteModel } from '@/models';
import { useEffect, useState } from 'react';
import useNoteList from './useNoteList';

export default function useCachedNote(id: string) {
	const [note, setNote] = useState<NoteModel | null>(null);
	const { noteList, isLoading, error } = useNoteList();

	useEffect(() => {
		if (noteList) {
			const targetNote = noteList.find((note: NoteModel) => note.id === id);
			if (targetNote) {
				setNote(targetNote);
			}
		}
	}, [noteList, id]);

	return { note, isLoading, error };
}
