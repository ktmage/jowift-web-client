import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import { MainLayout, NoteLayout, TagLayout } from '@/components/Layouts';
import { NoteCreateForm, NoteDetailForm, TagCreateForm } from '@/components/Forms';

export default function AppRoutes() {
	const routes = useRoutes([
		{
			path: '/app',
			element: (
				<MainLayout>
					<Outlet />
				</MainLayout>
			),
			children: [
				{
					index: true,
					element: <Navigate to='/app/note' />,
				},
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
	]);

	return <>{routes}</>;
}
