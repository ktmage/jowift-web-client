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
		splitter: {
			idol: '#cccccc',
			hover: '#dddddd',
		},
		text: {
			primary: '#333333',
		},
		action: {
			active: '#333333',
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
					width: '10px',
				},
				// スクロールバーの掴むやつ
				'::-webkit-scrollbar-thumb': {
					backgroundColor: '#cccccc',
				},
				'::-webkit-scrollbar-thumb:hover': {
					backgroundColor: '#dddddd',
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
		MuiButtonBase: {
			defaultProps: {
				disableRipple: true,
			},
		},
	},
});

export default lightTheme;
