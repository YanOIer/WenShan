<script setup lang="ts">
/**
 * 大屏首页 - Dashboard
 *
 * 组合各个独立的数据图表组件，呈现完整大屏。
 */
import { onMounted } from 'vue'
import { useDashboardStore } from '@/stores/dashboard'
import OverviewPanel from '../components/OverviewPanel.vue'
import LineChartPanel from '../components/LineChartPanel.vue'
import BarChartPanel from '../components/BarChartPanel.vue'

const dashboardStore = useDashboardStore()

onMounted(() => {
  dashboardStore.initAll()
})
</script>

<template>
  <div class="dashboard">
    <!-- 顶部：概览指标 -->
    <section class="dashboard__overview">
      <OverviewPanel />
    </section>

    <!-- 中部：图表区域 -->
    <section class="dashboard__charts">
      <LineChartPanel />
      <BarChartPanel />
    </section>
  </div>
</template>

<style lang="scss" scoped>
.dashboard {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: $spacing-lg;

  &__overview {
    flex-shrink: 0;
  }

  &__charts {
    flex: 1;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: $spacing-lg;
    min-height: 0;
  }
}
</style>