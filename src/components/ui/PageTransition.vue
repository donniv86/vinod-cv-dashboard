<template>
  <Transition
    :name="transitionName"
    :mode="transitionMode"
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter"
    @before-leave="beforeLeave"
    @leave="leave"
    @after-leave="afterLeave"
  >
    <div
      :key="routeKey"
      class="page-transition-wrapper"
      :class="transitionClasses"
    >
      <slot />
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

interface PageTransitionProps {
  name?: string
  mode?: 'in-out' | 'out-in'
  duration?: number
  direction?: 'forward' | 'backward'
}

const props = withDefaults(defineProps<PageTransitionProps>(), {
  name: 'fade',
  mode: 'out-in',
  duration: 300,
  direction: 'forward'
})

const emit = defineEmits<{
  'before-enter': []
  'enter': []
  'after-enter': []
  'before-leave': []
  'leave': []
  'after-leave': []
}>()

const route = useRoute()
const routeKey = ref(route.path)

// Computed properties
const transitionName = computed(() => {
  const routeTransition = route.meta.transition as string
  return routeTransition || props.name
})

const transitionMode = computed(() => {
  const routeMode = route.meta.transitionMode as string
  return (routeMode as 'in-out' | 'out-in') || props.mode
})

const transitionClasses = computed(() => {
  return {
    [`transition-${transitionName.value}`]: true,
    [`direction-${props.direction}`]: true
  }
})

// Transition hooks
const beforeEnter = () => {
  emit('before-enter')
}

const enter = () => {
  emit('enter')
}

const afterEnter = () => {
  emit('after-enter')
}

const beforeLeave = () => {
  emit('before-leave')
}

const leave = () => {
  emit('leave')
}

const afterLeave = () => {
  emit('after-leave')
}

// Watch for route changes
watch(() => route.path, (newPath) => {
  routeKey.value = newPath
})
</script>

<style scoped>
.page-transition-wrapper {
  width: 100%;
  min-height: 100vh;
}

/* Fade transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Slide transitions */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.4s ease-in-out;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

.slide-enter-from.direction-backward {
  transform: translateX(-100%);
}

.slide-leave-to.direction-backward {
  transform: translateX(100%);
}

/* Scale transitions */
.scale-enter-active,
.scale-leave-active {
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

/* Flip transitions */
.flip-enter-active,
.flip-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
}

.flip-enter-from {
  opacity: 0;
  transform: rotateY(-90deg);
}

.flip-leave-to {
  opacity: 0;
  transform: rotateY(90deg);
}

/* Slide up transitions */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.4s ease-in-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(50px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-50px);
}

/* Zoom transitions */
.zoom-enter-active,
.zoom-leave-active {
  transition: all 0.3s ease-in-out;
}

.zoom-enter-from,
.zoom-leave-to {
  opacity: 0;
  transform: scale(1.1);
}

/* Custom transition for specific routes */
.transition-publications-enter-active,
.transition-publications-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.transition-publications-enter-from {
  opacity: 0;
  transform: translateY(30px) scale(0.98);
}

.transition-publications-leave-to {
  opacity: 0;
  transform: translateY(-30px) scale(0.98);
}

.transition-github-enter-active,
.transition-github-leave-active {
  transition: all 0.4s ease-in-out;
}

.transition-github-enter-from {
  opacity: 0;
  transform: translateX(-50px) rotateY(-15deg);
}

.transition-github-leave-to {
  opacity: 0;
  transform: translateX(50px) rotateY(15deg);
}

.transition-certifications-enter-active,
.transition-certifications-leave-active {
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.transition-certifications-enter-from {
  opacity: 0;
  transform: translateY(100px) scale(0.9);
}

.transition-certifications-leave-to {
  opacity: 0;
  transform: translateY(-100px) scale(0.9);
}

.transition-about-enter-active,
.transition-about-leave-active {
  transition: all 0.4s ease-in-out;
}

.transition-about-enter-from {
  opacity: 0;
  transform: translateX(100px) skewX(-5deg);
}

.transition-about-leave-to {
  opacity: 0;
  transform: translateX(-100px) skewX(5deg);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .slide-enter-from,
  .slide-leave-to {
    transform: translateY(100%);
  }

  .slide-enter-from.direction-backward,
  .slide-leave-to.direction-backward {
    transform: translateY(-100%);
  }

  .flip-enter-from,
  .flip-leave-to {
    transform: rotateX(-90deg);
  }
}

/* Performance optimizations */
.page-transition-wrapper {
  will-change: transform, opacity;
  backface-visibility: hidden;
  perspective: 1000px;
}

/* Reduce motion for users who prefer it */
@media (prefers-reduced-motion: reduce) {
  .page-transition-wrapper *,
  .page-transition-wrapper *::before,
  .page-transition-wrapper *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>