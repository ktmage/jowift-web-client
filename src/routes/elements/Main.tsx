import { MainLayout } from '@/components/Layouts';
import { Outlet } from 'react-router-dom';

export default function Main() {
	return (
		<MainLayout>
			<Outlet />
		</MainLayout>
	);
}
