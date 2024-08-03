/** @type {import('tailwindcss').Config} */

const baseTheme = {
	fontFamily: 'Poetsen One, Potta One, sans-serif',
	'--rounded-box': '0rem',
	'--rounded-btn': '0.4rem',
	'--rounded-badge': '1.9rem',
	'--tab-radius': '0rem',
};

export default {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {},
	},
	plugins: [require('daisyui')],
	daisyui: {
		themes: [
			{
				light: {
					...baseTheme,
					'color-scheme': 'light',
					'base-100': '#FFFFFF',
					'base-200': '#F8F8F8',
					'base-300': '#C7C7C7',
					primary: '#1DF06A',
					info: '#00aeff',
					success: '#9af69a',
					warning: '#ff9600',
					error: '#f02654',
				},
				dark: {
					...baseTheme,
					'color-scheme': 'dark',
					'base-100': '#2B2B2B',
					'base-200': '#242424',
					'base-300': '#212121',
					primary: '#1DF06A',
					info: '#00aeff',
					success: '#00f937',
					warning: '#ff9600',
					error: '#f02654',
				},
			},
		],
	},
};
