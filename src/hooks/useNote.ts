import { API_URL } from '@/config';
import useSWR from 'swr';

type Author = {
	name: string;
};

type Tag = {
	id: string;
	name: string;
};

type NoteTag = {
	tag: Tag;
};

type Note = {
	id: string;
	title: string;
	content: string;
	createdAt: string;
	updatedAt: string;
	author: Author;
	tags: NoteTag[];
};

export default function useNote(noteId: string) {
	const fetcher = (url: string) =>
		fetch(url, {
			method: 'GET',
			mode: 'cors',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
		}).then((res) => res.json());

	const { data, error } = useSWR<{ note: Note }>(API_URL + '/note/' + noteId, fetcher);

	return { data, error };
}
