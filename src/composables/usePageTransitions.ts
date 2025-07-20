/**
 * Page Transitions Composable
 * Manages smooth page transitions and loading states
 *
 * @author Dr. Vinod Devaraji CV Dashboard
 * @copyright 2024 Dr. Vinod Devaraji
 */

import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export interface TransitionConfig {
  name: string
  duration: number
  easing: string
  enterActiveClass?: string
  leaveActiveClass?: string
  enterFromClass?: string
  leaveToClass?: string
}

export interface LoadingState {
  isLoading: boolean
  progress: number
  message: string
  error?: string
}

export const usePageTransitions = () => {
  const route = useRoute()
  const router = useRouter()

  // Reactive state
  const isLoading = ref(false)
  const loadingProgress = ref(0)
  const loadingMessage = ref('')
  const error = ref<string | null>(null)
  const previousRoute = ref<string | null>(null)
  const transitionDirection = ref<'forward' | 'backward'>('forward')

  // Transition configurations
  const transitions = {
    fade: {
      name: 'fade',
      duration: 300,
      easing: 'ease-in-out',
      enterActiveClass: 'fade-enter-active',
      leaveActiveClass: 'fade-leave-active',
      enterFromClass: 'fade-enter-from',
      leaveToClass: 'fade-leave-to'
    },
    slide: {
      name: 'slide',
      duration: 400,
      easing: 'ease-in-out',
      enterActiveClass: 'slide-enter-active',
      leaveActiveClass: 'slide-leave-active',
      enterFromClass: 'slide-enter-from',
      leaveToClass: 'slide-leave-to'
    },
    scale: {
      name: 'scale',
      duration: 350,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      enterActiveClass: 'scale-enter-active',
      leaveActiveClass: 'scale-leave-active',
      enterFromClass: 'scale-enter-from',
      leaveToClass: 'scale-leave-to'
    },
    flip: {
      name: 'flip',
      duration: 500,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      enterActiveClass: 'flip-enter-active',
      leaveActiveClass: 'flip-leave-active',
      enterFromClass: 'flip-enter-from',
      leaveToClass: 'flip-leave-to'
    }
  }

  // Computed properties
  const currentTransition = computed(() => {
    const routeTransition = route.meta.transition as string
    return transitions[routeTransition as keyof typeof transitions] || transitions.fade
  })

  const loadingState = computed<LoadingState>(() => ({
    isLoading: isLoading.value,
    progress: loadingProgress.value,
    message: loadingMessage.value,
    error: error.value || undefined
  }))

  // Methods
  const startLoading = (message: string = 'Loading...') => {
    isLoading.value = true
    loadingProgress.value = 0
    loadingMessage.value = message
    error.value = null
  }

  const updateProgress = (progress: number, message?: string) => {
    loadingProgress.value = Math.min(100, Math.max(0, progress))
    if (message) {
      loadingMessage.value = message
    }
  }

  const setError = (errorMessage: string) => {
    error.value = errorMessage
    isLoading.value = false
    loadingProgress.value = 0
  }

  const finishLoading = () => {
    isLoading.value = false
    loadingProgress.value = 100
    setTimeout(() => {
      loadingProgress.value = 0
      loadingMessage.value = ''
    }, 300)
  }

  const simulateLoading = async (duration: number = 1000, steps: number = 10) => {
    startLoading()
    const stepDuration = duration / steps
    const progressIncrement = 100 / steps

    for (let i = 0; i < steps; i++) {
      await new Promise(resolve => setTimeout(resolve, stepDuration))
      updateProgress((i + 1) * progressIncrement)
    }

    finishLoading()
  }

  const navigateWithTransition = async (
    to: string,
    transition: keyof typeof transitions = 'fade',
    loadingMessage?: string
  ) => {
    try {
      if (loadingMessage) {
        startLoading(loadingMessage)
      }

      // Determine transition direction
      const currentDepth = getRouteDepth(route.path)
      const targetDepth = getRouteDepth(to)
      transitionDirection.value = targetDepth > currentDepth ? 'forward' : 'backward'

      // Store previous route
      previousRoute.value = route.path

      // Navigate
      await router.push(to)

      if (loadingMessage) {
        finishLoading()
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Navigation failed')
    }
  }

  const goBack = async () => {
    if (previousRoute.value) {
      await navigateWithTransition(previousRoute.value, 'slide')
    } else {
      router.back()
    }
  }

  const getRouteDepth = (path: string): number => {
    return path.split('/').filter(segment => segment.length > 0).length
  }

  // Watch for route changes
  watch(() => route.path, (newPath, oldPath) => {
    if (oldPath && newPath !== oldPath) {
      // Auto-detect transition direction
      const oldDepth = getRouteDepth(oldPath)
      const newDepth = getRouteDepth(newPath)
      transitionDirection.value = newDepth > oldDepth ? 'forward' : 'backward'
    }
  })

  return {
    // State
    isLoading: computed(() => isLoading.value),
    loadingProgress: computed(() => loadingProgress.value),
    loadingMessage: computed(() => loadingMessage.value),
    error: computed(() => error.value),
    transitionDirection: computed(() => transitionDirection.value),
    previousRoute: computed(() => previousRoute.value),

    // Computed
    currentTransition,
    loadingState,

    // Methods
    startLoading,
    updateProgress,
    setError,
    finishLoading,
    simulateLoading,
    navigateWithTransition,
    goBack,

    // Transitions
    transitions
  }
}