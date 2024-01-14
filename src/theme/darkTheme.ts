import { createTheme } from '@mui/material';

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			main: '#83de68',
			contrastText: '#ffffff',
		},
		background: {
			paper: '#2a2929',
		},
		divider: '#191919',
		scrollbar: {
			idol: '#dddddd',
			hover: '#cccccc',
			active: '#e6e6e6',
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
					width: '20px',
				},
				// スクロールバーの掴むやつ
				'::-webkit-scrollbar-thumb': {
					backgroundColor: '#191919',
					borderRight: '5px solid transparent',
					borderLeft: '5px solid transparent',
					borderTop: '5px solid transparent',
					borderBottom: '5px solid transparent',
					borderRadius: '10px',
					backgroundClip: 'padding-box',
				},
				'::-webkit-scrollbar-thumb:hover': {
					backgroundColor: '#1b1b1b',
				},
				'::-webkit-scrollbar-thumb:active': {
					backgroundColor: '#1b1b1b',
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

export default darkTheme;
