import { Navigate, RouteObject } from 'react-router-dom';
import { Main, NoteCreate, NoteDetail, TagCreate, TagDetail } from './elements';

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
	{
		path: '*',
		element: <Navigate to='/app/note' />,
	},
];

export default protectedRoutes;
