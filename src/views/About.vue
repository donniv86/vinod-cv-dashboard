<template>
  <admin-layout>
    <div class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div class="space-y-8">
        <!-- Hero Section with Modern Design -->
        <div class="gradient-card animate-fade-in-up" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);">
          <div class="flex flex-col lg:flex-row items-center justify-between">
            <div class="text-center lg:text-left">
              <h1 class="text-4xl lg:text-6xl font-black mb-4 text-white drop-shadow-lg bg-black/20 px-4 py-2 rounded-lg" style="color: white !important;">
                About Me
              </h1>
              <p class="text-xl lg:text-2xl mb-6 text-white/90 font-medium">
                Professional Background & Experience
              </p>
              <p class="text-lg mb-8 text-white/80 font-light">
                Senior Scientist with 13+ years in Computational Drug Discovery
              </p>
            </div>
            <div class="text-center lg:text-right mt-8 lg:mt-0">
              <div class="text-6xl lg:text-8xl font-black text-white/90 mb-2">13+</div>
              <div class="text-xl text-white/80 font-medium">Years Experience</div>
            </div>
          </div>
        </div>

        <!-- Personal Info Section -->
        <div class="modern-card p-8 animate-fade-in-up">
          <h2 class="text-3xl font-bold text-white mb-6 bg-black/20 px-4 py-2 rounded-lg drop-shadow-lg" style="color: white !important;">
            Personal Information
          </h2>
          <personal-info />
        </div>

        <!-- Skills & Contact Section -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div class="lg:col-span-2">
            <div class="modern-card p-8 animate-fade-in-up">
              <h2 class="text-3xl font-bold text-white mb-6 bg-black/20 px-4 py-2 rounded-lg drop-shadow-lg" style="color: white !important;">
                Technical Skills Radar
              </h2>
              <skills-radar-chart />
            </div>
          </div>
          <div class="lg:col-span-1">
            <div class="modern-card p-8 animate-fade-in-up">
              <h2 class="text-3xl font-bold text-white mb-6 bg-black/20 px-4 py-2 rounded-lg drop-shadow-lg" style="color: white !important;">
                Contact Information
              </h2>
              <contact-info />
            </div>
          </div>
        </div>

        <!-- Experience Timeline -->
        <div class="modern-card p-8 animate-fade-in-up">
          <h2 class="text-3xl font-bold text-white mb-6 bg-black/20 px-4 py-2 rounded-lg drop-shadow-lg" style="color: white !important;">
            Professional Experience
          </h2>
          <experience-timeline />
        </div>

        <!-- Education Section -->
        <div class="modern-card p-8 animate-fade-in-up">
          <h2 class="text-3xl font-bold text-white mb-6 bg-black/20 px-4 py-2 rounded-lg drop-shadow-lg" style="color: white !important;">
            Education & Qualifications
          </h2>
          <education-section />
        </div>
      </div>
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