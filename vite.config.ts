import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import wasm from 'vite-plugin-wasm';
import topLevelAwait from 'vite-plugin-top-level-await';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const packageJsonPath = join(__dirname, 'package.json');
const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));

export default defineConfig({
	plugins: [
		{
			name: 'cross-origin-isolation',
			configureServer: (server) => {
				server.middlewares.use((_req, res, next) => {
					res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
					res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
					next();
				});
			},
			configurePreviewServer: (server) => {
				server.middlewares.use((_req, res, next) => {
					res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
					res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
					next();
				});
			}
		},
		wasm(),
		topLevelAwait(),
		sveltekit()
	],
	server: {
		fs: {
			allow: ['static']
		}
	},
	optimizeDeps: {
		exclude: ['rgskin', 'rgchart']
	},
	assetsInclude: ['**/*.wasm'],
	worker: {
		format: 'es'
	},
	define: {
		__APP_VERSION__: JSON.stringify(packageJson.version)
	}
});
