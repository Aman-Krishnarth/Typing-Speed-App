import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/user": "https://typing-speed-app-backend.onrender.com/",
      "/progress": "https://typing-speed-app-backend.onrender.com/"
    }
  }
})
