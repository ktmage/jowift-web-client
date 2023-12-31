import { Tag, Author } from '.';

interface NoteTag {
	tag: Tag;
}

interface Note {
	id: string;
	title: string;
	content: string;
	createdAt: string;
	updatedAt: string;
	author: Author;
	tags: NoteTag[];
}

export default Note;
