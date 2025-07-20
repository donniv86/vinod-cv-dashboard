/**
 * Composable for managing skeleton loading states
 * Provides utilities for showing/hiding skeleton loaders with smooth transitions
 *
 * @author Dr. Vinod Devaraji CV Dashboard
 * @copyright 2024 Dr. Vinod Devaraji
 */

import { ref, computed, watch, nextTick } from 'vue'

export interface SkeletonLoadingOptions {
  delay?: number
  minDuration?: number
  fadeInDuration?: number
  fadeOutDuration?: number
  showOnError?: boolean
  retryOnError?: boolean
  maxRetries?: number
}

export interface SkeletonState {
  isLoading: boolean
  isVisible: boolean
  error: string | null
  retryCount: number
  startTime: number | null
}

export function useSkeletonLoading(options: SkeletonLoadingOptions = {}) {
  const {
    delay = 0,
    minDuration = 300,
    fadeInDuration = 200,
    fadeOutDuration = 150,
    showOnError = false,
    retryOnError = false,
    maxRetries = 3
  } = options

  // Reactive state
  const isLoading = ref(false)
  const isVisible = ref(false)
  const error = ref<string | null>(null)
  const retryCount = ref(0)
  const startTime = ref<number | null>(null)
  const timeoutId = ref<number | null>(null)

  // Computed properties
  const skeletonState = computed<SkeletonState>(() => ({
    isLoading: isLoading.value,
    isVisible: isVisible.value,
    error: error.value,
    retryCount: retryCount.value,
    startTime: startTime.value
  }))

  const shouldShowSkeleton = computed(() => {
    return isLoading.value || (showOnError && error.value)
  })

  const canRetry = computed(() => {
    return retryOnError && retryCount.value < maxRetries
  })

  // Methods
  const startLoading = () => {
    error.value = null
    startTime.value = Date.now()

    if (delay > 0) {
      timeoutId.value = window.setTimeout(() => {
        isLoading.value = true
        isVisible.value = true
      }, delay)
    } else {
      isLoading.value = true
      isVisible.value = true
    }
  }

  const stopLoading = async () => {
    const elapsed = startTime.value ? Date.now() - startTime.value : 0
    const remainingTime = Math.max(0, minDuration - elapsed)

    if (remainingTime > 0) {
      await new Promise(resolve => setTimeout(resolve, remainingTime))
    }

    isLoading.value = false

    // Fade out skeleton
    setTimeout(() => {
      isVisible.value = false
    }, fadeOutDuration)

    startTime.value = null
  }

  const setError = (errorMessage: string) => {
    error.value = errorMessage
    isLoading.value = false

    if (showOnError) {
      isVisible.value = true
    } else {
      setTimeout(() => {
        isVisible.value = false
      }, fadeOutDuration)
    }
  }

  const retry = () => {
    if (!canRetry.value) return

    retryCount.value++
    error.value = null
    startLoading()
  }

  const reset = () => {
    isLoading.value = false
    isVisible.value = false
    error.value = null
    retryCount.value = 0
    startTime.value = null

    if (timeoutId.value) {
      clearTimeout(timeoutId.value)
      timeoutId.value = null
    }
  }

  const withSkeleton = async <T>(
    asyncFn: () => Promise<T>,
    options?: Partial<SkeletonLoadingOptions>
  ): Promise<T> => {
    const mergedOptions = { ...options, ...options }

    try {
      startLoading()
      const result = await asyncFn()
      await stopLoading()
      return result
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred'
      setError(errorMessage)
      throw err
    }
  }

  // Batch loading for multiple operations
  const batchLoading = async <T>(
    operations: Array<() => Promise<T>>,
    options?: Partial<SkeletonLoadingOptions>
  ): Promise<T[]> => {
    const mergedOptions = { ...options, ...options }

    try {
      startLoading()
      const results = await Promise.all(operations.map(op => op()))
      await stopLoading()
      return results
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred'
      setError(errorMessage)
      throw err
    }
  }

  // Sequential loading for operations that depend on each other
  const sequentialLoading = async <T>(
    operations: Array<() => Promise<T>>,
    options?: Partial<SkeletonLoadingOptions>
  ): Promise<T[]> => {
    const mergedOptions = { ...options, ...options }

    try {
      startLoading()
      const results: T[] = []

      for (const operation of operations) {
        const result = await operation()
        results.push(result)
      }

      await stopLoading()
      return results
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred'
      setError(errorMessage)
      throw err
    }
  }

  // Watch for changes and handle cleanup
  watch(isLoading, (newValue, oldValue) => {
    if (!newValue && oldValue) {
      // Loading stopped, schedule fade out
      setTimeout(() => {
        if (!isLoading.value) {
          isVisible.value = false
        }
      }, fadeOutDuration)
    }
  })

  // Cleanup on unmount
  const cleanup = () => {
    if (timeoutId.value) {
      clearTimeout(timeoutId.value)
    }
  }

  return {
    // State
    isLoading: computed(() => isLoading.value),
    isVisible: computed(() => isVisible.value),
    error: computed(() => error.value),
    retryCount: computed(() => retryCount.value),
    skeletonState,
    shouldShowSkeleton,
    canRetry,

    // Methods
    startLoading,
    stopLoading,
    setError,
    retry,
    reset,
    withSkeleton,
    batchLoading,
    sequentialLoading,
    cleanup
  }
}

// Preset configurations for common use cases
export const skeletonPresets = {
  fast: {
    delay: 0,
    minDuration: 150,
    fadeInDuration: 100,
    fadeOutDuration: 100
  },
  normal: {
    delay: 100,
    minDuration: 300,
    fadeInDuration: 200,
    fadeOutDuration: 150
  },
  slow: {
    delay: 200,
    minDuration: 500,
    fadeInDuration: 300,
    fadeOutDuration: 200
  },
  withRetry: {
    delay: 100,
    minDuration: 300,
    fadeInDuration: 200,
    fadeOutDuration: 150,
    showOnError: true,
    retryOnError: true,
    maxRetries: 3
  }
}

// Utility function to create skeleton loading with preset
export function useSkeletonPreset(preset: keyof typeof skeletonPresets) {
  return useSkeletonLoading(skeletonPresets[preset])
}