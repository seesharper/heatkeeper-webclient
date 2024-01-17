import { sveltekit } from '@sveltejs/kit/vite';
import fs from 'fs';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		https: {
			key: fs.readFileSync(`${__dirname}/cert/key.pem`),
			cert: fs.readFileSync(`${__dirname}/cert/cert.pem`)
		},
		proxy: {}
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
