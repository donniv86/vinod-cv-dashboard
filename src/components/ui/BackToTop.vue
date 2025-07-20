<template>
  <Transition name="back-to-top" appear>
    <button
      v-if="isVisible"
      @click="scrollToTop"
      class="back-to-top-btn"
      :class="{ 'is-scrolling': isScrolling }"
      :title="buttonTitle"
      aria-label="Back to top"
    >
      <!-- Arrow Icon -->
      <svg
        class="arrow-icon"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        :class="{ 'rotating': isScrolling }"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>

      <!-- Progress Ring (Optional) -->
      <svg
        v-if="showProgress"
        class="progress-ring"
        viewBox="0 0 36 36"
      >
        <path
          class="progress-bg"
          d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <path
          class="progress-fill"
          :stroke-dasharray="`${progress}, 100`"
          d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
        />
      </svg>

      <!-- Tooltip -->
      <div v-if="showTooltip" class="tooltip">
        {{ tooltipText }}
      </div>
    </button>
  </Transition>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

interface BackToTopProps {
  threshold?: number
  showProgress?: boolean
  showTooltip?: boolean
  smooth?: boolean
  duration?: number
  position?: 'bottom-right' | 'bottom-left' | 'center-right' | 'center-left'
  size?: 'small' | 'medium' | 'large'
  theme?: 'light' | 'dark' | 'auto'
}

const props = withDefaults(defineProps<BackToTopProps>(), {
  threshold: 300,
  showProgress: true,
  showTooltip: true,
  smooth: true,
  duration: 800,
  position: 'bottom-right',
  size: 'medium',
  theme: 'auto'
})

const emit = defineEmits<{
  'scroll-start': []
  'scroll-end': []
}>()

// Reactive state
const isVisible = ref(false)
const isScrolling = ref(false)
const scrollProgress = ref(0)
const scrollY = ref(0)

// Computed properties
const progress = computed(() => {
  if (!props.showProgress) return 0

  const maxScroll = document.documentElement.scrollHeight - window.innerHeight
  return maxScroll > 0 ? Math.min(100, (scrollY.value / maxScroll) * 100) : 0
})

const buttonTitle = computed(() => {
  return `Back to top${props.showProgress ? ` (${Math.round(progress.value)}%)` : ''}`
})

const tooltipText = computed(() => {
  return `Scroll to top${props.showProgress ? ` - ${Math.round(progress.value)}% scrolled` : ''}`
})

// Methods
const handleScroll = () => {
  scrollY.value = window.scrollY
  isVisible.value = scrollY.value > props.threshold
  scrollProgress.value = progress.value
}

const scrollToTop = () => {
  if (isScrolling.value) return

  isScrolling.value = true
  emit('scroll-start')

  if (props.smooth) {
    // Smooth scroll with easing
    const startPosition = window.scrollY
    const startTime = performance.now()

    const easeInOutCubic = (t: number): number => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
    }

    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / props.duration, 1)
      const easedProgress = easeInOutCubic(progress)

      window.scrollTo(0, startPosition * (1 - easedProgress))

      if (progress < 1) {
        requestAnimationFrame(animateScroll)
      } else {
        isScrolling.value = false
        emit('scroll-end')
      }
    }

    requestAnimationFrame(animateScroll)
  } else {
    // Instant scroll
    window.scrollTo(0, 0)
    setTimeout(() => {
      isScrolling.value = false
      emit('scroll-end')
    }, 100)
  }
}

// Keyboard navigation
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Home' && isVisible.value) {
    event.preventDefault()
    scrollToTop()
  }
}

// Lifecycle
onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('keydown', handleKeydown)
  handleScroll() // Initial check
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('keydown', handleKeydown)
})

// Expose methods
defineExpose({
  scrollToTop,
  isVisible: computed(() => isVisible.value),
  progress: computed(() => progress.value)
})
</script>

<style scoped>
.back-to-top-btn {
  position: fixed;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  overflow: hidden;
  position: relative;
}

/* Size variants */
.back-to-top-btn.size-small {
  width: 40px;
  height: 40px;
}

.back-to-top-btn.size-medium {
  width: 50px;
  height: 50px;
}

.back-to-top-btn.size-large {
  width: 60px;
  height: 60px;
}

/* Position variants */
.back-to-top-btn.position-bottom-right {
  bottom: 2rem;
  right: 2rem;
}

.back-to-top-btn.position-bottom-left {
  bottom: 2rem;
  left: 2rem;
}

.back-to-top-btn.position-center-right {
  bottom: 50%;
  right: 2rem;
  transform: translateY(50%);
}

