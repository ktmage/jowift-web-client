import { API_URL, SWR_TAG_DEDUPING_INTERVAL_MINUTES } from '@/config';
import useSWR from 'swr';
import { Tag } from '@/types';

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

	const { data, isLoading, error, mutate } = useSWR<{ tag: Tag }>(
		API_URL + '/tag/' + tagId,
		fetcher,
		{
			// 指定した間隔内では同じURLに対してリクエストを行わない
			dedupingInterval: 1000 * 60 * SWR_TAG_DEDUPING_INTERVAL_MINUTES,
		},
	);

	return { data, isLoading, error, mutate };
}
