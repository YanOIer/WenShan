/**
 * Mock Server 入口
 *
 * 统一管理所有 Mock 接口，仅在 VITE_USE_MOCK=true 时启用。
 * 使用 mockjs 拦截 XMLHttpRequest，模拟后端 API 响应。
 */

import Mock from 'mockjs'
import { logger } from '@/utils/logger'
import { dashboardMock } from './modules/dashboard'

/** 设置 Mock 全局配置 */
function setupMockConfig() {
  Mock.setup({
    timeout: '200-600', // 模拟网络延迟 200~600ms
  })
}

/** 汇总所有 Mock 模块 */
export function mockServer() {
  logger.info('[Mock] Initializing mock server...')
  setupMockConfig()
  dashboardMock()
  logger.info('[Mock] All mock modules registered.')
}