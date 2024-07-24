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
					'base-100': '#fafaf9',
					'base-200': '#f3f4f6',
					'base-300': '#e5e7eb',
					primary: '#411ab7',
					secondary: '#597353',
					info: '#00aeff',
					success: '#9af69a',
					warning: '#ff9600',
					error: '#f02654',
				},
				dark: {
					...baseTheme,
					'color-scheme': 'dark',
					'base-100': '#2b2b2b',
					'base-200': '#242424',
					'base-300': '#1c1c1c',
					primary: '#411ab7',
					secondary: '#597353',
					info: '#00aeff',
					success: '#00f937',
					warning: '#ff9600',
					error: '#f02654',
				},
			},
		],
	},
};
