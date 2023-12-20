import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import { MainLayout } from '@/components/Layouts';

export default function AppRoutes() {
	const routes = useRoutes([
		{
			path: '/app',
			element: (
				<MainLayout>
					<Outlet />
				</MainLayout>
			),
			children: [
				{
					index: true,
					element: <Navigate to='/app/note' />,
				},
				{
					path: '/app/note',
					element: <div>note</div>,
				},
				{
					path: '/app/tag',
					element: <div>tag</div>,
				},
				{
					path: '/app/account',
					element: <div>account</div>,
				},
				{
					path: '/app/setting',
					element: <div>setting</div>,
				},
				{
					path: '/app/info',
					element: <div>info</div>,
				},
			],
		},
	]);

	return <>{routes}</>;
}
