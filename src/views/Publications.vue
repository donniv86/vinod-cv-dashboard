<template>
  <admin-layout>
    <div class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div class="space-y-8">
        <!-- Hero Section with Modern Design -->
        <div class="gradient-card animate-fade-in-up" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);">
          <div class="flex flex-col lg:flex-row items-center justify-between">
            <div class="text-center lg:text-left">
              <h1 class="text-4xl lg:text-6xl font-black mb-4 text-white drop-shadow-lg">
                Research Publications
              </h1>
              <p class="text-xl lg:text-2xl mb-6 text-white/90 font-medium">
                Peer-reviewed Research & Impact
              </p>
              <p class="text-lg mb-8 text-white/80 font-light">
                31 publications with 1,247+ citations across multiple journals
              </p>
            </div>
            <div class="text-center lg:text-right mt-8 lg:mt-0">
              <div class="text-6xl lg:text-8xl font-black text-white/90 mb-2">1,247</div>
              <div class="text-xl text-white/80 font-medium">Total Citations</div>
            </div>
          </div>
        </div>

        <!-- Achievement Metrics -->
        <div class="modern-card p-8 animate-fade-in-up">
          <h2 class="text-3xl font-bold text-white mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            Research Impact Metrics
          </h2>
          <achievement-metrics />
        </div>

        <!-- Professional Analytics -->
        <div class="modern-card p-8 animate-fade-in-up">
          <h2 class="text-3xl font-bold text-white mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
            Publication Analytics
          </h2>
          <professional-analytics />
        </div>

        <!-- Interactive Projects (Publications) -->
        <div class="modern-card p-8 animate-fade-in-up">
          <h2 class="text-3xl font-bold text-white mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            Research Publications
          </h2>
          <interactive-projects />
        </div>
      </div>
    </div>
  </admin-layout>
</template>

<script setup lang="ts">
import AdminLayout from '../components/layout/AdminLayout.vue'
import AchievementMetrics from '../components/cv/AchievementMetrics.vue'
import ProfessionalAnalytics from '../components/cv/ProfessionalAnalytics.vue'
import InteractiveProjects from '../components/cv/InteractiveProjects.vue'
</script>