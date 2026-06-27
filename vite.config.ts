import { defineConfig } from 'vitest/config';

import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
	plugins: [sveltekit()],

	esbuild: {
		tsconfigRaw: { compilerOptions: { experimentalDecorators: true } }
	},

	test: {
		globalSetup: './src/tests/vitest.setup.ts',
		include: ['src/**/*.{test,spec}.{js,ts}'],
		exclude: ['src/tests/e2e/**/*.{test,spec}.{js,ts}']
	}
});