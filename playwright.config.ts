import { defineConfig } from '@playwright/test';

export default defineConfig({
	webServer: {
		command: 'npm run build && npm run preview',
		port: 4173,
		reuseExistingServer: true
	},

	use: {
		extraHTTPHeaders: { Origin: 'http://localhost:4173' }
	},

	testDir: 'src/tests/e2e'
});
