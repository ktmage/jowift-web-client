/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
// import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		// VitePWA({
		// 	registerType: 'autoUpdate',
		// 	includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
		// 	injectRegister: 'auto',
		// 	manifest: {
		// 		name: 'Jowift',
		// 		short_name: 'Jowift',
		// 		description: 'Stylish memo application.',
		// 		theme_color: '#57b957',
		// 		icons: [
		// 			{
		// 				src: 'pwa-192x192.png',
		// 				sizes: '192x192',
		// 				type: 'image/png',
		// 			},
		// 			{
		// 				src: 'pwa-512x512.png',
		// 				sizes: '512x512',
		// 				type: 'image/png',
		// 			},
		// 		],
		// 	},
		// }),
	],
	server: {
		port: 3000,
	},
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: ['./src/vitest-setup.ts'],
	},
	resolve: {
		alias: [
			{
				find: '@',
				replacement: '/src',
			},
		],
	},
});
