<template>
  <div
    class="optimized-image-container"
    :class="containerClass"
    :style="containerStyle"
  >
    <!-- Picture element for format support -->
    <picture v-if="showPictureElement">
      <!-- AVIF format -->
      <source
        v-if="isAVIFSupported && format !== 'original'"
        :srcset="avifSrcset"
        :sizes="sizes"
        type="image/avif"
      />

      <!-- WebP format -->
      <source
        v-if="isWebPSupported && format !== 'original'"
        :srcset="webpSrcset"
        :sizes="sizes"
        type="image/webp"
      />

      <!-- Fallback image -->
      <img
        ref="imageRef"
        :src="fallbackSrc"
        :srcset="fallbackSrcset"
        :sizes="sizes"
        :alt="alt"
        :loading="loading as 'lazy' | 'eager' | undefined"
        :class="imageClass"
        :style="imageStyle"
        @load="handleImageLoad"
        @error="handleImageError"
        @click="handleImageClick"
      />
    </picture>

    <!-- Simple img element for non-responsive images -->
    <img
      v-else
      ref="imageRef"
      :src="fallbackSrc"
      :alt="alt"
              :loading="loading as 'lazy' | 'eager' | undefined"
      :class="imageClass"
      :style="imageStyle"
      @load="handleImageLoad"
      @error="handleImageError"
      @click="handleImageClick"
    />

    <!-- Loading placeholder -->
    <div
      v-if="showPlaceholder"
      class="image-placeholder"
      :class="{ 'placeholder-hidden': imageLoaded }"
    >
      <div class="placeholder-content">
        <div class="placeholder-spinner"></div>
        <span v-if="placeholderText" class="placeholder-text">{{ placeholderText }}</span>
      </div>
    </div>

    <!-- Error state -->
    <div
      v-if="hasError"
      class="image-error"
    >
      <svg class="error-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>
      </svg>
      <span class="error-text">Failed to load image</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useImageOptimization, type OptimizedImageOptions } from '@/utils/imageOptimizer'

interface Props {
  src: string
  alt: string
  width?: number
  height?: number
  quality?: number
  format?: 'webp' | 'avif' | 'original' | 'auto'
  lazy?: boolean
  placeholder?: string
  placeholderText?: string
  className?: string
  containerClass?: string
  responsive?: boolean
  sizes?: {
    sm?: number
    md?: number
    lg?: number
    xl?: number
    '2xl'?: number
  }
  clickable?: boolean
  onLoad?: () => void
  onError?: (error: Error) => void
  onClick?: () => void
}

const props = withDefaults(defineProps<Props>(), {
  quality: 85,
  format: 'auto',
  lazy: true,
  responsive: true,
  clickable: false,
  placeholderText: 'Loading...'
})

const emit = defineEmits<{
  load: []
  error: [error: Error]
  click: []
}>()

const imageRef = ref<HTMLImageElement>()
const imageLoaded = ref(false)
const hasError = ref(false)
const showPlaceholder = ref(true)

const { isWebPSupported, isAVIFSupported, optimizeImage } = useImageOptimization()

// Computed properties
const optimalFormat = computed(() => {
  if (props.format === 'auto') {
    if (isAVIFSupported) return 'avif'
    if (isWebPSupported) return 'webp'
    return 'original'
  }
  return props.format
})

const showPictureElement = computed(() => {
  return props.responsive && optimalFormat.value !== 'original'
})

const containerClass = computed(() => {
  const classes = ['optimized-image-container']
  if (props.containerClass) classes.push(props.containerClass)
  if (props.clickable) classes.push('clickable')
  return classes.join(' ')
})

const imageClass = computed(() => {
  const classes = ['optimized-image']
  if (props.className) classes.push(props.className)
  if (imageLoaded.value) classes.push('loaded')
  return classes.join(' ')
})

const containerStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.width) style.width = `${props.width}px`
  if (props.height) style.height = `${props.height}px`
  return style
})

const imageStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.width) style.width = '100%'
  if (props.height) style.height = '100%'
  return style
})

// Generate optimized image data
const optimizedData = computed(() => {
  return optimizeImage({
    src: props.src,
    alt: props.alt,
    sizes: props.sizes,
    quality: props.quality,
    format: optimalFormat.value,
    lazy: props.lazy,
    placeholder: props.placeholder,
    className: props.className || ''
  })
})

const fallbackSrc = computed(() => optimizedData.value.src)
const fallbackSrcset = computed(() => optimizedData.value.srcset)
const sizes = computed(() => optimizedData.value.sizes)
const loading = computed(() => optimizedData.value.loading)

// Generate format-specific srcsets
const webpSrcset = computed(() => {
  if (!props.responsive || !isWebPSupported) return ''
  return optimizeImage({
    src: props.src,
    alt: props.alt,
    sizes: props.sizes,
    quality: props.quality,
    format: 'webp',
    lazy: props.lazy
  }).srcset
})

const avifSrcset = computed(() => {
  if (!props.responsive || !isAVIFSupported) return ''
  return optimizeImage({
    src: props.src,
    alt: props.alt,
    sizes: props.sizes,
    quality: props.quality,
    format: 'avif',
    lazy: props.lazy
  }).srcset
})

// Event handlers
const handleImageLoad = () => {
  imageLoaded.value = true
  showPlaceholder.value = false
  hasError.value = false
  emit('load')
  props.onLoad?.()
}

const handleImageError = (event: Event) => {
  hasError.value = true
  showPlaceholder.value = false
  const error = new Error(`Failed to load image: ${props.src}`)
  emit('error', error)
  props.onError?.(error)
}

const handleImageClick = () => {
  if (props.clickable) {
    emit('click')
    props.onClick?.()
  }
}

// Watch for src changes
watch(() => props.src, () => {
  imageLoaded.value = false
  hasError.value = false
  showPlaceholder.value = true
})

onMounted(() => {
  // Hide placeholder after a delay if image loads quickly
  setTimeout(() => {
    if (!imageLoaded.value && !hasError.value) {
      showPlaceholder.value = true
    }
  }, 100)
})
</script>

<style scoped>
.optimized-image-container {
  position: relative;
  display: inline-block;
  overflow: hidden;
  border-radius: 8px;
  background: #f3f4f6;
}

.optimized-image-container.clickable {
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}

.optimized-image-container.clickable:hover {
  transform: scale(1.02);
}

.optimized-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.3s ease-in-out;
  opacity: 0;
}

.optimized-image.loaded {
  opacity: 1;
}

.optimized-image-container picture {
  display: block;
  width: 100%;
  height: 100%;
}

.optimized-image-container picture img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
  transition: opacity 0.3s ease-in-out;
}

.placeholder-hidden {
  opacity: 0;
  pointer-events: none;
}

.placeholder-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.placeholder-spinner {
  width: 24px;
  height: 24px;
  border: 2px solid #d1d5db;
  border-top: 2px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.placeholder-text {
  font-size: 12px;
  color: #6b7280;
  font-weight: 500;
}

.image-error {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 8px;
  gap: 8px;
}

.error-icon {
  width: 24px;
  height: 24px;
  color: #dc2626;
}

.error-text {
  font-size: 12px;
  color: #dc2626;
  font-weight: 500;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Responsive design */
@media (max-width: 640px) {
  .optimized-image-container {
    border-radius: 6px;
  }

  .placeholder-text {
    font-size: 11px;
  }
}
</style>