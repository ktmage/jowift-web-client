import { Note } from '.';

interface NoteListItem extends Omit<Note, 'content'> {}

export default NoteListItem;
