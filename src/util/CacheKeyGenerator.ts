export default class CacheKeyGenerator {
	static generateTagKey(id: string): string {
		return 'tag-' + id;
	}

	static generateTagListKey(): string {
		return 'tags';
	}

	static generateNoteKey(id: string): string {
		return 'note-' + id;
	}

	static generateNoteListKey(): string {
		return 'notes';
	}
}
