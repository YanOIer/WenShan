# WenShan (文山)

一个用于学习数据可视化大屏开发的开源项目。

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Vue 3](https://img.shields.io/badge/Vue-3.5-brightgreen.svg)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-purple.svg)](https://vitejs.dev/)

## 项目简介

WenShan（文山）是一个数据可视化大屏项目，旨在帮助开发者学习和实践数据大屏的开发技术。项目采用纯前端架构，数据使用 Mock 模拟，后期可一键切换为真实 API。

核心特性：

- 数据可视化图表（基于 ECharts 5，按需引入）
- 1920×1080 标准大屏布局，CSS transform 自适应缩放
- Mock 数据与真实 API 一键切换（环境变量控制）
- 统一日志系统，支持分级输出与远程上报扩展
- 完整的测试体系（单元测试 + E2E 测试）
- 代码质量保障（ESLint + Prettier + Husky + lint-staged）
- 严格模块化开发，按业务领域拆分目录

## 技术栈

| 类别 | 技术 |
|------|------|
| **框架** | Vue 3（Composition API + `<script setup>`） |
| **语言** | TypeScript（严格模式） |
| **构建工具** | Vite 6 |
| **状态管理** | Pinia 2（Setup Store 风格） |
| **路由** | Vue Router 4（Hash 模式） |
| **可视化** | ECharts 5 + vue-echarts 7（按需引入） |
| **HTTP 请求** | Axios |
| **Mock 数据** | Mock.js |
| **CSS 预处理** | SCSS（Sass 现代 API） |
| **单元测试** | Vitest + Vue Test Utils + happy-dom |
| **E2E 测试** | Playwright |
| **代码规范** | ESLint + Prettier |
| **Git Hooks** | Husky + lint-staged |
| **工具库** | dayjs、lodash-es |

## 快速开始

### 环境要求

- Node.js >= 18
- npm >= 9

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

浏览器访问：http://localhost:3000 （默认端口 3000）

### 构建生产版本

```bash
npm run build      # 类型检查 + Vite 构建
npm run preview    # 预览构建产物
```

## Mock 数据与 API 切换

项目使用环境变量控制数据源：

| 环境变量 | 说明 | 默认值 |
|----------|------|--------|
| `VITE_USE_MOCK` | 是否使用 Mock 数据 | `true`（开发）/ `false`（生产） |
| `VITE_API_BASE_URL` | 真实 API 地址 | `http://localhost:8080/api` |

**切换方式：**

1. **开发时使用 Mock**：无需任何配置，默认启用 Mock
2. **切换为真实 API**：修改 `.env` 文件：
   ```
   VITE_USE_MOCK=false
   VITE_API_BASE_URL=https://your-api-server.com/api
   ```
3. **Mock 与 API 共存的架构**：
   - `src/mock/` 目录管理所有 Mock 接口（按模块拆分）
   - `src/api/request.ts` 封装 Axios 请求
   - `src/main.ts` 根据 `VITE_USE_MOCK` 决定是否启动 Mock Server

### 已注册的 Mock 接口

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/dashboard/overview` | 概览统计数据 |
| GET | `/api/dashboard/chart/line` | 折线图数据 |
| GET | `/api/dashboard/chart/bar` | 柱状图数据 |
| GET | `/api/dashboard/chart/pie` | 饼图数据 |
| GET | `/api/dashboard/map` | 地图散点数据 |
| GET | `/api/dashboard/realtime` | 实时监控数据 |

## 测试

### 单元测试（Vitest）

```bash
# 运行所有单元测试（单次）
npm run test:unit

# 监听模式（开发时使用）
npm run test:unit:watch

# 带 UI 界面的测试运行器
npm run test:unit:ui
```

**测试环境**：happy-dom（轻量级 DOM 模拟，比 jsdom 更快）

**测试文件命名规范**：`*.test.ts` 或 `*.spec.ts`，与源文件同目录

**编写测试示例**：

```typescript
// src/utils/logger.test.ts
import { describe, it, expect } from 'vitest'
import { logger } from './logger'

describe('Logger', () => {
  it('should have all log levels', () => {
    expect(typeof logger.debug).toBe('function')
    expect(typeof logger.info).toBe('function')
    expect(typeof logger.warn).toBe('function')
    expect(typeof logger.error).toBe('function')
  })
})
```

### E2E 测试（Playwright）

```bash
# 运行 E2E 测试
npm run test:e2e

# 带 UI 的 E2E 测试运行器
npm run test:e2e:ui
```

**测试文件位置**：`e2e/` 目录

**编写 E2E 测试示例**：

```typescript
// e2e/dashboard.spec.ts
import { test, expect } from '@playwright/test'

test('大屏首页正常加载', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('.screen-layout__title')).toContainText('WenShan')
})
```

### 测试覆盖率

```bash
npx vitest run --coverage
```

覆盖率报告输出在 `coverage/` 目录（HTML 格式）。

## 开发规范

### 代码检查与格式化

```bash
# ESLint 检查并自动修复
npm run lint

