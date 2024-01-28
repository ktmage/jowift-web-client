import { createContext, ReactNode, useEffect, useState } from 'react';
import { API_URL } from '@/config';
import { useNotification } from '@/hooks';

type AuthContextProps = {
	isAuth: boolean;
	isLoading: boolean;
	signUp: (name: string, email: string, password: string) => void;
	login: (email: string, password: string) => void;
	logout: () => void;
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const { dispatchNotification } = useNotification();
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [isAuth, setIsAuth] = useState<boolean>(false);

	// Sessionの確認
	useEffect(() => {
		fetch(`${API_URL}/auth`, {
			method: 'GET',
			mode: 'cors',
			credentials: 'include',
		}).then((res) => {
			if (res.ok) {
				setIsAuth(true);
			}
			setIsLoading(false);
			return res.json();
		});
	}, []);

	// ユーザー登録
	const signUp = (name: string, email: string, password: string) => {
		fetch(`${API_URL}/auth/signup`, {
			method: 'POST',
			mode: 'cors',
			credentials: 'include',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ name, email, password }),
		}).then((res) => {
			if (res.ok) {
				dispatchNotification({
					severity: 'success',
					message: 'ユーザー登録が完了しました。',
				});
			} else {
				dispatchNotification({
					severity: 'error',
					message: 'ユーザー登録に失敗しました。',
				});
			}
			return res.json();
		});
	};

	// ログイン
	const login = (email: string, password: string) => {
		fetch(`${API_URL}/auth/login`, {
			method: 'POST',
			mode: 'cors',
			credentials: 'include',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password }),
		}).then((res) => {
			if (res.ok) {
				setIsAuth(true);
				dispatchNotification({ severity: 'success', message: 'ログインしました。' });
			} else {
				dispatchNotification({ severity: 'error', message: 'ログインに失敗しました。' });
			}

			return res.json();
		});
	};

	const logout = () => {
		fetch(`${API_URL}/auth/logout`, {
			method: 'GET',
			mode: 'cors',
			credentials: 'include',
		}).then((res) => {
			if (res.ok) {
				setIsAuth(false);
				dispatchNotification({ severity: 'success', message: 'ログアウトしました。' });
			} else {
				dispatchNotification({ severity: 'error', message: 'ログアウトに失敗しました。' });
			}
			return res.json();
		});
	};

	return (
		<AuthContext.Provider
			value={{
				isAuth,
				isLoading,
				signUp,
				login,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
