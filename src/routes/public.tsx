import { Navigate, RouteObject } from 'react-router-dom';
import { Auth } from './elements';
const publicRoutes: RouteObject[] = [
	{
		path: '/',
		element: <Auth />,
	},
	{
		path: '*',
		element: <Navigate to='/' />,
	},
];

export default publicRoutes;
