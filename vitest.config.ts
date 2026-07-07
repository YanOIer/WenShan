import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: 'happy-dom',
      include: ['src/**/*.{test,spec}.{ts,tsx}'],
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
        include: ['src/**/*.{ts,tsx,vue}'],
        exclude: [
          'src/**/*.d.ts',
          'src/**/*.{test,spec}.{ts,tsx}',
          'src/mock/**',
        ],
      },
      setupFiles: [],
    },
  }),
)