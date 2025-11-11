// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // 프론트: http://localhost:5173
      // 모든 /api 요청을 백엔드로 프록시 (기본: http://localhost:8080)
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        // 백엔드가 /api 프리픽스를 쓰면 rewrite 불필요
        // rewrite: (path) => path
      },
    },
  },
})
