import ListView from '@/components/pages/MainPage/ListView/ListView';
import { SplitViewLayout } from '@/components/layouts';
import { Outlet } from 'react-router-dom';

export default function MainPage() {
	return (
		<SplitViewLayout
			contents={{
				primary: <ListView />,
				secondary: <Outlet />,
			}}
			direction='horizontal'
		/>
	);
}
