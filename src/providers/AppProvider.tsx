import { ThemeProvider } from '@emotion/react';
import { lightTheme } from '@/theme';
import { AuthProvider } from './AuthProvider';

interface AppProviderProps {
	children: React.ReactNode;
}

export default function AppProvider(props: AppProviderProps) {
	return (
		<ThemeProvider theme={lightTheme}>
			<AuthProvider>{props.children}</AuthProvider>
		</ThemeProvider>
	);
}
