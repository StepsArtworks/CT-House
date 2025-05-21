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
    assetsInlineLimit: 50000000, // Increased to 50MB to handle large GLB files
    chunkSizeWarningLimit: 50000, // Increased chunk size warning limit
  },
  base: '/capetownhouse/',
  publicDir: 'public',
});