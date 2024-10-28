import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig, loadEnv } from 'vite';
import dts from 'vite-plugin-dts';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');

	return {
		define: {
			'process.env.BASENAME': JSON.stringify(env.BASENAME),
			'process.env.API': JSON.stringify(env.API),
			'process.env.API_KEY': JSON.stringify(env.API_KEY),
		},
		plugins: [
			react(),
			libInjectCss(),
			dts({
				tsconfigPath: 'tsconfig.build.json',
				include: ['src/components'],
			}),
		],
		build: {
			copyPublicDir: false,
			lib: {
				entry: resolve(__dirname, 'src/components/index.tsx'),
				formats: ['es'],
			},
			minify: true,
			rollupOptions: {
				external: ['react', 'react/jsx-runtime', 'react-router-dom'],
			},
			sourcemap: true,
		},
	};
});
