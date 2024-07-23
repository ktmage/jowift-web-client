import { useRoutes } from 'react-router-dom';
import protectedRoutes from './protected';
import publicRoutes from './public';
import { useSession } from '@/hooks';
import { Backdrop } from '@/components/ui';

export default function AppRoutes() {
	// 認証機能の呼び出し
	const { session, isLoading } = useSession();
	const routes = useRoutes(session ? protectedRoutes : publicRoutes);

	// 認証が完了するまでローディングを表示する。
	if (isLoading) {
		return (
			<Backdrop open={true}>
				<span className='loading loading-spinner loading-lg'></span>
			</Backdrop>
		);
	}

	// 認証されていたらprotectedRoutesを、されていなかったらpublicRoutesを表示する。
	return <>{routes}</>;
}
