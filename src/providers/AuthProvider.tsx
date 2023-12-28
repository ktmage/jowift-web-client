import { createContext, ReactNode, useEffect, useState } from 'react';
import { API_URL } from '@/config';

type AuthContextProps = {
	isAuth: boolean;
	isLoading: boolean;
	signUp: (name: string, email: string, password: string) => void;
	login: (email: string, password: string) => void;
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [isAuth, setIsAuth] = useState<boolean>(false);

	// Sessionの確認
	useEffect(() => {
		fetch(`${API_URL}/auth`, {
			method: 'GET',
			mode: 'cors',
			credentials: 'include',
		})
			.then((res) => {
				if (res.ok) {
					setIsAuth(true);
				}
				setIsLoading(false);
				return res.json();
			})
			.then((data) => console.log(data))
			.catch((err) => console.log(err));
	}, []);

	// ユーザー登録
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

	// ログイン
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
				isLoading,
				signUp,
				login,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
