import ListView from '@/components/pages/MainPage/ListView/ListView';
import { SplitViewLayout } from '@/components/layouts';
import { useResponsive } from '@/hooks';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

export default function MainPage() {
	const { isMobile, isTablet, isDesktop } = useResponsive();

	const [splitRatio, setSplitRatio] = useState(
		isMobile ? 1 : isTablet ? 0.5 : isDesktop ? 0.3 : 0,
	);

	const toggleSplitRatio = () => {
		isMobile
			? setSplitRatio((prev) => (prev === 0 ? 1 : 0))
			: isTablet
				? setSplitRatio((prev) => (prev === 0 ? 0.5 : 0))
				: isDesktop
					? setSplitRatio((prev) => (prev === 0 ? 0.3 : 0))
					: null;
	};

	// 画面サイズの変更を検知して、splitRatioを変更
	window.addEventListener('resize', () => {
		setSplitRatio(isMobile ? 1 : isTablet ? 0.5 : isDesktop ? 0.3 : 0);
	});

	return (
		<SplitViewLayout
			contents={{
				primary: <ListView toggleSplitRatio={toggleSplitRatio} />,
				secondary: <Outlet context={{ toggleSplitRatio }} />,
			}}
			direction='horizontal'
			splitRatio={splitRatio}
		/>
	);
}
