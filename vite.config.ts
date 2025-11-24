import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // This is important for Firebase auth redirects in dev
    host: 'localhost',
    port: 5173,
  },
});
