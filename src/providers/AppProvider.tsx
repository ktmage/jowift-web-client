import { AuthProvider } from './AuthProvider';
import { NotificationProvider } from './NotificationProvider';
import { SettingProvider } from './LocalStorageProvider';
import ThemeProvider from './ThemeProvider';
import { NoteFilterProvider } from './NoteFilterProvider';

interface AppProviderProps {
	children: React.ReactNode;
}

export default function AppProvider(props: AppProviderProps) {
	return (
		<SettingProvider>
			<ThemeProvider>
				<NotificationProvider>
					<AuthProvider>
						<NoteFilterProvider>{props.children}</NoteFilterProvider>
					</AuthProvider>
				</NotificationProvider>
			</ThemeProvider>
		</SettingProvider>
	);
}
