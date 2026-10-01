import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss()],
  logLevel: 'warn',
  build: {
    outDir: '_gallery-css-out',
    emptyOutDir: true,
    minify: false,
    cssMinify: false,
    rollupOptions: {
      input: '_gallery-css-entry.css',
      output: { entryFileNames: 'entry.js', assetFileNames: 'theme[extname]' },
    },
  },
});
