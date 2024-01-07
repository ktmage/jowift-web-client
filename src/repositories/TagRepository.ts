import { API_URL } from '@/config';
import Tag from '@/models/Tag';

export default class TagRepository {
	async get(id: string): Promise<Tag> {
		const response = await fetch(API_URL + '/tag/' + id, {
			method: 'GET',
			mode: 'cors',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		if (!response.ok) {
			throw new Error('Failed to fetch');
		}
		const json = await response.json();
		return new Tag(json.tag.id, json.tag.name);
	}

	async getAll(): Promise<Tag[]> {
		const response = await fetch(API_URL + '/tag', {
			method: 'GET',
			mode: 'cors',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		if (!response.ok) {
			throw new Error('Failed to fetch');
		}
		const json = await response.json();
		return json.tags.map((tag: Tag) => new Tag(tag.id, tag.name));
	}

	async post(name: string): Promise<Tag> {
		const response = await fetch(API_URL + '/tag', {
			method: 'POST',
			mode: 'cors',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ name }),
		});
		if (!response.ok) {
			throw new Error('Failed to fetch');
		}
		const json = await response.json();
		return new Tag(json.tag.id, json.tag.name);
	}

	async put(id: string, name: string): Promise<Tag> {
		const response = await fetch(API_URL + '/tag/' + id, {
			method: 'PUT',
			mode: 'cors',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ name }),
		});
		if (!response.ok) {
			throw new Error('Failed to fetch');
		}
		const json = await response.json();
		return new Tag(json.id, json.name);
	}
}
