import { Navigate, Outlet, RouteObject } from 'react-router-dom';
import { MainLayout, NoteLayout, TagLayout } from '@/components/Layouts';
import { NoteCreateForm, NoteDetailForm, TagCreateForm, TagDetailForm } from '@/components/Forms';

const protectedRoutes: RouteObject[] = [
	{
		path: '/app',
		element: (
			<MainLayout>
				<Outlet />
			</MainLayout>
		),
		children: [
			{
				path: '/app/note',
				element: (
					<NoteLayout>
						<NoteCreateForm />
					</NoteLayout>
				),
			},
			{
				path: '/app/note/:id',
				element: (
					<NoteLayout>
						<NoteDetailForm />
					</NoteLayout>
				),
			},
			{
				path: '/app/tag',
				element: (
					<TagLayout>
						<TagCreateForm />
					</TagLayout>
				),
			},
			{
				path: '/app/tag/:id',
				element: (
					<TagLayout>
						<TagDetailForm />
					</TagLayout>
				),
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
