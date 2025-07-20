<template>
  <div class="cache-monitor">
    <div class="cache-header">
      <h3 class="cache-title">Cache Monitor</h3>
      <button
        @click="refreshStats"
        class="refresh-button"
        :disabled="loading"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
        </svg>
        Refresh
      </button>
    </div>

    <div v-if="loading" class="loading-state">
      <div class="loading-spinner"></div>
      <span>Loading cache statistics...</span>
    </div>

    <div v-else class="cache-stats">
      <!-- API Cache Stats -->
      <div class="cache-section">
        <h4 class="section-title">API Cache</h4>
        <div class="stats-grid">
          <div class="stat-item">
            <span class="stat-label">Hit Rate</span>
            <span class="stat-value">{{ apiStats.hitRate.toFixed(1) }}%</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Hits</span>
            <span class="stat-value">{{ apiStats.hits }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Misses</span>
            <span class="stat-value">{{ apiStats.misses }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Items</span>
            <span class="stat-value">{{ apiStats.items }}</span>
          </div>
        </div>
        <div class="cache-actions">
          <button @click="clearApiCache" class="action-button">
            Clear API Cache
          </button>
        </div>
      </div>

      <!-- Asset Cache Stats -->
      <div class="cache-section">
        <h4 class="section-title">Asset Cache</h4>
        <div class="stats-grid">
          <div class="stat-item">
            <span class="stat-label">Hit Rate</span>
            <span class="stat-value">{{ assetStats.hitRate.toFixed(1) }}%</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Hits</span>
            <span class="stat-value">{{ assetStats.hits }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Misses</span>
            <span class="stat-value">{{ assetStats.misses }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Items</span>
            <span class="stat-value">{{ assetStats.items }}</span>
          </div>
        </div>
        <div class="cache-actions">
          <button @click="clearAssetCache" class="action-button">
            Clear Asset Cache
          </button>
          <button @click="preloadAssets" class="action-button">
            Preload Assets
          </button>
        </div>
      </div>

      <!-- User Data Cache Stats -->
      <div class="cache-section">
        <h4 class="section-title">User Data Cache</h4>
        <div class="stats-grid">
          <div class="stat-item">
            <span class="stat-label">Hit Rate</span>
            <span class="stat-value">{{ userStats.hitRate.toFixed(1) }}%</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Hits</span>
            <span class="stat-value">{{ userStats.hits }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Misses</span>
            <span class="stat-value">{{ userStats.misses }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Items</span>
            <span class="stat-value">{{ userStats.items }}</span>
          </div>
        </div>
        <div class="cache-actions">
          <button @click="clearUserCache" class="action-button">
            Clear User Cache
          </button>
        </div>
      </div>

      <!-- Overall Stats -->
      <div class="cache-section overall-stats">
        <h4 class="section-title">Overall Performance</h4>
        <div class="performance-indicators">
          <div class="indicator">
            <div class="indicator-bar">
              <div
                class="indicator-fill"
                :style="{ width: `${overallHitRate}%` }"
                :class="getHitRateClass(overallHitRate)"
              ></div>
            </div>
            <span class="indicator-label">Cache Hit Rate: {{ overallHitRate.toFixed(1) }}%</span>
          </div>
          <div class="indicator">
            <div class="indicator-bar">
              <div
                class="indicator-fill"
                :style="{ width: `${cacheEfficiency}%` }"
                :class="getEfficiencyClass(cacheEfficiency)"
              ></div>
            </div>
            <span class="indicator-label">Cache Efficiency: {{ cacheEfficiency.toFixed(1) }}%</span>
          </div>
        </div>
        <div class="cache-actions">
          <button @click="clearAllCaches" class="action-button danger">
            Clear All Caches
          </button>
        </div>
      </div>
    </div>

    <!-- Cache Tips -->
    <div class="cache-tips">
      <h4 class="tips-title">💡 Cache Tips</h4>
      <ul class="tips-list">
        <li>High hit rates indicate good caching performance</li>
        <li>Clear caches when data becomes stale</li>
        <li>Preload critical assets for faster loading</li>
        <li>Monitor cache efficiency for optimization</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { apiResponseCache, userDataCache } from '@/utils/cacheManager'
import { assetCache } from '@/utils/assetCache'

const loading = ref(false)
const apiStats = ref({ hits: 0, misses: 0, items: 0, hitRate: 0 })
const assetStats = ref({ hits: 0, misses: 0, items: 0, hitRate: 0 })
const userStats = ref({ hits: 0, misses: 0, items: 0, hitRate: 0 })

const overallHitRate = computed(() => {
  const totalHits = apiStats.value.hits + assetStats.value.hits + userStats.value.hits
  const totalRequests = totalHits + apiStats.value.misses + assetStats.value.misses + userStats.value.misses
  return totalRequests > 0 ? (totalHits / totalRequests) * 100 : 0
})

const cacheEfficiency = computed(() => {
  const totalItems = apiStats.value.items + assetStats.value.items + userStats.value.items
  const maxItems = 350 // Combined max items from all caches
  return totalItems > 0 ? (totalItems / maxItems) * 100 : 0
})

const refreshStats = async () => {
  loading.value = true
  try {
    apiStats.value = apiResponseCache.getStats()
    assetStats.value = assetCache.getStats()
    userStats.value = userDataCache.getStats()
  } catch (error) {
    console.error('Failed to refresh cache stats:', error)
  } finally {
    loading.value = false
  }
}

const clearApiCache = async () => {
  try {
    await apiResponseCache.clear()
    await refreshStats()
    console.log('API cache cleared')
  } catch (error) {
    console.error('Failed to clear API cache:', error)
  }
}

const clearAssetCache = async () => {
  try {
    await assetCache.clear()
    await refreshStats()
    console.log('Asset cache cleared')
  } catch (error) {
    console.error('Failed to clear asset cache:', error)
  }
}

const clearUserCache = async () => {
  try {
    await userDataCache.clear()
    await refreshStats()
    console.log('User cache cleared')
  } catch (error) {
    console.error('Failed to clear user cache:', error)
  }
}

const clearAllCaches = async () => {
  try {
    await Promise.all([
      apiResponseCache.clear(),
      assetCache.clear(),
      userDataCache.clear()
    ])
    await refreshStats()
    console.log('All caches cleared')
  } catch (error) {
    console.error('Failed to clear all caches:', error)
  }
}

const preloadAssets = async () => {
  try {
    await assetCache.preloadCriticalAssets()
    await refreshStats()
    console.log('Critical assets preloaded')
  } catch (error) {
    console.error('Failed to preload assets:', error)
  }
}

const getHitRateClass = (rate: number) => {
  if (rate >= 80) return 'excellent'
  if (rate >= 60) return 'good'
  if (rate >= 40) return 'fair'
  return 'poor'
}

const getEfficiencyClass = (efficiency: number) => {
  if (efficiency >= 80) return 'excellent'
  if (efficiency >= 60) return 'good'
  if (efficiency >= 40) return 'fair'
  return 'poor'
}

onMounted(() => {
  refreshStats()
})
</script>

<style scoped>
.cache-monitor {
  background: #1f2937;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #374151;
}

.cache-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.cache-title {
  font-size: 18px;
  font-weight: 600;
  color: white;
  margin: 0;
}

.refresh-button {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #3b82f6;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;
}

.refresh-button:hover:not(:disabled) {
  background: #2563eb;
}

.refresh-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.loading-state {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: #9ca3af;
  padding: 40px 0;
}

.loading-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid #374151;
  border-top: 2px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.cache-stats {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.cache-section {
  background: #111827;
  border-radius: 8px;
  padding: 16px;
  border: 1px solid #374151;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: white;
  margin: 0 0 12px 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 12px;
  margin-bottom: 16px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.stat-label {
  font-size: 12px;
  color: #9ca3af;
  margin-bottom: 4px;
}

.stat-value {
  font-size: 18px;
  font-weight: 600;
  color: white;
}

.cache-actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.action-button {
  background: #374151;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  transition: background-color 0.2s;
}

.action-button:hover {
  background: #4b5563;
}

.action-button.danger {
  background: #dc2626;
}

.action-button.danger:hover {
  background: #b91c1c;
}

.overall-stats {
  background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%);
}

.performance-indicators {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
}

.indicator {
  display: flex;
  align-items: center;
  gap: 12px;
}

.indicator-bar {
  flex: 1;
  height: 8px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  overflow: hidden;
}

.indicator-fill {
  height: 100%;
  transition: width 0.3s ease-in-out;
}

.indicator-fill.excellent {
  background: #10b981;
}

.indicator-fill.good {
  background: #3b82f6;
}

.indicator-fill.fair {
  background: #f59e0b;
}

.indicator-fill.poor {
  background: #ef4444;
}

.indicator-label {
  font-size: 14px;
  color: white;
  min-width: 140px;
}

.cache-tips {
  margin-top: 20px;
  padding: 16px;
  background: #111827;
  border-radius: 8px;
  border: 1px solid #374151;
}

.tips-title {
  font-size: 16px;
  font-weight: 600;
  color: white;
  margin: 0 0 12px 0;
}

.tips-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.tips-list li {
  font-size: 14px;
  color: #9ca3af;
  padding-left: 20px;
  position: relative;
}

.tips-list li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: #3b82f6;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 640px) {
  .cache-monitor {
    padding: 16px;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .cache-actions {
    flex-direction: column;
  }

  .action-button {
    width: 100%;
  }
}
</style>