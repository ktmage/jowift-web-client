import AppProvider from '@/providers/AppProvider';
import AppRoutes from '@/routes';
import { CssBaseline } from '@mui/material';

export default function App() {
	return (
		<AppProvider>
			<CssBaseline />
			<AppRoutes />
		</AppProvider>
	);
}
