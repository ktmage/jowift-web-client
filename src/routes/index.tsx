import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import { MainLayout, SidebarDetailLayout } from '@/components/Layouts';

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
					element: <SidebarDetailLayout>note</SidebarDetailLayout>,
				},
				{
					path: '/app/tag',
					element: <SidebarDetailLayout>tag</SidebarDetailLayout>,
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
