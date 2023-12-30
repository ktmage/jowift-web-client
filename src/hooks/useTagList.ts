import { API_URL } from '@/config';
import useSWR from 'swr';

type TagListItem = {
	id: string;
	name: string;
	createdAt: string;
	updatedAt: string;
};

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

	const { data, error } = useSWR<{ tags: TagListItem[] }>(API_URL + '/tag', fetcher);

	return { data, error };
}
