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
}
