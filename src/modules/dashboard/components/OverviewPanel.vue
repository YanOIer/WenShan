<script setup lang="ts">
/**
 * 概览指标面板
 *
 * 展示核心 KPI 数据：用户数、活跃数、订单数、营收等。
 * 包含科技感角标装饰、emoji 图标、发光文字效果。
 */
import { computed } from 'vue'
import { useDashboardStore } from '@/stores/dashboard'

const store = useDashboardStore()

interface StatItem {
  label: string
  value: string | number
  unit: string
  accent: string
  icon: string
  glowClass: string
}

const stats = computed<StatItem[]>(() => {
  const o = store.overview
  if (!o) return []

  return [
    {
      label: '总用户数',
      value: formatNum(o.totalUsers),
      unit: '人',
      accent: '#00f0ff',
      icon: '?',
      glowClass: 'text-glow',
    },
    {
      label: '今日活跃',
      value: formatNum(o.todayActive),
      unit: '人',
      accent: '#00e676',
      icon: '?',
      glowClass: 'text-glow-green',
    },
    {
      label: '总订单数',
      value: formatNum(o.totalOrders),
      unit: '单',
      accent: '#ff9100',
      icon: '?',
      glowClass: 'text-glow-orange',
    },
    {
      label: '总营收',
      value: o.revenue,
      unit: '元',
      accent: '#ffeb3b',
      icon: '?',
      glowClass: 'text-glow',
    },
    {
      label: '增长率',
      value: o.growthRate.toFixed(1),
      unit: '%',
      accent: '#00e676',
      icon: '?',
      glowClass: 'text-glow-green',
    },
    {
      label: '满意度',
      value: o.satisfactionRate.toFixed(1),
      unit: '%',
      accent: '#00f0ff',
      icon: '?',
      glowClass: 'text-glow',
    },
  ]
})

function formatNum(num: number): string {
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + '万'
  }
  return num.toLocaleString()
}
</script>

<template>
  <div class="overview-panel">
    <div
      v-for="item in stats"
      :key="item.label"
      class="overview-panel__item"
    >
      <!-- 角标装饰 -->
      <div class="overview-panel__corners">
        <span class="corner-tl" />
        <span class="corner-tr" />
        <span class="corner-bl" />
        <span class="corner-br" />
      </div>

      <!-- 分隔线 -->
      <div class="overview-panel__divider" :style="{ background: item.accent }" />

      <!-- 图标 -->
      <span class="overview-panel__icon">{{ item.icon }}</span>

      <!-- 标签 -->
      <span class="overview-panel__label">{{ item.label }}</span>

      <!-- 数值 -->
      <span
        class="overview-panel__value"
        :class="item.glowClass"
        :style="{ color: item.accent }"
      >
        {{ item.value }}
        <small class="overview-panel__unit">{{ item.unit }}</small>
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/styles/variables' as *;

.overview-panel {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: $spacing-md;

  &__item {
    position: relative;
    background: $bg-secondary;
    border: 1px solid $border-color;
    border-radius: $radius-md;
    text-align: center;
    padding: $spacing-md $spacing-lg;
    transition: all 0.3s ease;
    overflow: hidden;

    // 顶部发光线
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 20%;
      right: 20%;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba($accent-blue, 0.5), transparent);
      transition: all 0.3s ease;
    }

    &:hover {
      border-color: rgba($accent-blue, 0.5);
      box-shadow: 0 0 20px rgba(0, 240, 255, 0.2), inset 0 0 20px rgba(0, 240, 255, 0.05);
      transform: translateY(-2px);

      &::before {
        left: 5%;
        right: 5%;
        background: linear-gradient(90deg, transparent, rgba($accent-blue, 0.8), transparent);
      }
    }
  }

  // 角标装饰
  &__corners {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;

    .corner-tl,
    .corner-tr,
    .corner-bl,
    .corner-br {
      position: absolute;
      width: 10px;
      height: 10px;
    }

    .corner-tl {
      top: 0;
      left: 0;
      border-top: 1px solid rgba($accent-blue, 0.5);
      border-left: 1px solid rgba($accent-blue, 0.5);
    }

    .corner-tr {
      top: 0;
      right: 0;
      border-top: 1px solid rgba($accent-blue, 0.5);
      border-right: 1px solid rgba($accent-blue, 0.5);
    }

    .corner-bl {
      bottom: 0;
      left: 0;
      border-bottom: 1px solid rgba($accent-blue, 0.5);
      border-left: 1px solid rgba($accent-blue, 0.5);
    }

    .corner-br {
      bottom: 0;
      right: 0;
      border-bottom: 1px solid rgba($accent-blue, 0.5);
      border-right: 1px solid rgba($accent-blue, 0.5);
    }
  }

  // 顶部分隔线
  &__divider {
    position: absolute;
    top: 6px;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 2px;
    border-radius: 1px;
    opacity: 0.7;
    z-index: 1;
  }

  &__icon {
    display: block;
    font-size: 22px;
    margin-bottom: $spacing-xs;
    position: relative;
    z-index: 1;
  }

  &__label {
    display: block;
    font-size: $font-size-sm;
    color: $text-secondary;
    margin-bottom: $spacing-xs;
    position: relative;
    z-index: 1;
  }

  &__value {
    font-size: $font-size-xxl;
    font-weight: 700;
    font-variant-numeric: tabular-nums;
    position: relative;
    z-index: 1;
    display: inline-block;
  }

  &__unit {
    font-size: $font-size-sm;
    font-weight: 400;
    color: $text-secondary;
    margin-left: 2px;
  }
}
</style>