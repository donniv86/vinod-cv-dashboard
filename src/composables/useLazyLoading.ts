/**
 * Lazy Loading Composable
 * Provides lazy loading functionality for images and components using Intersection Observer
 *
 * @author Dr. Vinod Devaraji CV Dashboard
 * @copyright 2024 Dr. Vinod Devaraji
 */

import { ref, onMounted, onUnmounted } from 'vue'

export interface LazyLoadingOptions {
  root?: Element | null
  rootMargin?: string
  threshold?: number | number[]
}

export function useLazyLoading(options: LazyLoadingOptions = {}) {
  const isVisible = ref(false)
  const isLoaded = ref(false)
  const elementRef = ref<HTMLElement | null>(null)
  let observer: IntersectionObserver | null = null

  const defaultOptions: LazyLoadingOptions = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1,
    ...options
  }

  const startObserving = () => {
    if (!elementRef.value || observer) return

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isVisible.value = true
            observer?.disconnect()
          }
        })
      },
      defaultOptions
    )

    observer.observe(elementRef.value)
  }

  const stopObserving = () => {
    if (observer) {
      observer.disconnect()
      observer = null
    }
  }

  onMounted(() => {
    startObserving()
  })

  onUnmounted(() => {
    stopObserving()
  })

  return {
    isVisible,
    isLoaded,
    elementRef,
    startObserving,
    stopObserving
  }
}