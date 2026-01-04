import adapter from '@sveltejs/adapter-netlify';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
      outDir: 'dist' 
    }),
		alias: {
      "$core": "./src/core",
			"$shaders": "./src/shaders",
			"$static_libs": "./src/static_libs",
    }
	},
};

export default config;
