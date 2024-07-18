import Sidebar from '@/components/pages/MainPage/Sidebar/Sidebar';
import { SplitViewLayout } from '@/components/layouts';
import { Outlet } from 'react-router-dom';

export default function MainPage() {
	return (
		<SplitViewLayout
			contents={{
				primary: <Sidebar />,
				secondary: <Outlet />,
			}}
			direction='horizontal'
		/>
	);
}
