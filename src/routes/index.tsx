import { Outlet, useRoutes } from 'react-router-dom';
import MainLayout from '../components/Layouts/MainLayout';

export default function AppRoutes() {
	const routes = useRoutes([
		{
			path: '/',
			element: (
				<MainLayout>
					<Outlet />
				</MainLayout>
			),
			children: [
				{
					path: '/',
					element: <div>Home</div>,
				},
				{
					path: '/about',
					element: <div>About</div>,
				},
				{
					path: '/contact',
					element: <div>Contact</div>,
				},
			],
		},
	]);

	return <>{routes}</>;
}
