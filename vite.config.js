import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Ensures relative assets work on GitHub Pages regardless of repo name
  server: {
    port: 5173,
    host: true, // Accessible on localhost and local network
  }
})
