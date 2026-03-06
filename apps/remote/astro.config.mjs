// @ts-check
import { defineConfig } from 'astro/config';
import { moduleFederation } from '@module-federation/astro';

export default defineConfig({
  vite: {
    server: {
      origin: 'http://localhost:4173',
    },
  },
  integrations: [
    moduleFederation({
				name: 'astro_remote',
				filename: 'remoteEntry.js',
				varFilename: 'remoteEntry.global.js',
				manifest: true,
				dts: false,
					exposes: {
						'./widget': './src/widget.js',
						'./server': './src/server.js',
						'./RemoteCard': './src/RemoteCard.astro',
					},
    }),
  ],
});
