import { AuthProvider } from './AuthProvider';
import { NotificationProvider } from './NotificationProvider';
import { SettingProvider } from './LocalStorageProvider';
import ThemeProvider from './ThemeProvider';

interface AppProviderProps {
	children: React.ReactNode;
}

export default function AppProvider(props: AppProviderProps) {
	return (
		<SettingProvider>
			<ThemeProvider>
				<AuthProvider>
					<NotificationProvider>{props.children}</NotificationProvider>
				</AuthProvider>
			</ThemeProvider>
		</SettingProvider>
	);
}
