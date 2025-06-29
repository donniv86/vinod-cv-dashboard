<template>
  <admin-layout>
    <div class="space-y-6">
      <!-- Header -->
      <div class="bg-gradient-to-r from-green-600 to-green-800 rounded-lg p-6 text-white">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold mb-2">Certifications & Online Courses</h1>
            <p class="text-green-100">Continuous learning through professional development courses</p>
          </div>
          <div class="text-right">
            <div class="text-4xl font-bold">21</div>
            <div class="text-green-100">Certifications</div>
          </div>
        </div>
      </div>

      <!-- Certifications & Online Courses Section -->
      <certifications-courses />
    </div>
  </admin-layout>
</template>

<script setup lang="ts">
import AdminLayout from '../components/layout/AdminLayout.vue'
import CertificationsCourses from '../components/cv/CertificationsCourses.vue'
</script>