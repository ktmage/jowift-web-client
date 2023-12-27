import { createContext, ReactNode, useState } from 'react';
import { API_URL } from '@/config';

type AuthContextProps = {
	isAuth: boolean;
	signUp: (name: string, email: string, password: string) => void;
	login: (email: string, password: string) => void;
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [isAuth, setIsAuth] = useState<boolean>(false);

	const signUp = (name: string, email: string, password: string) => {
		fetch(`${API_URL}/auth/signup`, {
			method: 'POST',
			mode: 'cors',
			credentials: 'include',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ name, email, password }),
		})
			.then((res) => res.json())
			.then((data) => console.log(data))
			.catch((err) => console.log(err));
	};

	const login = (email: string, password: string) => {
		fetch(`${API_URL}/auth/login`, {
			method: 'POST',
			mode: 'cors',
			credentials: 'include',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password }),
		})
			.then((res) => {
				if (res.ok) {
					setIsAuth(true);
				}
				return res.json();
			})
			.then((data) => console.log(data))
			.catch((err) => console.log(err));
	};

	return (
		<AuthContext.Provider
			value={{
				isAuth,
				signUp,
				login,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
