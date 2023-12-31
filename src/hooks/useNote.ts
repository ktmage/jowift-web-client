import { API_URL, SWR_NOTE_DEDUPING_INTERVAL_MINUTES } from '@/config';
import useSWR from 'swr';
import { Note } from '@/types';

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

	const { data, error } = useSWR<{ note: Note }>(API_URL + '/note/' + noteId, fetcher, {
		// 指定した間隔内では同じURLに対してリクエストを行わない
		dedupingInterval: 1000 * 60 * SWR_NOTE_DEDUPING_INTERVAL_MINUTES,
	});

	return { data, error };
}
