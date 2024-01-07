import { Tag } from '.';

export default class Note {
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

	private _tags: Tag[];
	get tags(): Tag[] {
		return this._tags;
	}

	constructor(id: string, title: string, content: string, tags: Tag[]) {
		this._id = id;
		this._title = title;
		this._content = content;
		this._tags = tags;
	}
}
