import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');

	return {
		define: {
			'process.env.BASENAME': JSON.stringify(env.BASENAME),
			'process.env.API': JSON.stringify(env.API),
			'process.env.API_KEY': JSON.stringify(env.API_KEY),
		},
		plugins: [react()],
		base: mode === 'development' ? '/' : '/sycret/',
	};
});
