export default class TagModel {
	private _id: string;
	get id(): string {
		return this._id;
	}

	private _name: string;
	get name(): string {
		return this._name;
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
		name,
		createdAt,
		updatedAt,
	}: {
		id: string;
		name: string;
		createdAt: string;
		updatedAt: string;
	}) {
		this._id = id;
		this._name = name;
		this._createdAt = createdAt;
		this._updatedAt = updatedAt;
	}
}
