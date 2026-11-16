import { defineConfig } from 'vitest/config';
import adapter from '@sveltejs/adapter-auto';
import { sveltekit } from '@sveltejs/kit/vite';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
	plugins: [sveltekit({ adapter: adapter(), preprocess: vitePreprocess() })],

	test: {
		globalSetup: './src/tests/vitest.setup.ts',
		include: ['src/**/*.{test,spec}.{js,ts}'],
		exclude: ['src/tests/e2e/**/*.{test,spec}.{js,ts}']
	}
});
