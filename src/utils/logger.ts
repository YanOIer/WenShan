/**
 * 统一日志系统
 *
 * 提供分级日志输出，开发环境输出到 Console，
 * 生产环境可扩展为上报到远程服务（如 Sentry）。
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error'

interface LogEntry {
  level: LogLevel
  message: string
  timestamp: string
  data?: unknown
}

class Logger {
  private isProduction: boolean

  constructor() {
    this.isProduction = import.meta.env.PROD
  }

  private formatMessage(level: LogLevel, message: string): string {
    const timestamp = new Date().toISOString()
    return `[${timestamp}] [${level.toUpperCase()}] ${message}`
  }

  private createEntry(level: LogLevel, message: string, data?: unknown): LogEntry {
    return {
      level,
      message,
      timestamp: new Date().toISOString(),
      data,
    }
  }

  debug(message: string, data?: unknown) {
    if (this.isProduction) return
    const entry = this.createEntry('debug', message, data)
    console.debug(this.formatMessage('debug', message), data ?? '')
    // 生产环境可在此上报：this.report(entry)
  }

  info(message: string, data?: unknown) {
    const entry = this.createEntry('info', message, data)
    console.info(this.formatMessage('info', message), data ?? '')
  }

  warn(message: string, data?: unknown) {
    const entry = this.createEntry('warn', message, data)
    console.warn(this.formatMessage('warn', message), data ?? '')
  }

  error(message: string, data?: unknown) {
    const entry = this.createEntry('error', message, data)
    console.error(this.formatMessage('error', message), data ?? '')
    // 生产环境可在此上报错误：this.report(entry)
  }

  /** 预留：上报日志到远程服务 */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private report(_entry: LogEntry) {
    // TODO: 接入 Sentry / 自定义上报
  }
}

export const logger = new Logger()