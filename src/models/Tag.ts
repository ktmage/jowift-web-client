export default class Tag {
	private _id: string;
	get id(): string {
		return this._id;
	}

	private _name: string;
	get name(): string {
		return this._name;
	}

	constructor(id: string, name: string) {
		this._id = id;
		this._name = name;
	}

	updateName(name: string) {
		this._name = name;
	}
}
