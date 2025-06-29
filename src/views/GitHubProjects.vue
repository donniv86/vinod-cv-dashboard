<template>
  <admin-layout>
    <div class="space-y-6">
      <!-- Header -->
      <div class="bg-gradient-to-r from-gray-600 to-gray-800 rounded-lg p-6 text-white">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold mb-2">GitHub Projects & Technical Skills</h1>
            <p class="text-gray-100">Showcasing technical expertise through open-source contributions</p>
          </div>
          <div class="text-right">
            <div class="text-4xl font-bold">10</div>
            <div class="text-gray-100">Repositories</div>
          </div>
        </div>
      </div>

      <!-- GitHub Projects & Technical Skills Section -->
      <github-projects />

      <!-- Skills Radar Chart -->
      <skills-radar-chart />
    </div>
  </admin-layout>
</template>

<script setup lang="ts">
import AdminLayout from '../components/layout/AdminLayout.vue'
import GitHubProjects from '../components/cv/GitHubProjects.vue'
import SkillsRadarChart from '../components/cv/SkillsRadarChart.vue'
</script>