// vite.config.ts
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite'; // Import the plugin
import checker from 'vite-plugin-checker';
import path from 'path';
import react from '@vitejs/plugin-react-swc';

const PORT = 8080;

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    checker({
      typescript: true,
      eslint: {
        useFlatConfig: true,
        lintCommand: 'eslint "./src/**/*.{js,jsx,ts,tsx}"',
        dev: { logLevel: ['error'] },
      },
      overlay: {
        position: 'tl',
        initialIsOpen: false,
      },
    }),
  ], // Add the plugin to the array
  resolve: {
    alias: [
      {
        find: /^src(.+)/,
        replacement: path.resolve(process.cwd(), 'src/$1'),
      },
    ],
  },
  server: { port: PORT, host: true, open: true },
  preview: { port: PORT, host: true },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
