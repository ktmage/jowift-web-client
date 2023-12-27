import { RouteObject } from 'react-router-dom';

const publicRoutes: RouteObject[] = [
	{
		path: '/',
		element: <div>home</div>,
	},
	{
		path: '/login',
		element: <div>login</div>,
	},
	{
		path: '/signup',
		element: <div>register</div>,
	},
	{
		path: '*',
		element: <div>404</div>,
	},
];

export default publicRoutes;
