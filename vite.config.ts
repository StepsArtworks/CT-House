import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  assetsInclude: ['**/*.glb', '**/*.gltf'], // Include both GLB and GLTF files
  build: {
    assetsInlineLimit: 0, // Ensure large binary files are not inlined
  },
  base: '/capetownhouse/',
  publicDir: 'public',
});