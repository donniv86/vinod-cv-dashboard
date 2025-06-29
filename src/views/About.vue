<template>
  <admin-layout>
    <div class="space-y-6">
      <!-- Header -->
      <div class="bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg p-6 text-white">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold mb-2">About Me</h1>
            <p class="text-purple-100">Professional background, experience, and contact information</p>
          </div>
          <div class="text-right">
            <div class="text-4xl font-bold">13+</div>
            <div class="text-purple-100">Years Experience</div>
          </div>
        </div>
      </div>

      <!-- Personal Info Section -->
      <personal-info />

      <!-- Skills & Contact Section -->
      <div class="grid grid-cols-12 gap-6">
        <div class="col-span-12 lg:col-span-8">
          <skills-radar-chart />
        </div>
        <div class="col-span-12 lg:col-span-4">
          <contact-info />
        </div>
      </div>

      <!-- Experience Timeline -->
      <experience-timeline />

      <!-- Education Section -->
      <education-section />
    </div>
  </admin-layout>
</template>

<script setup lang="ts">
import AdminLayout from '../components/layout/AdminLayout.vue'
import PersonalInfo from '../components/cv/PersonalInfo.vue'
import SkillsRadarChart from '../components/cv/SkillsRadarChart.vue'
import ContactInfo from '../components/cv/ContactInfo.vue'
import ExperienceTimeline from '../components/cv/ExperienceTimeline.vue'
import EducationSection from '../components/cv/EducationSection.vue'
</script>