import { defineConfig } from 'astro/config';

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  integrations: [svelte()],
  site: 'https://codegrid.github.io',
  base: '/2024-astro-svelte-site',
});
