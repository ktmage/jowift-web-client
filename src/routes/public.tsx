import { Navigate, RouteObject } from 'react-router-dom';
import { AuthenticationPage } from '@/components/pages';
const publicRoutes: RouteObject[] = [
	{
		path: '/',
		element: <AuthenticationPage />,
	},
	{
		path: '*',
		element: <Navigate to='/' />,
	},
];

export default publicRoutes;
