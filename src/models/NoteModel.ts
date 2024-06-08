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

	constructor(id: string, title: string, content: string, tags: TagModel[]) {
		this._id = id;
		this._title = title;
		this._content = content;
		this._tags = tags;
	}
}
