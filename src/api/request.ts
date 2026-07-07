/**
 * HTTP 请求封装 (Axios)
 *
 * 统一请求拦截、响应拦截、错误处理。
 */

import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios'
import { logger } from '@/utils/logger'

const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    logger.debug(`[Request] ${config.method?.toUpperCase()} ${config.url}`, config.params)
    return config
  },
  (error) => {
    logger.error('[Request Error]', error)
    return Promise.reject(error)
  },
)

// 响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    logger.debug(`[Response] ${response.config.url} - ${response.status}`)
    return response.data
  },
  (error) => {
    const message = error.response?.data?.message || error.message || '网络错误'
    logger.error(`[Response Error] ${error.config?.url}`, { message, status: error.response?.status })
    return Promise.reject(error)
  },
)

/** 通用 GET 请求 */
export function get<T = unknown>(url: string, params?: Record<string, unknown>, config?: AxiosRequestConfig): Promise<T> {
  return instance.get(url, { params, ...config })
}

/** 通用 POST 请求 */
export function post<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
  return instance.post(url, data, config)
}

export default instance