# Prettier 格式化
npm run format

# TypeScript 类型检查
npm run type-check
```

### Git 提交规范

项目配置了 Husky + lint-staged，每次 `git commit` 时会自动：

1. 对暂存的 `.vue/.ts/.tsx` 文件执行 ESLint 修复
2. 对所有暂存文件执行 Prettier 格式化

确保提交到仓库的代码始终符合规范。

### 模块化开发约定

- **页面组件**放在 `src/modules/<模块>/views/`，路由懒加载
- **页面子组件**放在 `src/modules/<模块>/components/`
- **公共组件**放在 `src/components/`
- **状态管理**每个模块独立一个 Pinia Store
- **API 接口**每个模块独立一个文件（后续扩展）
- **Mock 数据**每个模块独立一个 Mock 文件

## 项目结构

```
DataScreen/
├── index.html                    # 入口 HTML
├── package.json                  # 项目配置与脚本
├── vite.config.ts                # Vite 构建配置
├── vitest.config.ts              # 单元测试配置
├── playwright.config.ts          # E2E 测试配置
├── tsconfig.json                 # TypeScript 配置
├── .eslintrc.cjs                 # ESLint 规则
├── .prettierrc                   # Prettier 格式化规则
├── .env / .env.production        # 环境变量
│
├── public/                       # 静态资源
├── e2e/                          # E2E 测试用例
│
└── src/
    ├── main.ts                   # 应用入口
    ├── App.vue                   # 根组件
    │
    ├── api/                      # API 层
    │   └── request.ts            # Axios 封装
    │
    ├── mock/                     # Mock 数据
    │   ├── index.ts              # Mock Server 入口
    │   └── modules/              # 按业务模块拆分
    │
    ├── stores/                   # Pinia 状态管理
    ├── router/                   # 路由配置
    ├── components/               # 公共组件
    ├── layout/                   # 布局组件
    │
    ├── modules/                  # 业务模块（按大屏模块拆分）
    │   └── dashboard/
    │       ├── views/            # 页面视图
    │       └── components/       # 模块组件
    │
    ├── styles/                   # 样式系统
    │   ├── variables.scss        # SCSS 变量
    │   └── global.scss           # 全局样式
    │
    └── utils/                    # 工具函数
        └── logger.ts             # 日志系统
```

## 可用命令一览

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 类型检查 + 生产构建 |
| `npm run preview` | 预览生产构建 |
| `npm run test:unit` | 运行单元测试（单次） |
| `npm run test:unit:watch` | 单元测试监听模式 |
| `npm run test:unit:ui` | 单元测试 UI 界面 |
| `npm run test:e2e` | 运行 E2E 测试 |
| `npm run test:e2e:ui` | E2E 测试 UI 界面 |
| `npm run lint` | ESLint 检查并修复 |
| `npm run format` | Prettier 格式化 |
| `npm run type-check` | TypeScript 类型检查 |

## 常见问题

### E2E 测试首次运行报错

首次运行 Playwright 需要安装浏览器：

```bash
npx playwright install chromium
```

### 开发服务器启动后页面空白

1. 检查终端是否有编译错误
2. 确认 `.env` 文件中的 `VITE_USE_MOCK=true`
3. 清除缓存后重试：`rm -rf node_modules && npm install`

### Mock 数据不生效

确保 `src/main.ts` 中正确引入了 Mock Server，并且环境变量 `VITE_USE_MOCK=true`。Mock.js 通过拦截 XMLHttpRequest 工作，如果先发送了请求再启动 Mock，则需要刷新页面。

## 开源协议

本项目基于 [MIT License](LICENSE) 开源。