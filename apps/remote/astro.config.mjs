// @ts-check
import { defineConfig } from 'astro/config';
import { moduleFederation } from '@module-federation/astro';

const isDev = process.argv.some((arg) => arg.includes('dev'));

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
				dts: isDev
					? false
					: {
							tsConfigPath: './tsconfig.json',
							generateTypes: {
								extractRemoteTypes: true,
							},
							consumeTypes: false,
						},
        exposes: {
          './widget': './src/widget.ts',
          './server': './src/server.ts',
          './RemoteCard': './src/RemoteCard.astro',
        },
    }),
  ],
});
