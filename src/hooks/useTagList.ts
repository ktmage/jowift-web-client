import { API_URL, SWR_TAG_LIST_REFRESH_INTERVAL_MINUTES } from '@/config';
import useSWR from 'swr';
import { TagListItem } from '@/types';

export default function useTagList() {
	const fetcher = (url: string) =>
		fetch(url, {
			method: 'GET',
			mode: 'cors',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
		}).then((res) => res.json());

	const { data, error } = useSWR<{ tags: TagListItem[] }>(API_URL + '/tag', fetcher, {
		// 一定間隔でデータを同期
		refreshInterval: 1000 * 60 * SWR_TAG_LIST_REFRESH_INTERVAL_MINUTES,
	});

	return { data, error };
}
