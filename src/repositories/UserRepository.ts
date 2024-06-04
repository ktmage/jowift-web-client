import { API_URL } from '@/config';

interface User {
	name: string;
	email: string;
	authMethod: string;
}

interface IUserRepository {
	get: () => Promise<User>;
	delete: () => Promise<boolean>;
}

const UserRepository: IUserRepository = {
	get: async (): Promise<User> => {
		const response = await fetch(API_URL + '/auth/user', {
			method: 'GET',
			mode: 'cors',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		if (!response.ok) {
			throw new Error('Failed to fetch');
		}
		const json = await response.json();
		const user: User = {
			name: json.data.name,
			email: json.data.email,
			authMethod: json.data.authMethod,
		};
		return user;
	},
	delete: async (): Promise<boolean> => {
		const response = await fetch(API_URL + '/auth/user', {
			method: 'DELETE',
			mode: 'cors',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		if (!response.ok) {
			throw new Error('Failed to fetch');
		}

		return true;
	},
};

export default UserRepository;
