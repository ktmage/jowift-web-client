import { Navigate, RouteObject } from 'react-router-dom';
import {
	Account,
	Information,
	Main,
	NoteCreate,
	NoteDetail,
	Setting,
	TagCreate,
	TagDetail,
} from './elements';

const protectedRoutes: RouteObject[] = [
	{
		path: '/app',
		element: <Main />,
		children: [
			{
				path: '/app/note',
				element: <NoteCreate />,
			},
			{
				path: '/app/note/:id',
				element: <NoteDetail />,
			},
			{
				path: '/app/tag',
				element: <TagCreate />,
			},
			{
				path: '/app/tag/:id',
				element: <TagDetail />,
			},
			{
				path: '/app/account',
				element: <Account />,
			},
			{
				path: '/app/setting',
				element: <Setting />,
			},
			{
				path: '/app/info',
				element: <Information />,
			},
		],
	},
	{
		path: '*',
		element: <Navigate to='/app/note' />,
	},
];

export default protectedRoutes;
