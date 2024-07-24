import { Navigate, RouteObject } from 'react-router-dom';
import { MainPage, CreatePage, DetailPage, AccountPage, SettingsPage } from '@/components/pages';

const protectedRoutes: RouteObject[] = [
	{
		path: '/',
		element: <MainPage />,
		children: [
			{
				path: '/',
				element: <CreatePage />,
			},
			{
				path: '/:id',
				element: <DetailPage />,
			},
			{
				path: '/account',
				element: <AccountPage />,
			},
			{
				path: '/settings',
				element: <SettingsPage />,
			},
		],
	},
	{
		path: '*',
		element: <Navigate to='/' />,
	},
];

export default protectedRoutes;
