/**
 * Dynamic Import Utilities
 * Provides utilities for lazy loading components and libraries
 *
 * @author Dr. Vinod Devaraji CV Dashboard
 * @copyright 2024 Dr. Vinod Devaraji
 */

// Dynamic imports for heavy libraries
export const loadApexCharts = () => import('apexcharts')
export const loadVueApexCharts = () => import('vue3-apexcharts')

// Dynamic imports for FullCalendar components
export const loadFullCalendar = () => import('@fullcalendar/core')
export const loadFullCalendarDayGrid = () => import('@fullcalendar/daygrid')
export const loadFullCalendarInteraction = () => import('@fullcalendar/interaction')
export const loadFullCalendarList = () => import('@fullcalendar/list')
export const loadFullCalendarTimeGrid = () => import('@fullcalendar/timegrid')
export const loadFullCalendarVue = () => import('@fullcalendar/vue3')

// Dynamic imports for utility libraries
export const loadFlatpickr = () => import('flatpickr')
export const loadVueFlatpickr = () => import('vue-flatpickr-component')
export const loadSwiper = () => import('swiper')
export const loadJsVectorMap = () => import('jsvectormap')
export const loadVueVectorMap = () => import('vuevectormap')

// Dynamic imports for UI components
export const loadDropzone = () => import('dropzone')
export const loadVueKanban = () => import('vue-kanban')
export const loadVueDraggable = () => import('vuedraggable')

// Utility function to load multiple modules
export const loadModules = async (modules: (() => Promise<any>)[]) => {
  try {
    const results = await Promise.all(modules.map(module => module()))
    return results
  } catch (error) {
    console.error('Failed to load modules:', error)
    throw error
  }
}

// Utility function to load modules with fallback
export const loadModulesWithFallback = async (
  modules: (() => Promise<any>)[],
  fallback?: () => void
) => {
  try {
    return await loadModules(modules)
  } catch (error) {
    if (fallback) {
      fallback()
    }
    throw error
  }
}