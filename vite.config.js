import { defineConfig } from 'vite';

export default defineConfig({
  // GitHub Pages project site is served from /huyndx9/, not domain root.
  base: '/huyndx9/',
  server: {
    port: 5183,
    strictPort: true,
  },
});
