<template>
  <div class="critical-css-manager">
    <div class="stats-panel">
      <h3>CSS Optimization Stats</h3>
      <div class="stats-grid">
        <div class="stat-item">
          <span class="stat-label">Original Size:</span>
          <span class="stat-value">{{ formatBytes(stats.original) }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Critical Size:</span>
          <span class="stat-value">{{ formatBytes(stats.critical) }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Savings:</span>
          <span class="stat-value savings">{{ formatBytes(stats.savings) }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Rules:</span>
          <span class="stat-value">{{ stats.rules }}</span>
        </div>
      </div>
    </div>

    <div class="controls-panel">
      <h3>CSS Optimization Controls</h3>
      <div class="control-group">
        <label class="control-label">
          <input
            type="checkbox"
            v-model="config.inline"
            @change="updateConfig"
          >
          Inline Critical CSS
        </label>
        <label class="control-label">
          <input
            type="checkbox"
            v-model="config.minify"
            @change="updateConfig"
          >
          Minify CSS
        </label>
        <label class="control-label">
          <input
            type="checkbox"
            v-model="config.preserveMediaQueries"
            @change="updateConfig"
          >
          Preserve Media Queries
        </label>
      </div>

      <div class="action-buttons">
        <button
          @click="extractCriticalCSS"
          :disabled="isProcessing"
          class="btn btn-primary"
        >
          {{ isProcessing ? 'Processing...' : 'Extract Critical CSS' }}
        </button>
        <button
          @click="loadNonCriticalCSS"
          class="btn btn-secondary"
        >
          Load Non-Critical CSS
        </button>
        <button
          @click="clearCriticalCSS"
          class="btn btn-danger"
        >
          Clear Critical CSS
        </button>
      </div>
    </div>

    <div class="preview-panel" v-if="criticalCSS">
      <h3>Critical CSS Preview</h3>
      <div class="css-preview">
        <pre><code>{{ criticalCSS }}</code></pre>
      </div>
      <div class="preview-actions">
        <button @click="copyCriticalCSS" class="btn btn-sm">
          Copy CSS
        </button>
        <button @click="downloadCriticalCSS" class="btn btn-sm">
          Download
        </button>
      </div>
    </div>

    <div class="performance-panel">
      <h3>Performance Impact</h3>
      <div class="performance-metrics">
        <div class="metric">
          <span class="metric-label">First Paint:</span>
          <span class="metric-value">{{ performanceMetrics.firstPaint }}ms</span>
        </div>
        <div class="metric">
          <span class="metric-label">First Contentful Paint:</span>
          <span class="metric-value">{{ performanceMetrics.firstContentfulPaint }}ms</span>
        </div>
        <div class="metric">
          <span class="metric-label">Largest Contentful Paint:</span>
          <span class="metric-value">{{ performanceMetrics.largestContentfulPaint }}ms</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { cssOptimizer, type CriticalCSSConfig, type CriticalCSSResult } from '@/utils/cssOptimizer'

interface PerformanceMetrics {
  firstPaint: number
  firstContentfulPaint: number
  largestContentfulPaint: number
}

const isProcessing = ref(false)
const criticalCSS = ref('')
const stats = reactive({
  original: 0,
  critical: 0,
  nonCritical: 0,
  savings: 0,
  rules: 0
})

const config = reactive<CriticalCSSConfig>({
  inline: true,
  extractCritical: true,
  minify: true,
  preserveMediaQueries: true,
  preserveFontFaces: true,
  preserveKeyframes: true
})

const performanceMetrics = reactive<PerformanceMetrics>({
  firstPaint: 0,
  firstContentfulPaint: 0,
  largestContentfulPaint: 0
})

const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const updateConfig = () => {
  // Update CSS optimizer configuration
  Object.assign(cssOptimizer, config)
}

const extractCriticalCSS = async () => {
  try {
    isProcessing.value = true

    // Get current page HTML and CSS
    const html = document.documentElement.outerHTML
    const stylesheets = Array.from(document.styleSheets)
    let css = ''

    // Extract CSS from stylesheets
    for (const sheet of stylesheets) {
      try {
        const rules = Array.from(sheet.cssRules || sheet.rules)
        css += rules.map(rule => rule.cssText).join('\n')
      } catch (e) {
        console.warn('Could not access stylesheet:', e)
      }
    }

    // Extract critical CSS
    const result: CriticalCSSResult = await cssOptimizer.extractCriticalCSS(html, css)

    // Update stats
    Object.assign(stats, result.size)
    stats.rules = cssOptimizer.getCSSStats(css).rules

    // Store critical CSS
    criticalCSS.value = result.critical

    // Inline critical CSS if enabled
    if (config.inline) {
      await cssOptimizer.inlineCriticalCSS(html, result.critical)
    }

    // Measure performance
    measurePerformance()

  } catch (error) {
    console.error('Error extracting critical CSS:', error)
  } finally {
    isProcessing.value = false
  }
}

const loadNonCriticalCSS = async () => {
  try {
    // Load non-critical CSS asynchronously
    await cssOptimizer.loadNonCriticalCSS('/src/assets/main.css')
  } catch (error) {
    console.error('Error loading non-critical CSS:', error)
  }
}

const clearCriticalCSS = () => {
  // Remove critical CSS from DOM
  const criticalStyle = document.querySelector('style[data-critical="true"]')
  if (criticalStyle) {
    criticalStyle.remove()
  }
  criticalCSS.value = ''
}

const copyCriticalCSS = async () => {
  try {
    await navigator.clipboard.writeText(criticalCSS.value)
    console.log('Critical CSS copied to clipboard')
  } catch (error) {
    console.error('Error copying CSS:', error)
  }
}

const downloadCriticalCSS = () => {
  const blob = new Blob([criticalCSS.value], { type: 'text/css' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'critical.css'
  a.click()
  URL.revokeObjectURL(url)
}

const measurePerformance = () => {
  // Measure performance metrics
  if ('performance' in window) {
    const paintEntries = performance.getEntriesByType('paint')

    paintEntries.forEach(entry => {
      switch (entry.name) {
        case 'first-paint':
          performanceMetrics.firstPaint = Math.round(entry.startTime)
          break
        case 'first-contentful-paint':
          performanceMetrics.firstContentfulPaint = Math.round(entry.startTime)
          break
      }
    })

    // Measure LCP
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1]
        performanceMetrics.largestContentfulPaint = Math.round(lastEntry.startTime)
      })
      observer.observe({ entryTypes: ['largest-contentful-paint'] })
    }
  }
}

onMounted(() => {
  // Initialize performance measurement
  measurePerformance()
})
</script>

<style scoped>
.critical-css-manager {
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
  margin: 1rem 0;
}

.stats-panel,
.controls-panel,
.preview-panel,
.performance-panel {
  margin-bottom: 2rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem;
  background: white;
  border-radius: 6px;
  border: 1px solid #e9ecef;
}

.stat-label {
  font-weight: 500;
  color: #6c757d;
}

.stat-value {
  font-weight: 600;
  color: #212529;
}

.stat-value.savings {
  color: #28a745;
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin: 1rem 0;
}

.control-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.action-buttons {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-primary {
  background: #007bff;
  color: white;
}

.btn-primary:hover {
  background: #0056b3;
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background: #545b62;
}

.btn-danger {
  background: #dc3545;
  color: white;
}

.btn-danger:hover {
  background: #c82333;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.css-preview {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 6px;
  padding: 1rem;
  margin: 1rem 0;
  max-height: 300px;
  overflow-y: auto;
}

.css-preview pre {
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.5;
}

.preview-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-sm {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
}

.performance-metrics {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.metric {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem;
  background: white;
  border-radius: 6px;
  border: 1px solid #e9ecef;
}

.metric-label {
  font-weight: 500;
  color: #6c757d;
}

.metric-value {
  font-weight: 600;
  color: #212529;
}

h3 {
  margin: 0 0 1rem 0;
  color: #212529;
  font-size: 1.25rem;
}
</style>