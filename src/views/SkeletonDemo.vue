<template>
  <admin-layout>
    <div class="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
      <div class="max-w-7xl mx-auto">
        <!-- Header -->
        <div class="mb-8">
          <h1 class="text-4xl font-bold text-white mb-4">Skeleton Loading Demo</h1>
          <p class="text-sky-300 text-lg">
            Showcasing skeleton loading states for better perceived performance
          </p>
        </div>

        <!-- Controls -->
        <div class="mb-8 p-6 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-cyan-500/30">
          <h2 class="text-2xl font-semibold text-yellow-300 mb-4">Controls</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              @click="toggleHeroLoading"
              class="modern-btn bg-cyan-600/30 hover:bg-cyan-500/40 transition-all duration-300"
            >
              {{ heroLoading.isVisible ? 'Hide' : 'Show' }} Hero Skeleton
            </button>
            <button
              @click="toggleStatsLoading"
              class="modern-btn bg-cyan-600/30 hover:bg-cyan-500/40 transition-all duration-300"
            >
              {{ statsLoading.isVisible ? 'Hide' : 'Show' }} Stats Skeleton
            </button>
            <button
              @click="toggleContentLoading"
              class="modern-btn bg-cyan-600/30 hover:bg-cyan-500/40 transition-all duration-300"
            >
              {{ contentLoading.isVisible ? 'Hide' : 'Show' }} Content Skeleton
            </button>
          </div>
          <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              @click="simulateLoading"
              class="modern-btn bg-green-600/30 hover:bg-green-500/40 transition-all duration-300"
            >
              Simulate Full Loading
            </button>
            <button
              @click="resetAll"
              class="modern-btn bg-red-600/30 hover:bg-red-500/40 transition-all duration-300"
            >
              Reset All
            </button>
          </div>
        </div>

        <!-- Skeleton Variants Demo -->
        <div class="mb-8">
          <h2 class="text-2xl font-semibold text-yellow-300 mb-6">Skeleton Variants</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Card Variant -->
            <div class="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-cyan-500/30">
              <h3 class="text-lg font-medium text-white mb-4">Card Skeleton</h3>
              <SkeletonLoader variant="card" size="medium" :is-animated="true" />
            </div>

            <!-- List Item Variant -->
            <div class="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-cyan-500/30">
              <h3 class="text-lg font-medium text-white mb-4">List Item Skeleton</h3>
              <SkeletonLoader variant="list-item" size="medium" :is-animated="true" />
            </div>

            <!-- Profile Variant -->
            <div class="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-cyan-500/30">
              <h3 class="text-lg font-medium text-white mb-4">Profile Skeleton</h3>
              <SkeletonLoader variant="profile" size="medium" :is-animated="true" />
            </div>

            <!-- Chart Variant -->
            <div class="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-cyan-500/30">
              <h3 class="text-lg font-medium text-white mb-4">Chart Skeleton</h3>
              <SkeletonLoader variant="chart" size="medium" :is-animated="true" />
            </div>

            <!-- Timeline Variant -->
            <div class="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-cyan-500/30">
              <h3 class="text-lg font-medium text-white mb-4">Timeline Skeleton</h3>
              <SkeletonLoader variant="timeline" size="medium" :is-animated="true" />
            </div>

            <!-- Grid Variant -->
            <div class="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-cyan-500/30">
              <h3 class="text-lg font-medium text-white mb-4">Grid Skeleton</h3>
              <SkeletonLoader variant="grid" :items="3" size="small" :is-animated="true" />
            </div>
          </div>
        </div>

        <!-- Size Variants -->
        <div class="mb-8">
          <h2 class="text-2xl font-semibold text-yellow-300 mb-6">Size Variants</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-cyan-500/30">
              <h3 class="text-lg font-medium text-white mb-4">Small</h3>
              <SkeletonLoader variant="card" size="small" :is-animated="true" />
            </div>
            <div class="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-cyan-500/30">
              <h3 class="text-lg font-medium text-white mb-4">Medium</h3>
              <SkeletonLoader variant="card" size="medium" :is-animated="true" />
            </div>
            <div class="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-cyan-500/30">
              <h3 class="text-lg font-medium text-white mb-4">Large</h3>
              <SkeletonLoader variant="card" size="large" :is-animated="true" />
            </div>
          </div>
        </div>

        <!-- Loading States -->
        <div class="mb-8">
          <h2 class="text-2xl font-semibold text-yellow-300 mb-6">Loading States</h2>
          <div class="space-y-4">
            <div class="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-cyan-500/30">
              <h3 class="text-lg font-medium text-white mb-4">Hero Section</h3>
              <div v-if="!heroLoading.isVisible" class="bg-gradient-to-r from-cyan-500 to-blue-500 p-8 rounded-lg text-center">
                <h4 class="text-2xl font-bold text-white mb-2">Hero Content</h4>
                <p class="text-cyan-100">This is the actual hero content that would be displayed</p>
              </div>
              <SkeletonLoader v-else variant="profile" size="large" :is-animated="true" />
            </div>

            <div class="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-cyan-500/30">
              <h3 class="text-lg font-medium text-white mb-4">Stats Cards</h3>
              <div v-if="!statsLoading.isVisible" class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div v-for="i in 4" :key="i" class="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-lg text-center">
                  <div class="text-2xl font-bold text-white">{{ i * 10 }}</div>
                  <div class="text-purple-100 text-sm">Stat {{ i }}</div>
                </div>
              </div>
              <div v-else class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <SkeletonLoader v-for="i in 4" :key="i" variant="card" size="medium" :is-animated="true" />
              </div>
            </div>

            <div class="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-cyan-500/30">
              <h3 class="text-lg font-medium text-white mb-4">Content List</h3>
              <div v-if="!contentLoading.isVisible" class="space-y-4">
                <div v-for="i in 3" :key="i" class="bg-gradient-to-r from-green-500 to-teal-500 p-4 rounded-lg">
                  <h5 class="font-semibold text-white">Content Item {{ i }}</h5>
                  <p class="text-green-100 text-sm">This is the actual content that would be displayed</p>
                </div>
              </div>
              <div v-else class="space-y-4">
                <SkeletonLoader v-for="i in 3" :key="i" variant="list-item" size="medium" :is-animated="true" />
              </div>
            </div>
          </div>
        </div>

        <!-- Performance Metrics -->
        <div class="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-cyan-500/30">
          <h2 class="text-2xl font-semibold text-yellow-300 mb-4">Performance Metrics</h2>
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div class="text-center">
              <div class="text-2xl font-bold text-cyan-400">{{ loadingTime }}ms</div>
              <div class="text-sm text-sky-300">Average Loading Time</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-green-400">{{ skeletonCount }}</div>
              <div class="text-sm text-sky-300">Skeleton Components</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-purple-400">{{ animationFPS }}fps</div>
              <div class="text-sm text-sky-300">Animation Performance</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-yellow-400">{{ perceivedPerformance }}%</div>
              <div class="text-sm text-sky-300">Perceived Performance</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </admin-layout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import AdminLayout from '../components/layout/AdminLayout.vue'
