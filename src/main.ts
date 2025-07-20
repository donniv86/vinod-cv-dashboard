import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { serviceWorkerManager } from './utils/serviceWorker'
import { assetCache } from './utils/assetCache'
import { cssOptimizer } from './utils/cssOptimizer'

const app = createApp(App)

app.use(router)

// Register service worker for offline functionality
if (import.meta.env.PROD) {
  serviceWorkerManager.register()
    .then((registration) => {
      if (registration) {
        console.log('Service Worker registered successfully')
      }
    })
    .catch((error) => {
      console.error('Service Worker registration failed:', error)
    })
}

// Initialize caching system
const initializeCaching = async () => {
  try {
    // Preload critical assets
    await assetCache.preloadCriticalAssets()
    console.log('Caching system initialized')
  } catch (error) {
    console.warn('Failed to initialize caching system:', error)
  }
}

// Initialize CSS optimization
const initializeCSSOptimization = async () => {
  if (import.meta.env.PROD) {
    try {
      // Extract and inline critical CSS in production
      const html = document.documentElement.outerHTML
      const css = Array.from(document.styleSheets)
        .map(sheet => {
          try {
            return Array.from(sheet.cssRules || sheet.rules)
              .map(rule => rule.cssText)
              .join('\n')
          } catch (e) {
            return ''
          }
        })
        .join('\n')

      const result = await cssOptimizer.extractCriticalCSS(html, css)

      // Inline critical CSS
      const styleElement = document.createElement('style')
      styleElement.textContent = result.critical
      styleElement.setAttribute('data-critical', 'true')
      document.head.insertBefore(styleElement, document.head.firstChild)

      console.log('Critical CSS inlined:', result.size)
    } catch (error) {
      console.warn('Failed to extract critical CSS:', error)
    }
  }
}

// Lazy load heavy libraries only when needed
const loadHeavyLibraries = async () => {
  try {
    // Load ApexCharts only when charts are used
    const { default: VueApexCharts } = await import('vue3-apexcharts')
    app.use(VueApexCharts)
  } catch (error) {
    console.warn('Failed to load ApexCharts:', error)
  }
}

// Load heavy libraries after app is mounted
app.mount('#app')

// Initialize systems in the background
Promise.all([
  loadHeavyLibraries(),
  initializeCaching(),
  initializeCSSOptimization()
]).catch(error => {
  console.warn('Background initialization failed:', error)
})
