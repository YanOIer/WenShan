<script setup lang="ts">
/**
 * 基础图表组件
 *
 * 封装 vue-echarts，统一配置主题、自适应和中文字体。
 */
import { computed } from 'vue'
import VChart from 'vue-echarts'
import type { EChartsOption } from 'echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart, BarChart, PieChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  DataZoomComponent,
} from 'echarts/components'
import { merge } from 'lodash-es'
import { CHART_FONT_FAMILY } from '@/utils/chartTheme'

// 注册必要的 ECharts 组件（按需加载，减小打包体积）
use([
  CanvasRenderer,
  LineChart,
  BarChart,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  DataZoomComponent,
])

const props = defineProps<{
  option: EChartsOption
  height?: string
  loading?: boolean
}>()

const chartHeight = computed(() => props.height || '100%')

/**
 * 将统一的 fontFamily 注入到 ECharts option 中，
 * 确保图表内所有中文文字（标题、坐标轴、tooltip、legend）正常渲染。
 */
const mergedOption = computed<EChartsOption>(() => {
  const defaults: EChartsOption = {
    textStyle: {
      fontFamily: CHART_FONT_FAMILY,
    },
    title: {
      textStyle: {
        fontFamily: CHART_FONT_FAMILY,
      },
    },
    legend: {
      textStyle: {
        fontFamily: CHART_FONT_FAMILY,
      },
    },
    tooltip: {
      textStyle: {
        fontFamily: CHART_FONT_FAMILY,
      },
    },
    xAxis: {
      nameTextStyle: {
        fontFamily: CHART_FONT_FAMILY,
      },
      axisLabel: {
        fontFamily: CHART_FONT_FAMILY,
      },
    },
    yAxis: {
      nameTextStyle: {
        fontFamily: CHART_FONT_FAMILY,
      },
      axisLabel: {
        fontFamily: CHART_FONT_FAMILY,
      },
    },
  }
  return merge({}, defaults, props.option)
})
</script>

<template>
  <div class="base-chart">
    <VChart
      class="base-chart__instance"
      :option="mergedOption"
      :style="{ height: chartHeight }"
      autoresize
    />
    <div v-if="loading" class="base-chart__loading">
      <span class="base-chart__loading-text">加载中...</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.base-chart {
  position: relative;
  width: 100%;
  height: 100%;

  &__instance {
    width: 100%;
  }

  &__loading {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(5, 11, 20, 0.6);
    backdrop-filter: blur(2px);
  }

  &__loading-text {
    color: $text-secondary;
    font-size: $font-size-sm;
    animation: pulse 1.5s ease-in-out infinite;
  }
}

@keyframes pulse {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
}
</style>