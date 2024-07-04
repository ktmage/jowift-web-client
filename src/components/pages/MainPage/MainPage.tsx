import { ListView } from '@/components/elements';
import { SplitViewLayout } from '@/components/layouts';
import { Outlet } from 'react-router-dom';

export default function MainPage() {
	return (
		<SplitViewLayout
			contents={{ primary: <ListView />, secondary: <Outlet /> }}
			direction='horizontal'
		/>
	);
}
