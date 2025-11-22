import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'@/features': path.resolve(__dirname, './src/features'),
			'@/shared': path.resolve(__dirname, './src/shared'),
			'@/store': path.resolve(__dirname, './src/store'),
			'@/pages': path.resolve(__dirname, './src/pages'),
			'@/assets': path.resolve(__dirname, './src/assets'),
		},
	},
});
