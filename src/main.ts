import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from '@/router'
import App from '@/App.vue'
import { logger } from '@/utils/logger'

// 样式导入
import 'normalize.css'
import '@/styles/global.scss'

// 初始化 Mock Server（开发环境）
async function bootstrap() {
  if (import.meta.env.VITE_USE_MOCK === 'true') {
    const { mockServer } = await import('@/mock')
    mockServer()
    logger.info('[App] Mock server started')
  }
}

bootstrap().then(() => {
  const app = createApp(App)

  app.use(createPinia())
  app.use(router)

  app.mount('#app')

  logger.info(`[App] WenShan (文山) mounted - Mode: ${import.meta.env.MODE}`)
})