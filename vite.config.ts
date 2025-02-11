import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@Components': path.resolve(__dirname, 'src/Components'),
      '@Hooks': path.resolve(__dirname, 'src/Hooks'),
      '@Pages': path.resolve(__dirname, 'src/Pages'),
      '@Services': path.resolve(__dirname, 'src/Services'),
      '@Styles': path.resolve(__dirname, 'src/styles'),
      '@Utils': path.resolve(__dirname, 'src/Utils'),
      '@Common': path.resolve(__dirname, 'src/Common'),
      '@Routes': path.resolve(__dirname, 'src/Routes'),
      '@Assets': path.resolve(__dirname, 'src/Assets'),
    },
  },
});
