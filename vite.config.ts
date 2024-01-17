import { sveltekit } from '@sveltejs/kit/vite';
import git from 'git-rev-sync';
import fs from 'fs';
import { defineConfig } from 'vitest/config';

process.env.VITE_GIT_TAG = git.tag();

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
