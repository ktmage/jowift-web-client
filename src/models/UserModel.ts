export default class UserModel {
	private _name: string;
	get name(): string {
		return this._name;
	}

	private _email: string;
	get email(): string {
		return this._email;
	}

	private _photoUrl: string;
	get photoUrl(): string {
		return this._photoUrl;
	}

	private _authMethod: string;
	get authMethod(): string {
		return this._authMethod;
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
		name,
		email,
		photoUrl,
		authMethod,
		createdAt,
		updatedAt,
	}: {
		name: string;
		email: string;
		photoUrl: string;
		authMethod: string;
		createdAt: string;
		updatedAt: string;
	}) {
		this._name = name;
		this._email = email;
		this._photoUrl = photoUrl;
		this._authMethod = authMethod;
		this._createdAt = createdAt;
		this._updatedAt = updatedAt;
	}
}
