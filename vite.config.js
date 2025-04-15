import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      include: /\.(advanced\.tsx|advanced\.jsx)$/,
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/setupTests.js',
  },
  root: '.',
  build: {
    outDir: 'dist',
  },
  server: {
    open: '/index.advanced.html',
  },
});
