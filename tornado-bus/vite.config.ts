import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/Tornado-bus/tornado-bus/',
  plugins: [
    react(),
    tailwindcss()
  ],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true
  }
})
