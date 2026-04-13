// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightClientMermaid from '@pasqal-io/starlight-client-mermaid';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
	output: 'static',
	markdown: {
		shikiConfig: {
			langAlias: {
				noir: 'rust',
				nr: 'rust',
			},
		},
	},
	integrations: [
		starlight({
			plugins: [
				starlightClientMermaid(),
			],
			title: 'Noir JetBrains Plugin',
			logo: {
				src: './src/assets/logo.svg',
				replacesTitle: true,
			},
			tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 3 },
			favicon: '/favicon.svg',
			customCss: ['./src/styles/custom.css'],
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/turbine-cash/JetBrains-Noir-Syntax-Highlight-Plugin' },
				{ icon: 'x.com', label: 'X', href: 'https://x.com/NoirLang' },
			],
			components: {
				Header: './src/components/Header.astro',
				PageTitle: './src/components/PageTitle.astro',
				PageFrame: './src/components/PageFrame.astro',
			},
			defaultLocale: 'root',
			locales: {
				root: {
					label: 'English',
					lang: 'en',
				},
			},
			pagefind: true,
			sidebar: [
				{ label: 'Introduction', slug: 'introduction' },
				{ label: 'Quick Start', slug: 'quick-start' },
				{ label: 'Installation', slug: 'installation' },
				{ label: 'Syntax Highlighting', slug: 'syntax-highlighting' },
				{ label: 'LSP Intelligence', slug: 'lsp-intelligence' },
				{ label: 'Live Templates', slug: 'live-templates' },
				{ label: 'Actions', slug: 'actions' },
				{ label: 'Settings', slug: 'settings' },
				{ label: 'Troubleshooting', slug: 'troubleshooting' },
				{ label: 'Limitations', slug: 'limitations' },
			],
		}),
	],
	adapter: cloudflare(),
});
