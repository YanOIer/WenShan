import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/variables" as *;`,
        api: 'modern-compiler',
      },
    },
  },

  server: {
    port: 3000,
    open: true,
  },

  build: {
    target: 'ES2022',
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router', 'pinia'],
          echarts: ['echarts', 'vue-echarts'],
          utils: ['lodash-es', 'dayjs', 'axios'],
        },
      },
    },
  },
})