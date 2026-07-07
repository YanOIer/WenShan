<script setup lang="ts">
/**
 * 柱状图面板
 *
 * 升级：科技感面板装饰 + 暗色 ECharts 主题 + 统一中文字体。
 */
import { computed } from 'vue'
import type { EChartsOption } from 'echarts'
import { useDashboardStore } from '@/stores/dashboard'
import BaseChart from '@/components/BaseChart.vue'
import { CHART_FONT_FAMILY } from '@/utils/chartTheme'

const store = useDashboardStore()

const option = computed<EChartsOption>(() => {
  const data = store.barChart
  if (!data) return {}

  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: 'rgba(6, 20, 52, 0.9)',
      borderColor: 'rgba(0, 240, 255, 0.4)',
      textStyle: {
        color: '#e0f0ff',
        fontFamily: CHART_FONT_FAMILY,
      },
    },
    legend: {
      data: [data.name],
      textStyle: {
        color: '#8aa4c8',
        fontFamily: CHART_FONT_FAMILY,
        fontSize: 13,
      },
      top: 0,
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '40px',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: data.categories,
      axisLine: {
        lineStyle: { color: 'rgba(0, 240, 255, 0.3)' },
      },
      axisTick: { show: false },
      axisLabel: {
        color: '#8aa4c8',
        fontFamily: CHART_FONT_FAMILY,
        fontSize: 12,
      },
      splitLine: { show: false },
    },
    yAxis: {
      type: 'value',
      splitLine: {
        lineStyle: { color: 'rgba(0, 240, 255, 0.08)', type: 'dashed' },
      },
      axisLabel: {
        color: '#8aa4c8',
        fontFamily: CHART_FONT_FAMILY,
        fontSize: 12,
      },
      axisLine: { show: false },
      axisTick: { show: false },
    },
    series: [
      {
        name: data.name,
        type: 'bar',
        data: data.values,
        barWidth: '40%',
        itemStyle: {
          borderRadius: [6, 6, 0, 0],
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: '#00e676' },
              { offset: 0.5, color: 'rgba(0, 230, 118, 0.8)' },
              { offset: 1, color: 'rgba(0, 230, 118, 0.2)' },
            ],
          },
          shadowBlur: 8,
          shadowColor: 'rgba(0, 230, 118, 0.3)',
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 16,
            shadowColor: 'rgba(0, 230, 118, 0.6)',
          },
        },
      },
    ],
  }
})
</script>

<template>
  <div class="panel-box chart-panel">
    <!-- 角标装饰 -->
    <div class="panel-box__corners">
      <span class="corner-tl" />
      <span class="corner-tr" />
      <span class="corner-bl" />
      <span class="corner-br" />
    </div>

    <h3 class="panel__title chart-panel__title">数据分布</h3>
    <BaseChart
      :option="option"
      :loading="store.barChartLoading"
      height="calc(100% - 50px)"
    />
  </div>
</template>

<style lang="scss" scoped>
@use '@/styles/variables' as *;

.chart-panel {
  &__title {
    position: relative;
    z-index: 2;
    margin-bottom: $spacing-sm;
  }
}
</style>