import SkeletonLoader from '../components/ui/SkeletonLoader.vue'
import { useSkeletonLoading } from '../composables/useSkeletonLoading'

// Skeleton loading states
const heroLoading = useSkeletonLoading({ delay: 0, minDuration: 500 })
const statsLoading = useSkeletonLoading({ delay: 100, minDuration: 300 })
const contentLoading = useSkeletonLoading({ delay: 200, minDuration: 400 })

// Performance metrics
const loadingTime = ref(0)
const skeletonCount = ref(0)
const animationFPS = ref(60)
const perceivedPerformance = ref(95)

// Methods
const toggleHeroLoading = () => {
  if (heroLoading.isVisible.value) {
    heroLoading.stopLoading()
  } else {
    heroLoading.startLoading()
  }
}

const toggleStatsLoading = () => {
  if (statsLoading.isVisible.value) {
    statsLoading.stopLoading()
  } else {
    statsLoading.startLoading()
  }
}

const toggleContentLoading = () => {
  if (contentLoading.isVisible.value) {
    contentLoading.stopLoading()
  } else {
    contentLoading.startLoading()
  }
}

const simulateLoading = async () => {
  const startTime = Date.now()

  heroLoading.startLoading()
  statsLoading.startLoading()
  contentLoading.startLoading()

  // Simulate loading completion
  setTimeout(() => {
    heroLoading.stopLoading()
  }, 800)

  setTimeout(() => {
    statsLoading.stopLoading()
  }, 1000)

  setTimeout(() => {
    contentLoading.stopLoading()
    loadingTime.value = Date.now() - startTime
  }, 1200)
}

const resetAll = () => {
  heroLoading.reset()
  statsLoading.reset()
  contentLoading.reset()
  loadingTime.value = 0
}

// Initialize
onMounted(() => {
  skeletonCount.value = 6 // Number of skeleton variants
  perceivedPerformance.value = 95
})
</script>

<style scoped>
.modern-btn {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: 500;
  color: white;
  border: 1px solid rgba(6, 182, 212, 0.3);
  backdrop-filter: blur(4px);
}
</style>