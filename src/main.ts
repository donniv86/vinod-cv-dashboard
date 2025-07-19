import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

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

// Load heavy libraries in the background
loadHeavyLibraries()
