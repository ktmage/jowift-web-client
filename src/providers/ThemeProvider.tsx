import { useSetting } from '@/hooks';
import { darkTheme, lightTheme } from '@/themes';
import { ThemeProvider as _ThemeProvider } from '@emotion/react';
import { Theme } from '@mui/material';
import { useEffect, useState } from 'react';

interface ThemeProviderProps {
	children: React.ReactNode;
}

export default function ThemeProvider(props: ThemeProviderProps) {
	const { themeConfig } = useSetting();
	const [theme, setTheme] = useState<Theme>(lightTheme);

	useEffect(() => {
		if (themeConfig.value === 'light') {
			setTheme(lightTheme);
		} else {
			setTheme(darkTheme);
		}
	}, [themeConfig.value]);

	return <_ThemeProvider theme={theme}>{props.children}</_ThemeProvider>;
}
