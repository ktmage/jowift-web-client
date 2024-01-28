import { Box, Divider, Tab, Tabs } from '@mui/material';
import { useResponsive, useSetting } from '@/hooks';
import { Link } from 'react-router-dom';
import { panelItems } from './config';
import usePanelRouteMatcher from './usePanelRouteMatcher';
import { LogoSvg } from '@/components/UI';
import { useEffect, useRef, useState } from 'react';

export default function NavigationPanel() {
	const currentPanel = usePanelRouteMatcher(panelItems);
	const { isMobile, isTablet } = useResponsive();
	const { themeConfig } = useSetting();

	const tagHeight = 60;

	const ref = useRef<HTMLDivElement>(null);
	const [logoBoxHeight, setLogoBoxHeight] = useState<number>(0);

	useEffect(() => {
		if (ref.current) {
			setLogoBoxHeight(ref.current.clientHeight);
		}
	}, [ref]);

	{
		/* calc( 画面の縦幅 - ( すべてのdividerの高さ + iconを表示するBoxの高さ + Tabの高さ * Tabの数 ) ) */
	}
	const CalcTabSpacerHeight = () => {
		const calc = `calc(100vh - ( 1px + ${logoBoxHeight}px +  ${tagHeight}px * ${
			panelItems.main.length + panelItems.sub.length
		} ))`;
		return calc;
	};

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: isMobile ? 'row' : isTablet ? 'row' : 'column',
				height: '100%',
				width: '100%',
				bgcolor: 'background.paper',
			}}
		>
			{/* ロゴ */}
			<Box
				ref={ref}
				sx={{
					display: isMobile ? 'none' : isTablet ? 'none' : 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					paddingY: 3,
				}}
			>
				<LogoSvg
					style={{ width: 45, height: 45 }}
					color={
						themeConfig.value === 'light' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.6)'
					}
				/>
			</Box>

			<Divider
				sx={{
					display: isMobile ? 'none' : isTablet ? 'none' : 'block',
					marginX: 2,
				}}
			/>

			<Tabs
				orientation={isMobile ? 'horizontal' : isTablet ? 'horizontal' : 'vertical'}
				value={currentPanel}
				sx={{
					width: isMobile ? '100vw' : isTablet ? '100vw' : '100%',
				}}
				centered={isMobile ? true : isTablet ? true : false}
			>
				{panelItems.main.map((item, i) => (
					<Tab
						key={i}
						value={item.to}
						to={item.to}
						component={Link}
						icon={<>{item.icon}</>}
						sx={{ minWidth: 0, height: tagHeight }}
					/>
				))}
				{/* Tabsの仕様上これが最適？ */}
				<Tab
					disabled
					sx={{ height: CalcTabSpacerHeight() }}
				/>
				{panelItems.sub.map((item, i) => (
					<Tab
						key={i}
						value={item.to}
						to={item.to}
						component={Link}
						icon={<>{item.icon}</>}
						sx={{ minWidth: 0, height: 60 }}
					/>
				))}
			</Tabs>
		</Box>
	);
}
