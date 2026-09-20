import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => ({
  base: '/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('src', import.meta.url)),
    },
  },
  server: {
    port: 5173,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: mode !== 'production',
    target: 'es2022',
  },
}));
