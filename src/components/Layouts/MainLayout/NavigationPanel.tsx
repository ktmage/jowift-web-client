import { Box, Divider, Tab, Tabs } from '@mui/material';
import { useResponsive } from '../../../hooks';
import { Link, matchPath, useLocation } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';

interface PanelItem {
	to: string;
	routes: string[];
	icon?: React.ReactNode;
}

export default function NavigationPanel() {
	// TODO: 見た目以外のロジック書きすぎ。
	const panelItems: { main: PanelItem[]; sub: PanelItem[] } = {
		main: [
			{
				to: '/app/note',
				routes: ['/app/note', '/app/note/:id'],
				icon: <TextSnippetIcon />,
			},
			{
				to: '/app/tag',
				routes: ['/app/tag', '/app/tag/:id'],
				icon: <LocalOfferIcon />,
			},
		],
		sub: [
			{
				to: '/app/account',
				routes: ['/app/account'],
				icon: <AccountCircleIcon />,
			},
			{
				to: '/app/setting',
				routes: ['/app/setting'],
				icon: <SettingsIcon />,
			},
			{
				to: '/app/info',
				routes: ['/app/info'],
				icon: <InfoIcon />,
			},
		],
	};

	const routes: string[] = [...panelItems.main, ...panelItems.sub].reduce(
		(acc, item) => [...acc, ...item.routes],
		[] as string[],
	);

	const RouteMatch = (routes: readonly string[]) => {
		// 現在のURLを取得 これはURLが変更されるたびに更新される
		const { pathname } = useLocation();

		// パターンにマッチするかどうかを確認する
		for (let i = 0; i < routes.length; i += 1) {
			const pattern = routes[i];

			// パターンにマッチした場合はそのマッチした情報を返す
			const possibleMatch = matchPath(pattern, pathname);

			if (possibleMatch !== null) {
				return possibleMatch;
			}
		}

		return null;
	};

	const routeMatch = RouteMatch(routes);

	let currentPanel;
	// 例外を処理する。
	if (routeMatch?.pattern?.path === '/app/note/:id') {
		currentPanel = '/app/note';
	} else if (routeMatch?.pattern?.path === '/app/tag/:id') {
		currentPanel = '/app/tag';
	} else {
		currentPanel = routeMatch?.pattern?.path;
	}

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
				{/* BEGIN: be15d9bcejpp */}
				{panelItems.main.map(
					(
						item: PanelItem,
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
				{/* END: be15d9bcejpp */}

				{/* TODO: ハードコーディングすな。 */}
				{/* calc( 画面の縦幅 - ( すべてのdividerの高さ + iconを表示するBoxの高さ + Tabの高さ * Tabの数 ) ) */}
				<Box height={'calc(100vh - ( 2px + 94px +  60px * 5 ))'} />
				<Divider
					sx={{
						display: 'block',
						marginX: 2,
					}}
				/>
				{panelItems.sub.map(
					(
						item: PanelItem,
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
