import { matchPath, useLocation } from 'react-router-dom';
import { Config } from '@/components/layouts/MainLayout/NavigationPanel/config';

export default function usePanelRouteMatcher(config: Config) {
	const routes: string[] = [...config.main, ...config.sub].reduce(
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

	return currentPanel;
}
