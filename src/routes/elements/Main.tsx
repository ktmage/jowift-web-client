import { MainLayout } from '@/components/layouts';
import { Outlet } from 'react-router-dom';

export default function Main() {
	return (
		<MainLayout>
			<Outlet />
		</MainLayout>
	);
}
