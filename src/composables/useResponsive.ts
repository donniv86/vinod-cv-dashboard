/**
 * Responsive Design Composable
 * Provides reactive breakpoint information and responsive utilities
 */

import { ref, computed, onMounted, onUnmounted } from 'vue'

export interface BreakpointInfo {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  isLargeDesktop: boolean
  isExtraLargeDesktop: boolean
  width: number
  height: number
  orientation: 'portrait' | 'landscape'
  pixelRatio: number
  isTouch: boolean
  isHighDPI: boolean
  isReducedMotion: boolean
  isHighContrast: boolean
}

export interface BreakpointConfig {
  mobile: number
  tablet: number
  desktop: number
  largeDesktop: number
  extraLargeDesktop: number
}

const defaultConfig: BreakpointConfig = {
  mobile: 640,
  tablet: 768,
  desktop: 1024,
  largeDesktop: 1280,
  extraLargeDesktop: 1536
}

export function useResponsive(config: BreakpointConfig = defaultConfig) {
  const width = ref(0)
  const height = ref(0)
  const pixelRatio = ref(1)
  const isTouch = ref(false)
  const isReducedMotion = ref(false)
  const isHighContrast = ref(false)

  // Update dimensions and device info
  const updateDimensions = () => {
    width.value = window.innerWidth
    height.value = window.innerHeight
    pixelRatio.value = window.devicePixelRatio || 1
    isTouch.value = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    isReducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    isHighContrast.value = window.matchMedia('(prefers-contrast: high)').matches
  }

  // Computed breakpoint information
  const breakpoint = computed<BreakpointInfo>(() => {
    const w = width.value
    const h = height.value

    return {
      isMobile: w < config.mobile,
      isTablet: w >= config.mobile && w < config.tablet,
      isDesktop: w >= config.tablet && w < config.desktop,
      isLargeDesktop: w >= config.desktop && w < config.largeDesktop,
      isExtraLargeDesktop: w >= config.largeDesktop,
      width: w,
      height: h,
      orientation: w > h ? 'landscape' : 'portrait',
      pixelRatio: pixelRatio.value,
      isTouch: isTouch.value,
      isHighDPI: pixelRatio.value >= 2,
      isReducedMotion: isReducedMotion.value,
      isHighContrast: isHighContrast.value
    }
  })

  // Responsive utilities
  const isMobile = computed(() => breakpoint.value.isMobile)
  const isTablet = computed(() => breakpoint.value.isTablet)
  const isDesktop = computed(() => breakpoint.value.isDesktop)
  const isLargeDesktop = computed(() => breakpoint.value.isLargeDesktop)
  const isExtraLargeDesktop = computed(() => breakpoint.value.isExtraLargeDesktop)

  // Orientation utilities
  const isPortrait = computed(() => breakpoint.value.orientation === 'portrait')
  const isLandscape = computed(() => breakpoint.value.orientation === 'landscape')

  // Device utilities
  const isTouchDevice = computed(() => breakpoint.value.isTouch)
  const isHighDPIDevice = computed(() => breakpoint.value.isHighDPI)

  // Accessibility utilities
  const prefersReducedMotion = computed(() => breakpoint.value.isReducedMotion)
  const prefersHighContrast = computed(() => breakpoint.value.isHighContrast)

  // Responsive class utilities
  const responsiveClasses = computed(() => ({
    'mobile-only': isMobile.value,
    'tablet-only': isTablet.value,
    'desktop-only': isDesktop.value,
    'large-desktop-only': isLargeDesktop.value,
    'extra-large-desktop-only': isExtraLargeDesktop.value,
    'touch-device': isTouchDevice.value,
    'high-dpi': isHighDPIDevice.value,
    'reduced-motion': prefersReducedMotion.value,
    'high-contrast': prefersHighContrast.value,
    'portrait': isPortrait.value,
    'landscape': isLandscape.value
  }))

  // Media query utilities
  const matchesMediaQuery = (query: string) => {
    return window.matchMedia(query).matches
  }

  // Responsive image utilities
  const getResponsiveImageSize = (baseSize: number) => {
    if (isExtraLargeDesktop.value) return baseSize * 1.5
    if (isLargeDesktop.value) return baseSize * 1.25
    if (isDesktop.value) return baseSize
    if (isTablet.value) return baseSize * 0.75
    return baseSize * 0.5
  }

  // Responsive spacing utilities
  const getResponsiveSpacing = (baseSpacing: number) => {
    if (isExtraLargeDesktop.value) return baseSpacing * 1.5
    if (isLargeDesktop.value) return baseSpacing * 1.25
    if (isDesktop.value) return baseSpacing
    if (isTablet.value) return baseSpacing * 0.75
    return baseSpacing * 0.5
  }

  // Initialize
  onMounted(() => {
    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    window.addEventListener('orientationchange', updateDimensions)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', updateDimensions)
    window.removeEventListener('orientationchange', updateDimensions)
  })

  return {
    // Reactive state
    width,
    height,
    breakpoint,

    // Computed breakpoints
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop,
    isExtraLargeDesktop,

    // Orientation
    isPortrait,
    isLandscape,

    // Device capabilities
    isTouchDevice,
    isHighDPIDevice,

    // Accessibility
    prefersReducedMotion,
    prefersHighContrast,

    // Utilities
    responsiveClasses,
    matchesMediaQuery,
    getResponsiveImageSize,
    getResponsiveSpacing,

    // Configuration
    config
  }
}

// Export default instance
export const useResponsiveDefault = () => useResponsive()