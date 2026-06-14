import adapter from '@sveltejs/adapter-netlify';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			outDir: 'dist'
		}),
		alias: {
			$core: path.resolve('./src/core'),
			$shaders: path.resolve('./src/shaders'),
			$static_libs: path.resolve('./static/libs')
		}
	}
};

export default config;
