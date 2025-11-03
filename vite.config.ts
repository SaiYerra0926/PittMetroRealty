import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { visualizer } from 'rollup-plugin-visualizer'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: 'dist/bundle-analysis.html',
      open: true,
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    }
  },
  base: './',
  build: {
    outDir: 'build',
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          ui: ['@radix-ui/react-slot', 'class-variance-authority', 'clsx', 'tailwind-merge'],
        }
      }
    },
    chunkSizeWarningLimit: 1000,
  }
})