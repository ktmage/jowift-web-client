import { SWR_NOTE_LIST_REFRESH_INTERVAL_MINUTES } from '@/config';
import { Note } from '@/models';
import { NoteRepository } from '@/repositories';
import CacheKeyGenerator from '@/util/CacheKeyGenerator';
import useSWR from 'swr';

export default function useNoteList() {
	const repository = new NoteRepository();

	const { data, isLoading, error, mutate } = useSWR<Note[]>(
		CacheKeyGenerator.generateNoteListKey(),
		() => repository.getAll(),
		{
			refreshInterval: 1000 * 60 * SWR_NOTE_LIST_REFRESH_INTERVAL_MINUTES,
			revalidateIfStale: false,
		},
	);

	return { data, isLoading, error, mutate };
}

// import { API_URL, SWR_NOTE_LIST_REFRESH_INTERVAL_MINUTES } from '@/config';
// import useSWR from 'swr';
// import { NoteListItem } from '@/types';

// export default function useNoteList() {
// 	const fetcher = (url: string) =>
// 		fetch(url, {
// 			method: 'GET',
// 			mode: 'cors',
// 			credentials: 'include',
// 			headers: {
// 				'Content-Type': 'application/json',
// 			},
// 		}).then((res) => res.json());

// 	const { data, isLoading, error, mutate } = useSWR<{ notes: NoteListItem[] }>(
// 		API_URL + '/note',
// 		fetcher,
// 		{
// 			// 一定間隔でデータを同期
// 			refreshInterval: 1000 * 60 * SWR_NOTE_LIST_REFRESH_INTERVAL_MINUTES,
// 			revalidateIfStale: false,
// 		},
// 	);

// 	return { data, isLoading, error, mutate };
// }
