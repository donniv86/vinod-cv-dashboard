<template>
  <admin-layout>
    <div class="space-y-6">
      <!-- Personal Info Section -->
      <personal-info />

      <!-- Skills & Contact Section -->
      <div class="grid grid-cols-12 gap-6">
        <div class="col-span-12 lg:col-span-8">
          <skills-chart />
        </div>
        <div class="col-span-12 lg:col-span-4">
          <contact-info />
        </div>
      </div>

      <!-- Experience Timeline -->
      <experience-timeline />

      <!-- Projects Grid -->
      <projects-grid />

      <!-- Education Section -->
      <education-section />
    </div>
  </admin-layout>
</template>

<script setup lang="ts">
import AdminLayout from '../components/layout/AdminLayout.vue'
import PersonalInfo from '../components/cv/PersonalInfo.vue'
import SkillsChart from '../components/cv/SkillsChart.vue'
import ContactInfo from '../components/cv/ContactInfo.vue'
import ExperienceTimeline from '../components/cv/ExperienceTimeline.vue'
import ProjectsGrid from '../components/cv/ProjectsGrid.vue'
import EducationSection from '../components/cv/EducationSection.vue'
</script>