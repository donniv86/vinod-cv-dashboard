/**
 * Scroll Behavior Composable
 * Manages scroll-based interactions and behaviors
 *
 * @author Dr. Vinod Devaraji CV Dashboard
 * @copyright 2024 Dr. Vinod Devaraji
 */

import { ref, computed, onMounted, onUnmounted } from 'vue'

export interface ScrollPosition {
  x: number
  y: number
  direction: 'up' | 'down' | 'none'
  velocity: number
}

export interface ScrollThresholds {
  top: number
  bottom: number
  quarter: number
  half: number
  threeQuarters: number
}

export const useScrollBehavior = (options: {
  throttleMs?: number
  enableVelocity?: boolean
  enableDirection?: boolean
} = {}) => {
  const {
    throttleMs = 16, // ~60fps
    enableVelocity = true,
    enableDirection = true
  } = options

  // Reactive state
  const scrollPosition = ref<ScrollPosition>({
    x: 0,
    y: 0,
    direction: 'none',
    velocity: 0
  })

  const isAtTop = ref(true)
  const isAtBottom = ref(false)
  const scrollProgress = ref(0)
  const isScrolling = ref(false)

  // Previous values for calculations
  let lastScrollY = 0
  let lastScrollTime = 0
  let throttleTimeout: number | null = null

  // Computed properties
  const scrollThresholds = computed<ScrollThresholds>(() => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    return {
      top: 0,
      bottom: maxScroll,
      quarter: maxScroll * 0.25,
      half: maxScroll * 0.5,
      threeQuarters: maxScroll * 0.75
    }
  })

  const isNearTop = computed(() => scrollPosition.value.y < 100)
  const isNearBottom = computed(() => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    return scrollPosition.value.y > maxScroll - 100
  })

  const scrollPercentage = computed(() => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    return maxScroll > 0 ? Math.min(100, (scrollPosition.value.y / maxScroll) * 100) : 0
  })

  // Methods
  const handleScroll = () => {
    if (throttleTimeout) return

    throttleTimeout = window.setTimeout(() => {
      const currentTime = performance.now()
      const currentScrollY = window.scrollY
      const currentScrollX = window.scrollX

      // Calculate velocity
      let velocity = 0
      if (enableVelocity && lastScrollTime > 0) {
        const timeDelta = currentTime - lastScrollTime
        const scrollDelta = currentScrollY - lastScrollY
        velocity = timeDelta > 0 ? scrollDelta / timeDelta : 0
      }

      // Determine direction
      let direction: 'up' | 'down' | 'none' = 'none'
      if (enableDirection) {
        if (currentScrollY > lastScrollY) {
          direction = 'down'
        } else if (currentScrollY < lastScrollY) {
          direction = 'up'
        }
      }

      // Update scroll position
      scrollPosition.value = {
        x: currentScrollX,
        y: currentScrollY,
        direction,
        velocity
      }

      // Update derived state
      isAtTop.value = currentScrollY === 0
      isAtBottom.value = currentScrollY >= scrollThresholds.value.bottom
      scrollProgress.value = scrollPercentage.value

      // Update scrolling state
      isScrolling.value = Math.abs(velocity) > 0.1

      // Store values for next calculation
      lastScrollY = currentScrollY
      lastScrollTime = currentTime

      throttleTimeout = null
    }, throttleMs)
  }

  const scrollToTop = (options: {
    smooth?: boolean
    duration?: number
  } = {}) => {
    const { smooth = true, duration = 800 } = options

    if (smooth) {
      const startPosition = window.scrollY
      const startTime = performance.now()

      const easeInOutCubic = (t: number): number => {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
      }

      const animateScroll = (currentTime: number) => {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)
        const easedProgress = easeInOutCubic(progress)

        window.scrollTo(0, startPosition * (1 - easedProgress))

        if (progress < 1) {
          requestAnimationFrame(animateScroll)
        }
      }

      requestAnimationFrame(animateScroll)
    } else {
      window.scrollTo(0, 0)
    }
  }

  const scrollToBottom = (options: {
    smooth?: boolean
    duration?: number
  } = {}) => {
    const { smooth = true, duration = 800 } = options
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight

    if (smooth) {
      const startPosition = window.scrollY
      const startTime = performance.now()

      const easeInOutCubic = (t: number): number => {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
      }

      const animateScroll = (currentTime: number) => {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)
        const easedProgress = easeInOutCubic(progress)

        window.scrollTo(0, startPosition + (maxScroll - startPosition) * easedProgress)

        if (progress < 1) {
          requestAnimationFrame(animateScroll)
        }
      }

      requestAnimationFrame(animateScroll)
    } else {
      window.scrollTo(0, maxScroll)
    }
  }

  const scrollToElement = (
    element: HTMLElement | string,
    options: {
      smooth?: boolean
      duration?: number
      offset?: number
    } = {}
  ) => {
    const { smooth = true, duration = 800, offset = 0 } = options

    const targetElement = typeof element === 'string'
      ? document.querySelector(element) as HTMLElement
      : element

    if (!targetElement) return

    const targetPosition = targetElement.offsetTop - offset

    if (smooth) {
      const startPosition = window.scrollY
      const startTime = performance.now()

      const easeInOutCubic = (t: number): number => {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
      }

      const animateScroll = (currentTime: number) => {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)
        const easedProgress = easeInOutCubic(progress)

        window.scrollTo(0, startPosition + (targetPosition - startPosition) * easedProgress)

        if (progress < 1) {
          requestAnimationFrame(animateScroll)
        }
      }

      requestAnimationFrame(animateScroll)
    } else {
      window.scrollTo(0, targetPosition)
    }
  }

  const isElementInViewport = (element: HTMLElement, threshold: number = 0) => {
    const rect = element.getBoundingClientRect()
    const windowHeight = window.innerHeight

    return (
      rect.top <= windowHeight * (1 - threshold) &&
      rect.bottom >= windowHeight * threshold
    )
  }

  const getScrollDirection = () => scrollPosition.value.direction
  const getScrollVelocity = () => scrollPosition.value.velocity
  const getScrollProgress = () => scrollProgress.value

  // Lifecycle
  onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial check
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
    if (throttleTimeout) {
      clearTimeout(throttleTimeout)
    }
  })

  return {
    // State
    scrollPosition: computed(() => scrollPosition.value),
    isAtTop: computed(() => isAtTop.value),
    isAtBottom: computed(() => isAtBottom.value),
    isNearTop: computed(() => isNearTop.value),
    isNearBottom: computed(() => isNearBottom.value),
    isScrolling: computed(() => isScrolling.value),
    scrollProgress: computed(() => scrollProgress.value),
    scrollPercentage: computed(() => scrollPercentage.value),
    scrollThresholds: computed(() => scrollThresholds.value),

    // Methods
    scrollToTop,
    scrollToBottom,
    scrollToElement,
    isElementInViewport,
    getScrollDirection,
    getScrollVelocity,
    getScrollProgress
  }
}