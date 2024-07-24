import React, { createContext, useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';
import { useResponsive } from '@/hooks';

type SplitViewContextProps = {
	toggleSplitRatio: () => void;
};

export const SplitViewContext = createContext({} as SplitViewContextProps);

type SplitViewContent = {
	primary: React.ReactNode;
	secondary: React.ReactNode;
};

type SplitViewDirection =
	| 'horizontal'
	| 'vertical'
	| 'horizontal-reverse'
	| 'vertical-reverse'
	| 'auto';

type SplitViewLayoutProps = {
	contents: SplitViewContent;
	direction?: SplitViewDirection;
};

export default function SplitViewLayout({ contents, direction = 'auto' }: SplitViewLayoutProps) {
	const props = { contents, direction };

	const { isMobile, isTablet, isDesktop } = useResponsive();

	// 画面サイズに応じた初期のSplitRatioを取得
	const getInitialSplitRatio = useCallback(
		() => (isMobile ? 0 : isTablet ? 0.5 : isDesktop ? 0.3 : 0),
		[isMobile, isTablet, isDesktop],
	);

	// 分割比率の状態を管理
	const [splitRatio, setSplitRatio] = useState(getInitialSplitRatio());

	// 画面リサイズ時に分割比率を再計算
	useEffect(() => {
		const handleResize = () => setSplitRatio(getInitialSplitRatio());
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, [isMobile, isTablet, isDesktop, getInitialSplitRatio]);

	const toggleSplitRatio = () => {
		if (isMobile) setSplitRatio((prev) => (prev === 0 ? 1 : 0));
		else if (isTablet) setSplitRatio((prev) => (prev === 0 ? 0.5 : 0));
		else if (isDesktop) setSplitRatio((prev) => (prev === 0 ? 0.3 : 0));
	};

	return (
		<SplitViewContext.Provider value={{ toggleSplitRatio }}>
			<div
				className={clsx('flex h-screen overflow-hidden', {
					'flex-row': props.direction === 'horizontal',
					'flex-col': props.direction === 'vertical',
					'flex-row-reverse': props.direction === 'horizontal-reverse',
					'flex-col-reverse': props.direction === 'vertical-reverse',
				})}
			>
				<div
					className='border-r border-base-300 transition-all duration-300'
					style={{ width: `${splitRatio * 100}%` }}
				>
					{props.contents.primary}
				</div>
				<div
					className='transition-all duration-300 z-10'
					style={{ width: `${(1 - splitRatio) * 100}%` }}
				>
					{props.contents.secondary}
				</div>
			</div>
		</SplitViewContext.Provider>
	);
}
