<script setup lang="ts">
/**
 * 大屏骨架布局
 *
 * 采用 1920x1080 标准大屏分辨率，
 * 使用 CSS transform scale 实现自适应缩放。
 */
import { ref, onMounted, onUnmounted } from 'vue'
import dayjs from 'dayjs'

const screenRef = ref<HTMLElement>()
const scale = ref(1)
const currentTime = ref('')

const DESIGN_WIDTH = 1920
const DESIGN_HEIGHT = 1080

let timer: ReturnType<typeof setInterval> | null = null

function updateTime() {
  currentTime.value = dayjs().format('YYYY-MM-DD HH:mm:ss')
}

function handleResize() {
  const clientWidth = document.documentElement.clientWidth
  const clientHeight = document.documentElement.clientHeight

  const scaleX = clientWidth / DESIGN_WIDTH
  const scaleY = clientHeight / DESIGN_HEIGHT

  // 保持宽高比，取较小值确保内容可见
  scale.value = Math.min(scaleX, scaleY)
}

onMounted(() => {
  handleResize()
  updateTime()
  timer = setInterval(updateTime, 1000)
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  if (timer) {
    clearInterval(timer)
    timer = null
  }
})
</script>

<template>
  <div ref="screenRef" class="screen-layout" :style="{ transform: `scale(${scale})` }">
    <header class="screen-layout__header">
      <!-- 左侧装饰线 -->
      <div class="header-deco header-deco--left">
        <span class="header-deco__line" />
        <span class="header-deco__dot" />
        <span class="header-deco__line header-deco__line--short" />
      </div>

      <!-- 标题 -->
      <h1 class="screen-layout__title">
        <span class="screen-layout__title-bracket">【</span>
        WenShan 文山 · 数据可视化大屏
        <span class="screen-layout__title-bracket">】</span>
      </h1>

      <!-- 右侧装饰线 -->
      <div class="header-deco header-deco--right">
        <span class="header-deco__line header-deco__line--short" />
        <span class="header-deco__dot" />
        <span class="header-deco__line" />
      </div>

      <!-- 实时时钟 -->
      <span class="screen-layout__time">{{ currentTime }}</span>
    </header>

    <main class="screen-layout__body">
      <router-view />
    </main>
  </div>
</template>

<style lang="scss" scoped>
@use '@/styles/variables' as *;

.screen-layout {
  width: 1920px;
  height: 1080px;
  transform-origin: left top;
  background: $bg-primary;
  position: relative;
  overflow: hidden;

  // 背景网格线（科技感）
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(0, 240, 255, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 240, 255, 0.03) 1px, transparent 1px);
    background-size: 60px 60px;
    pointer-events: none;
    z-index: 0;
  }

  &__header {
    height: 80px;
    padding: 0 $spacing-xxl;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 1;
    background: linear-gradient(
      180deg,
      rgba(0, 240, 255, 0.08) 0%,
      rgba(0, 240, 255, 0.02) 60%,
      transparent 100%
    );

    // 底部发光边框
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 5%;
      right: 5%;
      height: 1px;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(0, 240, 255, 0.5),
        rgba(0, 240, 255, 0.8),
        rgba(0, 240, 255, 0.5),
        transparent
      );
      box-shadow: 0 0 10px rgba(0, 240, 255, 0.4), 0 0 20px rgba(0, 240, 255, 0.15);
    }
  }

  &__title {
    font-size: 36px;
    font-weight: 700;
    letter-spacing: 6px;
    color: transparent;
    background: linear-gradient(90deg, #00f0ff 0%, #80f0ff 40%, #00f0ff 60%, #80f0ff 100%);
    background-size: 200% auto;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 0 30px rgba(0, 240, 255, 0.4), 0 0 60px rgba(0, 240, 255, 0.2);
    animation: titleShine 4s linear infinite;
  }

  &__title-bracket {
    font-size: 28px;
    font-weight: 400;
    opacity: 0.7;
  }

  &__time {
    position: absolute;
    right: $spacing-xxl;
    top: 50%;
    transform: translateY(-50%);
    font-size: $font-size-lg;
    font-weight: 500;
    color: $accent-blue;
    font-variant-numeric: tabular-nums;
    letter-spacing: 2px;
    text-shadow: 0 0 10px rgba(0, 240, 255, 0.5);
    font-family: "Cascadia Code", "Fira Code", "Consolas", monospace;
  }

  &__body {
    width: 100%;
    height: calc(100% - 80px);
    padding: $spacing-lg $spacing-xl;
    position: relative;
    z-index: 1;
  }
}

// =============================================
// 头部左右装饰线
// =============================================
.header-deco {
  display: flex;
  align-items: center;
  gap: 8px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);

  &--left {
    left: 60px;
  }

  &--right {
    right: 200px;

    .header-deco__dot,
    .header-deco__line { /* stylelint-disable-line no-descending-specificity */
      // Reverse order via flex row-reverse in template or just let gap handle
    }
  }

  &__line {
    display: block;
    width: 80px;
    height: 1px;
    background: linear-gradient(90deg, $accent-blue, transparent);
    box-shadow: 0 0 4px rgba(0, 240, 255, 0.4);

    &--short {
      width: 30px;
    }
  }

  &__dot {
    display: block;
    width: 6px;
    height: 6px;
    background: $accent-blue;
    border-radius: 50%;
    box-shadow: 0 0 8px rgba(0, 240, 255, 0.8), 0 0 16px rgba(0, 240, 255, 0.4);
  }
}

// 右侧装饰线方向反转
.header-deco--right {
  flex-direction: row-reverse;

  .header-deco__line {
    background: linear-gradient(270deg, $accent-blue, transparent);
  }
}

// =============================================
// 标题渐变动画
// =============================================
@keyframes titleShine {
  0% {
    background-position: 0% center;
  }
  100% {
    background-position: 200% center;
  }
}
</style>