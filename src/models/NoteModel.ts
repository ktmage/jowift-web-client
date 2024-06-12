import { TagModel } from '@/models';

export default class NoteModel {
	private _id: string;
	get id(): string {
		return this._id;
	}

	private _title: string;
	get title(): string {
		return this._title;
	}

	private _content: string;
	get content(): string {
		return this._content;
	}

	private _tags: TagModel[];
	get tags(): TagModel[] {
		return this._tags;
	}

	private _createdAt: string;
	get createdAt(): string {
		return this._createdAt;
	}

	private _updatedAt: string;
	get updatedAt(): string {
		return this._updatedAt;
	}

	constructor({
		id,
		title,
		content,
		tags,
		createdAt,
		updatedAt,
	}: {
		id: string;
		title: string;
		content: string;
		tags: TagModel[];
		createdAt: string;
		updatedAt: string;
	}) {
		this._id = id;
		this._title = title;
		this._content = content;
		this._tags = tags;
		this._createdAt = createdAt;
		this._updatedAt = updatedAt;
	}
}
