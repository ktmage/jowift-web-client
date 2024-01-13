import { ThemeProvider } from '@emotion/react';
import { lightTheme } from '@/theme';
import { AuthProvider } from './AuthProvider';
import { NotificationProvider } from './NotificationProvider';
import { SettingProvider } from './SettingProvider';

interface AppProviderProps {
	children: React.ReactNode;
}

export default function AppProvider(props: AppProviderProps) {
	return (
		<SettingProvider>
			<ThemeProvider theme={lightTheme}>
				<AuthProvider>
					<NotificationProvider>{props.children}</NotificationProvider>
				</AuthProvider>
			</ThemeProvider>
		</SettingProvider>
	);
}
