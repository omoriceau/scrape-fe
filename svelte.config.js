import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
            out: 'build'
        }),
		alias: {
      		'$paraglide/*': 'src/lib/i18n/*',
      		'$lib/*': 'src/lib/*'
    	}
	},
	extensions: ['.svelte', '.md'],
	preprocess: [
		vitePreprocess(),
		mdsvex({
			extensions: ['.md'],
			layout: {
				// Optional: specify a layout component for markdown files
				// _: './src/lib/MdsvexLayout.svelte'
			}
		})
	]
};

export default config;