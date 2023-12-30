import { API_URL, SWR_TAG_DEDUPING_INTERVAL_MINUTES } from '@/config';
import useSWR from 'swr';

type Tag = {
	id: string;
	name: string;
	createdAt: string;
	updatedAt: string;
};

export default function useTag(tagId: string) {
	const fetcher = (url: string) =>
		fetch(url, {
			method: 'GET',
			mode: 'cors',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
		}).then((res) => res.json());

	const { data, error } = useSWR<{ tag: Tag }>(API_URL + '/tag/' + tagId, fetcher, {
		// 指定した間隔内では同じURLに対してリクエストを行わない
		dedupingInterval: 1000 * 60 * SWR_TAG_DEDUPING_INTERVAL_MINUTES,
	});

	return { data, error };
}
