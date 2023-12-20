import { ThemeProvider } from '@emotion/react';
import { lightTheme } from '@/theme';

interface AppProviderProps {
	children: React.ReactNode;
}

export default function AppProvider(props: AppProviderProps) {
	return <ThemeProvider theme={lightTheme}>{props.children}</ThemeProvider>;
}
