import { createTheme } from '@mui/material';

const lightTheme = createTheme({
	palette: {
		mode: 'light',
		primary: {
			main: '#57b957',
			contrastText: '#ffffff',
		},
		background: {
			default: '#f6f6f1',
			paper: '#fafaf5',
		},
		divider: '#b5b5b0',
		scrollbar: {
			idol: '#dddddd',
			hover: '#cccccc',
			active: '#e6e6e6',
		},
	},
	breakpoints: {
		values: {
			xs: 0,
			sm: 640,
			md: 768,
			lg: 1024,
			xl: 1280,
		},
	},
	components: {
		MuiCssBaseline: {
			styleOverrides: {
				body: {
					// 基本的にはスクロール禁止で。
					overflow: 'hidden',
				},
				// スクロールバーを描画する範囲
				'::-webkit-scrollbar': {
					width: '20px',
				},
				// スクロールバーの掴むやつ
				'::-webkit-scrollbar-thumb': {
					backgroundColor: '#dddddd',
					borderRight: '5px solid transparent',
					borderLeft: '5px solid transparent',
					borderTop: '5px solid transparent',
					borderBottom: '5px solid transparent',
					borderRadius: '10px',
					backgroundClip: 'padding-box',
				},
				'::-webkit-scrollbar-thumb:hover': {
					backgroundColor: '#cccccc',
				},
				'::-webkit-scrollbar-thumb:active': {
					backgroundColor: '#e6e6e6',
				},
			},
		},
		MuiTextField: {
			styleOverrides: {
				root: {
					'& .MuiOutlinedInput-root': {
						'& fieldset': {
							border: 'none',
						},
					},
					'& .MuiStandardInput-root': {
						'& fieldset': {
							border: 'none',
						},
					},
				},
			},
		},
	},
});

export default lightTheme;
