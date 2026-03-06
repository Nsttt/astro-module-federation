// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import { moduleFederation } from '@module-federation/astro';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
  integrations: [
    moduleFederation({
        name: 'astro_host',
        remotes: {
          astro_remote: 'astro_remote@http://localhost:4173/mf-manifest.json',
        },
        ssr: {
          localRemotes: {
            astro_remote: '../remote',
          },
        },
        dts: false,
      }),
  ],
});
