import { defineConfig } from 'vite'

export default defineConfig({
	base: './',
	plugins: [],
	server: { host: '0.0.0.0', port: 8000 },
	clearScreen: false,
	build: {
		// Do not inline images and assets to avoid the phaser error
		// "Local data URIs are not supported"
		assetsInlineLimit: 0
	},
})