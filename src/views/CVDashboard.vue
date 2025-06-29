<template>
  <admin-layout>
    <div class="space-y-6">
      <!-- Personal Info Section -->
      <personal-info />

      <!-- Achievement Metrics Section -->
      <achievement-metrics />

      <!-- Professional Analytics Section -->
      <professional-analytics />

      <!-- Skills & Contact Section -->
      <div class="grid grid-cols-12 gap-6">
        <div class="col-span-12 lg:col-span-8">
          <skills-radar-chart />
        </div>
        <div class="col-span-12 lg:col-span-4">
          <contact-info />
        </div>
      </div>

      <!-- Interactive Projects Section -->
      <interactive-projects />

      <!-- GitHub Projects & Technical Skills Section -->
      <github-projects />

      <!-- Certifications & Online Courses Section -->
      <certifications-courses />

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
import AchievementMetrics from '../components/cv/AchievementMetrics.vue'
import ProfessionalAnalytics from '../components/cv/ProfessionalAnalytics.vue'
import SkillsRadarChart from '../components/cv/SkillsRadarChart.vue'
import ContactInfo from '../components/cv/ContactInfo.vue'
import InteractiveProjects from '../components/cv/InteractiveProjects.vue'
import GitHubProjects from '../components/cv/GitHubProjects.vue'
import CertificationsCourses from '../components/cv/CertificationsCourses.vue'
import ExperienceTimeline from '../components/cv/ExperienceTimeline.vue'
import EducationSection from '../components/cv/EducationSection.vue'
</script>