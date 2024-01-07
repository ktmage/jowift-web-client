import { API_URL } from '@/config';
import { Note, Tag } from '@/models';

export default class NoteRepository {
	async get(id: string): Promise<Note> {
		const response = await fetch(API_URL + '/note/' + id, {
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
		return new Note(
			json.note.id,
			json.note.title,
			json.note.content,
			json.note.tags.map((tag: { tag: Tag }) => new Tag(tag.tag.id, tag.tag.name)),
		);
	}

	async getAll(): Promise<Note[]> {
		const response = await fetch(API_URL + '/note', {
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
		return json.notes.map(
			(note: Note) =>
				new Note(
					note.id,
					note.title,
					note.content,
					note.tags.map((tag: Tag) => new Tag(tag.id, tag.name)),
				),
		);
	}

	async post(title: string, content: string, tagIds: string[]): Promise<Note> {
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
		if (!response.ok) {
			throw new Error('Failed to fetch');
		}
		const json = await response.json();
		return json;
	}

	async put(id: string, title: string, content: string, tagIds: string[]): Promise<void> {
		const response = await fetch(API_URL + '/note/' + id, {
			method: 'PUT',
			mode: 'cors',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ title, content, tagId: tagIds }),
		});
		if (!response.ok) {
			throw new Error('Failed to fetch');
		}
	}

	async delete(id: string): Promise<void> {
		const response = await fetch(API_URL + '/note/' + id, {
			method: 'DELETE',
			mode: 'cors',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		if (!response.ok) {
			throw new Error('Failed to fetch');
		}
	}
}
