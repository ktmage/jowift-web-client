// import { AuthProvider } from './AuthProvider';
import { NotificationProvider } from './NotificationProvider';
import { LocalStorageProvider } from './LocalStorageProvider';

interface AppProviderProps {
	children: React.ReactNode;
}

export default function AppProvider(props: AppProviderProps) {
	return (
		<LocalStorageProvider>
			<NotificationProvider>{props.children}</NotificationProvider>
		</LocalStorageProvider>
	);
}
