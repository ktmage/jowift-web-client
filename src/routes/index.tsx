import { useRoutes } from 'react-router-dom';
import protectedRoutes from './protected';
import publicRoutes from './public';
import { useAuth } from '@/hooks';
import { Backdrop, CircularProgress } from '@mui/material';

export default function AppRoutes() {
	// 認証機能の呼び出し
	const { isAuth, isLoading } = useAuth();
	const routes = useRoutes(isAuth ? protectedRoutes : publicRoutes);

	// 認証が完了するまでローディングを表示する。
	if (isLoading) {
		return (
			<Backdrop open>
				<CircularProgress />
			</Backdrop>
		);
	}

	// 認証されていたらprotectedRoutesを、されていなかったらpublicRoutesを表示する。
	return <>{routes}</>;
}
