/**
 * Dashboard Store
 *
 * 管理大屏首页的数据状态，按区块拆分为独立 Store。
 */

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { get } from '@/api/request'
import { logger } from '@/utils/logger'

/** 概览统计数据接口 */
interface OverviewData {
  totalUsers: number
  todayActive: number
  totalOrders: number
  revenue: number
  growthRate: number
  satisfactionRate: number
}

/** 图表数据接口 */
interface ChartData {
  categories: string[]
  values: number[]
  name: string
}

export const useDashboardStore = defineStore('dashboard', () => {
  // ---- 概览统计 ----
  const overview = ref<OverviewData | null>(null)
  const overviewLoading = ref(false)

  async function fetchOverview() {
    overviewLoading.value = true
    try {
      const res = await get<{ code: number; data: OverviewData; message: string }>(
        '/api/dashboard/overview',
      )
      overview.value = res.data
    } catch (err) {
      logger.error('[DashboardStore] fetchOverview failed', err)
    } finally {
      overviewLoading.value = false
    }
  }

  // ---- 折线图数据 ----
  const lineChart = ref<ChartData | null>(null)
  const lineChartLoading = ref(false)

  async function fetchLineChart() {
    lineChartLoading.value = true
    try {
      const res = await get<{ code: number; data: ChartData; message: string }>(
        '/api/dashboard/chart/line',
      )
      lineChart.value = res.data
    } catch (err) {
      logger.error('[DashboardStore] fetchLineChart failed', err)
    } finally {
      lineChartLoading.value = false
    }
  }

  // ---- 柱状图数据 ----
  const barChart = ref<ChartData | null>(null)
  const barChartLoading = ref(false)

  async function fetchBarChart() {
    barChartLoading.value = true
    try {
      const res = await get<{ code: number; data: ChartData; message: string }>(
        '/api/dashboard/chart/bar',
      )
      barChart.value = res.data
    } catch (err) {
      logger.error('[DashboardStore] fetchBarChart failed', err)
    } finally {
      barChartLoading.value = false
    }
  }

  // ---- 计算属性 ----
  const formattedRevenue = computed(() => {
    if (!overview.value) return '--'
    return (overview.value.revenue / 10000).toFixed(0) + '万'
  })

  // ---- 统一初始化方法 ----
  async function initAll() {
    await Promise.all([fetchOverview(), fetchLineChart(), fetchBarChart()])
  }

  return {
    // state
    overview,
    overviewLoading,
    lineChart,
    lineChartLoading,
    barChart,
    barChartLoading,
    // getters
    formattedRevenue,
    // actions
    fetchOverview,
    fetchLineChart,
    fetchBarChart,
    initAll,
  }
})