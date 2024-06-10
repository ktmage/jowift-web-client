import { API_URL } from '@/config';
import { TagModel } from '@/models';

export default class TagRepository {
	async get(id: string): Promise<TagModel> {
		const response = await fetch(API_URL + '/tag/' + id, {
			method: 'GET',
			mode: 'cors',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const json = await response.json();
		if (!response.ok) {
			throw new Error(json.message);
		}
		return new TagModel({
			id: json.id,
			name: json.name,
			createdAt: json.createdAt,
			updatedAt: json.updatedAt,
		});
	}

	async getAll(): Promise<TagModel[]> {
		const response = await fetch(API_URL + '/tag', {
			method: 'GET',
			mode: 'cors',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const json = await response.json();
		if (!response.ok) {
			throw new Error(json.message);
		}
		return json.map(
			(tag: TagModel) =>
				new TagModel({
					id: tag.id,
					name: tag.name,
					createdAt: tag.createdAt,
					updatedAt: tag.updatedAt,
				}),
		);
	}

	async post(name: string): Promise<TagModel> {
		const response = await fetch(API_URL + '/tag', {
			method: 'POST',
			mode: 'cors',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ name }),
		});
		const json = await response.json();
		if (!response.ok) {
			throw new Error(json.message);
		}
		return new TagModel({
			id: json.id,
			name: json.name,
			createdAt: json.createdAt,
			updatedAt: json.updatedAt,
		});
	}

	async put(id: string, name: string): Promise<TagModel> {
		const response = await fetch(API_URL + '/tag/' + id, {
			method: 'PUT',
			mode: 'cors',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ name }),
		});
		const json = await response.json();
		if (!response.ok) {
			throw new Error(json.message);
		}
		return new TagModel({
			id: json.id,
			name: json.name,
			createdAt: json.createdAt,
			updatedAt: json.updatedAt,
		});
	}

	async delete(id: string): Promise<string> {
		const response = await fetch(API_URL + '/tag/' + id, {
			method: 'DELETE',
			mode: 'cors',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const json = await response.json();
		if (!response.ok) {
			throw new Error(json.message);
		}
		return json.id;
	}
}
