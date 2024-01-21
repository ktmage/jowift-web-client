import { NoteFilterContext } from '@/providers/NoteFilterProvider';
import { useContext } from 'react';

export default function useNoteFilter() {
	return useContext(NoteFilterContext);
}
