/** @type {import('tailwindcss').Config} */

const baseTheme = {
	'color-scheme': 'normal',
	fontFamily: 'Poetsen One, Potta One, sans-serif',
	'--rounded-box': '0rem',
	'--rounded-btn': '0.4rem',
	'--rounded-badge': '1.9rem',
	'--tab-radius': '0rem',

	primary: '#411ab7',
	secondary: '#597353',

	info: '#00aeff',
	success: '#00f937',
	warning: '#ff9600',
	error: '#f02654',
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
				standard: {
					...baseTheme,
					'base-100': '#d5dbc4',
				},
			},
		],
	},
};
