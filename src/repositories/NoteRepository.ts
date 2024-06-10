import { API_URL } from '@/config';
import { NoteModel, TagModel } from '@/models';

export default class NoteRepository {
	async get(id: string): Promise<NoteModel> {
		const response = await fetch(API_URL + '/note/' + id, {
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
		return new NoteModel({
			id: json.id,
			title: json.title,
			content: json.content,
			tags: json.tags.map(
				(tag: TagModel) =>
					new TagModel({
						id: tag.id,
						name: tag.name,
						createdAt: tag.createdAt,
						updatedAt: tag.updatedAt,
					}),
			),
			createdAt: json.createdAt,
			updatedAt: json.updatedAt,
		});
	}

	async getAll(): Promise<NoteModel[]> {
		const response = await fetch(API_URL + '/note', {
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
			(note: NoteModel) =>
				new NoteModel({
					id: note.id,
					title: note.title,
					content: note.content,
					tags: note.tags.map(
						(tag: TagModel) =>
							new TagModel({
								id: tag.id,
								name: tag.name,
								createdAt: tag.createdAt,
								updatedAt: tag.updatedAt,
							}),
					),
					createdAt: note.createdAt,
					updatedAt: note.updatedAt,
				}),
		);
	}

	async post(title: string, content: string, tagIds: string[]): Promise<NoteModel> {
		const response = await fetch(API_URL + '/note', {
			method: 'POST',
			mode: 'cors',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				title,
				content,
				tagId: tagIds,
			}),
		});
		const json = await response.json();
		if (!response.ok) {
			throw new Error(json.message);
		}
		return new NoteModel({
			id: json.id,
			title: json.title,
			content: json.content,
			tags: json.tags.map(
				(tag: TagModel) =>
					new TagModel({
						id: tag.id,
						name: tag.name,
						createdAt: tag.createdAt,
						updatedAt: tag.updatedAt,
					}),
			),
			createdAt: json.createdAt,
			updatedAt: json.updatedAt,
		});
	}

	async put(id: string, title: string, content: string, tagIds: string[]): Promise<NoteModel> {
		const response = await fetch(API_URL + '/note/' + id, {
			method: 'PUT',
			mode: 'cors',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ title, content, tagId: tagIds }),
		});
		const json = await response.json();
		if (!response.ok) {
			throw new Error('Failed to fetch');
		}
		return new NoteModel({
			id: json.id,
			title: json.title,
			content: json.content,
			tags: json.tags.map(
				(tag: TagModel) =>
					new TagModel({
						id: tag.id,
						name: tag.name,
						createdAt: tag.createdAt,
						updatedAt: tag.updatedAt,
					}),
			),
			createdAt: json.createdAt,
			updatedAt: json.updatedAt,
		});
	}

	async delete(id: string): Promise<string> {
		const response = await fetch(API_URL + '/note/' + id, {
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
