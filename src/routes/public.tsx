import { Navigate, Outlet, RouteObject } from 'react-router-dom';
import { WindowLayout } from '@/components/layouts';
import { AuthForm } from '@/components/forms';
const publicRoutes: RouteObject[] = [
	{
		path: '/',
		element: (
			<WindowLayout>
				<Outlet />
			</WindowLayout>
		),
		children: [
			{
				path: '/',
				element: <AuthForm />,
			},
			{
				path: '*',
				element: <Navigate to='/' />,
			},
		],
	},
];

export default publicRoutes;
