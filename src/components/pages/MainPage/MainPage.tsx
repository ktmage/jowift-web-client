import { ListView } from '@/components/elements';
import { SplitViewLayout } from '@/components/layouts';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

export default function MainPage() {
	const [splitRatio, setSplitRatio] = useState(0.3);

	return (
		<SplitViewLayout
			contents={{
				primary: <ListView />,
				secondary: <Outlet />,
			}}
			direction='horizontal'
			splitRatio={splitRatio}
			onSplitRatioChange={setSplitRatio}
		/>
	);
}
