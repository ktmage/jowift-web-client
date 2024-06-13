import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';

export interface PanelItem {
	to: string;
	routes: string[];
	icon?: React.ReactNode;
}

export interface Config {
	readonly main: PanelItem[];
	readonly sub: PanelItem[];
}

export const panelItems: Config = {
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
	],
};
