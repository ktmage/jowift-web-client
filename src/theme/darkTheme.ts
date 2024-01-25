import { createTheme } from '@mui/material';

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			main: '#83de68',
			contrastText: '#ffffff',
		},
		background: {
			paper: '#33333a',
		},
		divider: '#202023',
		splitter: {
			idol: '#242426',
			hover: '#272729',
		},
		text: {
			primary: '#d5d6d6',
		},
		action: {
			active: '#d5d6d6',
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
					backgroundColor: '#242426',
				},
				'::-webkit-scrollbar-thumb:hover': {
					backgroundColor: '#272729',
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

export default darkTheme;
