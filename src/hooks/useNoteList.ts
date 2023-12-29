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

type NoteListItem = {
	id: string;
	title: string;
	createdAt: string;
	updatedAt: string;
	author: Author;
	tags: NoteTag[];
};

export default function useNoteList() {
	const fetcher = (url: string) =>
		fetch(url, {
			method: 'GET',
			mode: 'cors',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
		}).then((res) => res.json());

	const { data, error } = useSWR<{ notes: NoteListItem[] }>(API_URL + '/note', fetcher);

	return { data, error };
}
