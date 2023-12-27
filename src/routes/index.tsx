import { useRoutes } from 'react-router-dom';
import protectedRoutes from './protected';
import publicRoutes from './public';
import { useAuth } from '@/hooks';

export default function AppRoutes() {
	// 認証機能の呼び出し
	const { isAuth } = useAuth();

	// 認証されていたらprotectedRoutesを、されていなかったらpublicRoutesを表示する。
	const routes = useRoutes(isAuth ? protectedRoutes : publicRoutes);
	return <>{routes}</>;
}
