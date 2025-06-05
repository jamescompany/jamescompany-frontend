import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    hmr: {
      overlay: false // 에러 오버레이 비활성화
    }
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})