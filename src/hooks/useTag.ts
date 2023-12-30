import { API_URL } from '@/config';
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

	const { data, error } = useSWR<{ tag: Tag }>(API_URL + '/tag/' + tagId, fetcher);

	return { data, error };
}
