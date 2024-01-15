import { Box, Divider, Tab, Tabs } from '@mui/material';
import { useResponsive } from '@/hooks';
import { Link } from 'react-router-dom';
import { panelItems } from './config';
import usePanelRouteMatcher from './usePanelRouteMatcher';

export default function NavigationPanel() {
	const currentPanel = usePanelRouteMatcher(panelItems);
	const { isMobile, isTablet } = useResponsive();

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
				sx={{
					display: isMobile ? 'none' : isTablet ? 'none' : 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					paddingY: 4,
				}}
			>
				<img
					src='/vite.svg'
					alt='logo'
					width={60}
					height={30}
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
				{panelItems.main.map(
					(
						item,
						i, // Fix the type of item
					) => (
						<Tab
							key={i}
							value={item.to}
							to={item.to}
							component={Link}
							icon={<>{item.icon}</>}
							sx={{ minWidth: 0, height: 60 }}
						/>
					),
				)}

				{/* TODO: ハードコーディングすな。 */}
				{/* calc( 画面の縦幅 - ( すべてのdividerの高さ + iconを表示するBoxの高さ + Tabの高さ * Tabの数 ) ) */}
				<Tab
					disabled
					sx={{ height: 'calc(100vh - ( 1px + 94px +  60px * 4 ))' }}
				/>
				{panelItems.sub.map(
					(
						item,
						i, // Fix the type of item
					) => (
						<Tab
							key={i}
							value={item.to}
							to={item.to}
							component={Link}
							icon={<>{item.icon}</>}
							sx={{ minWidth: 0, height: 60 }}
						/>
					),
				)}
			</Tabs>
		</Box>
	);
}
