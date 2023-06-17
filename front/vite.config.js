import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    strictPort: true,
    watch: {
      usePolling: false,
      interval: 1000,
      binaryInterval: 3000,
    },
  },
})
