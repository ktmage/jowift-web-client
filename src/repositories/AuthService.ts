import { API_URL } from '@/config';
import { UserModel } from '@/models';

export default class AuthService {
	async session(): Promise<boolean> {
		const response = await fetch(API_URL + '/auth', {
			method: 'GET',
			mode: 'cors',
			credentials: 'include',
			cache: 'no-cache',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		return response.ok;
	}

	async signup(name: string, email: string, password: string): Promise<UserModel> {
		const response = await fetch(API_URL + '/auth/signup', {
			method: 'POST',
			mode: 'cors',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ name, email, password }),
		});
		const json = await response.json();
		if (!response.ok) {
			throw new Error(json.message);
		}
		return new UserModel({
			name: json.name,
			email: json.email,
			photoUrl: json.photoUrl,
			authMethod: json.authMethod,
			createdAt: json.createdAt,
			updatedAt: json.updatedAt,
		});
	}

	async login(email: string, password: string): Promise<UserModel> {
		const response = await fetch(API_URL + '/auth/login', {
			method: 'POST',
			mode: 'cors',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email, password }),
		});
		const json = await response.json();
		if (!response.ok) {
			throw new Error(json.message);
		}
		return new UserModel({
			name: json.name,
			email: json.email,
			photoUrl: json.photoUrl,
			authMethod: json.authMethod,
			createdAt: json.createdAt,
			updatedAt: json.updatedAt,
		});
	}

	async logout(): Promise<boolean> {
		const response = await fetch(API_URL + '/auth/logout', {
			method: 'GET',
			mode: 'cors',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const json = await response.json();
		if (!response.ok) {
			throw new Error(json.message);
		}
		return response.ok;
	}

	async getProfile(): Promise<UserModel> {
		const response = await fetch(API_URL + '/auth/user', {
			method: 'GET',
			mode: 'cors',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const json = await response.json();
		if (!response.ok) {
			throw new Error(json.message);
		}
		return new UserModel({
			name: json.name,
			email: json.email,
			photoUrl: json.photoUrl,
			authMethod: json.authMethod,
			createdAt: json.createdAt,
			updatedAt: json.updatedAt,
		});
	}

	async delete(): Promise<boolean> {
		const response = await fetch(API_URL + '/auth/user', {
			method: 'DELETE',
			mode: 'cors',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const json = await response.json();
		if (!response.ok) {
			throw new Error(json.message);
		}
		return json.id;
	}
}