.back-to-top-btn.position-center-left {
  bottom: 50%;
  left: 2rem;
  transform: translateY(50%);
}

/* Hover effects */
.back-to-top-btn:hover {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.25);
  background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
}

.back-to-top-btn:active {
  transform: translateY(0) scale(0.95);
}

/* Arrow icon */
.arrow-icon {
  width: 1.5rem;
  height: 1.5rem;
  transition: transform 0.3s ease;
  z-index: 2;
  position: relative;
}

.back-to-top-btn.size-small .arrow-icon {
  width: 1.25rem;
  height: 1.25rem;
}

.back-to-top-btn.size-large .arrow-icon {
  width: 1.75rem;
  height: 1.75rem;
}

.arrow-icon.rotating {
  animation: rotate 0.8s ease-in-out;
}

@keyframes rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Progress ring */
.progress-ring {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.progress-bg {
  fill: none;
  stroke: rgba(255, 255, 255, 0.2);
  stroke-width: 2;
}

.progress-fill {
  fill: none;
  stroke: rgba(255, 255, 255, 0.8);
  stroke-width: 2;
  stroke-linecap: round;
  transition: stroke-dasharray 0.3s ease;
}

/* Tooltip */
.tooltip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  border-radius: 6px;
  font-size: 0.75rem;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 4px solid transparent;
  border-top-color: rgba(0, 0, 0, 0.8);
}

.back-to-top-btn:hover .tooltip {
  opacity: 1;
}

/* Theme variants */
.back-to-top-btn.theme-light {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  color: #495057;
  border: 1px solid #dee2e6;
}

.back-to-top-btn.theme-light:hover {
  background: linear-gradient(135deg, #e9ecef 0%, #f8f9fa 100%);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.back-to-top-btn.theme-dark {
  background: linear-gradient(135deg, #343a40 0%, #495057 100%);
  color: white;
}

.back-to-top-btn.theme-dark:hover {
  background: linear-gradient(135deg, #495057 0%, #343a40 100%);
}

/* Auto theme (based on system preference) */
@media (prefers-color-scheme: light) {
  .back-to-top-btn.theme-auto {
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    color: #495057;
    border: 1px solid #dee2e6;
  }

  .back-to-top-btn.theme-auto:hover {
    background: linear-gradient(135deg, #e9ecef 0%, #f8f9fa 100%);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
}

@media (prefers-color-scheme: dark) {
  .back-to-top-btn.theme-auto {
    background: linear-gradient(135deg, #343a40 0%, #495057 100%);
    color: white;
  }

  .back-to-top-btn.theme-auto:hover {
    background: linear-gradient(135deg, #495057 0%, #343a40 100%);
  }
}

/* Transition animations */
.back-to-top-enter-active,
.back-to-top-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.back-to-top-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.8);
}

.back-to-top-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.8);
}

/* Responsive design */
@media (max-width: 768px) {
  .back-to-top-btn.position-bottom-right,
  .back-to-top-btn.position-bottom-left {
    bottom: 1rem;
  }

  .back-to-top-btn.position-bottom-right {
    right: 1rem;
  }

  .back-to-top-btn.position-bottom-left {
    left: 1rem;
  }

  .back-to-top-btn.position-center-right,
  .back-to-top-btn.position-center-left {
    bottom: 1rem;
    transform: none;
  }

  .back-to-top-btn.position-center-right {
    right: 1rem;
  }

  .back-to-top-btn.position-center-left {
    left: 1rem;
  }

  .tooltip {
    display: none;
  }
}

@media (max-width: 480px) {
  .back-to-top-btn {
    width: 45px;
    height: 45px;
  }

  .arrow-icon {
    width: 1.25rem;
    height: 1.25rem;
  }
}

/* Focus styles for accessibility */
.back-to-top-btn:focus {
  outline: 2px solid rgba(255, 255, 255, 0.5);
  outline-offset: 2px;
}

.back-to-top-btn.theme-light:focus,
.back-to-top-btn.theme-auto:focus {
  outline-color: rgba(0, 0, 0, 0.5);
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .back-to-top-btn {
    border: 2px solid currentColor;
  }

  .progress-bg {
    stroke: currentColor;
    opacity: 0.3;
  }

  .progress-fill {
    stroke: currentColor;
    opacity: 0.8;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .back-to-top-btn,
  .arrow-icon,
  .progress-fill,
  .tooltip {
    transition: none;
  }

  .arrow-icon.rotating {
    animation: none;
  }

  .back-to-top-enter-active,
  .back-to-top-leave-active {
    transition: opacity 0.1s ease;
  }

  .back-to-top-enter-from,
  .back-to-top-leave-to {
    transform: none;
  }
}
</style>