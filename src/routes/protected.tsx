import { Navigate, Outlet, RouteObject } from 'react-router-dom';
import { MainLayout } from '@/components/layouts';
import { NoteCreateForm, NoteDetailForm, AccountForm, SettingForm } from '@/components/forms';

const protectedRoutes: RouteObject[] = [
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
				element: <NoteCreateForm />,
			},
			{
				path: '/:id',
				element: <NoteDetailForm />,
			},
			{
				path: '/account',
				element: <AccountForm />,
			},
			{
				path: '/setting',
				element: <SettingForm />,
			},
		],
	},
	{
		path: '*',
		element: <Navigate to='/' />,
	},
];

export default protectedRoutes;
