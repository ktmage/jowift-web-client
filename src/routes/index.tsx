import { Link, useRoutes } from 'react-router-dom';

export default function AppRoutes() {
	const routes = useRoutes([
		{
			path: '/',
			element: (
				<>
					<Link to={'hoge'}>hoge</Link>
					<Link to={'fuga'}>fuga</Link>
				</>
			),
		},
		{
			path: '/hoge',
			element: <>hoge page.</>,
		},
		{
			path: '/fuga',
			element: <>fuga page.</>,
		},
	]);

	return <>{routes}</>;
}
