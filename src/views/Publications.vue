<template>
  <admin-layout>
    <div class="space-y-6">
      <!-- Header -->
      <div class="bg-gradient-to-r from-blue-600 to-purple-700 rounded-lg p-6 text-white">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold mb-2">Research Publications</h1>
            <p class="text-blue-100">31 peer-reviewed papers with comprehensive research impact</p>
          </div>
          <div class="text-right">
            <div class="text-4xl font-bold">1,247</div>
            <div class="text-blue-100">Total Citations</div>
          </div>
        </div>
      </div>

      <!-- Achievement Metrics -->
      <achievement-metrics />

      <!-- Professional Analytics -->
      <professional-analytics />

      <!-- Interactive Projects (Publications) -->
      <interactive-projects />
    </div>
  </admin-layout>
</template>

<script setup lang="ts">
import AdminLayout from '../components/layout/AdminLayout.vue'
import AchievementMetrics from '../components/cv/AchievementMetrics.vue'
import ProfessionalAnalytics from '../components/cv/ProfessionalAnalytics.vue'
import InteractiveProjects from '../components/cv/InteractiveProjects.vue'
</script>