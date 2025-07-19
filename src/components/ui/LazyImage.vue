<template>
  <div
    ref="elementRef"
    class="lazy-image-container"
    :class="{ 'lazy-image-loaded': isLoaded }"
  >
    <!-- Skeleton placeholder -->
    <div
      v-if="!isVisible"
      class="lazy-image-skeleton"
      :style="{
        width: width || '100%',
        height: height || '200px',
        backgroundColor: skeletonColor || '#374151'
      }"
    >
      <div class="lazy-image-skeleton-shimmer"></div>
    </div>

    <!-- Actual image -->
    <img
      v-show="isVisible"
      :src="isVisible ? src : ''"
      :alt="alt"
      :class="imageClass"
      :style="imageStyle"
      @load="handleImageLoad"
      @error="handleImageError"
      loading="lazy"
    />

    <!-- Error fallback -->
    <div
      v-if="showError"
      class="lazy-image-error"
      :style="{
        width: width || '100%',
        height: height || '200px'
      }"
    >
      <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
      </svg>
      <span class="text-sm text-gray-500 mt-2">Image failed to load</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useLazyLoading } from '../../composables/useLazyLoading'

interface Props {
  src: string
  alt: string
  width?: string
  height?: string
  imageClass?: string
  imageStyle?: Record<string, string>
  skeletonColor?: string
  threshold?: number
  rootMargin?: string
}

const props = withDefaults(defineProps<Props>(), {
  imageClass: '',
  imageStyle: () => ({}),
  skeletonColor: '#374151',
  threshold: 0.1,
  rootMargin: '50px'
})

const showError = ref(false)

const { isVisible, isLoaded, elementRef } = useLazyLoading({
  threshold: props.threshold,
  rootMargin: props.rootMargin
})

const handleImageLoad = () => {
  isLoaded.value = true
  showError.value = false
}

const handleImageError = () => {
  showError.value = true
  isLoaded.value = false
}
</script>

<style scoped>
.lazy-image-container {
  position: relative;
  overflow: hidden;
}

.lazy-image-skeleton {
  position: relative;
  border-radius: 0.5rem;
  overflow: hidden;
}

.lazy-image-skeleton-shimmer {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.1),
    transparent
  );
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}

.lazy-image-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #1f2937;
  border: 1px solid #374151;
  border-radius: 0.5rem;
  color: #9ca3af;
}

.lazy-image-loaded img {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>