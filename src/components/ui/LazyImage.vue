<template>
  <OptimizedImage
    :src="src"
    :alt="alt"
    :width="width ? parseInt(width) : undefined"
    :height="height ? parseInt(height) : undefined"
    :quality="quality"
    :format="format"
    :lazy="lazy"
    :placeholder="placeholder"
    :placeholder-text="placeholderText"
    :className="imageClass"
    :container-class="containerClass"
    :responsive="responsive"
    :sizes="sizes"
    :clickable="clickable"
    @load="handleImageLoad"
    @error="handleImageError"
    @click="handleImageClick"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import OptimizedImage from './OptimizedImage.vue'

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
  quality?: number
  format?: 'webp' | 'avif' | 'original' | 'auto'
  lazy?: boolean
  placeholder?: string
  placeholderText?: string
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
}

const props = withDefaults(defineProps<Props>(), {
  imageClass: '',
  imageStyle: () => ({}),
  skeletonColor: '#374151',
  threshold: 0.1,
  rootMargin: '50px',
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

const handleImageLoad = () => {
  emit('load')
}

const handleImageError = (error: Error) => {
  emit('error', error)
}

const handleImageClick = () => {
  emit('click')
}
</script>

<!-- Styles are handled by OptimizedImage component -->