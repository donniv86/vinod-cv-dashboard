<template>
  <div class="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
    <div class="flex flex-col lg:flex-row items-center lg:items-start gap-6">
      <!-- Profile Picture -->
      <div class="flex-shrink-0">
        <div class="w-32 h-32 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white text-4xl font-bold shadow-lg">
          {{ personalInfo.name.charAt(0) }}
        </div>
      </div>

      <!-- Personal Details -->
      <div class="flex-1 text-center lg:text-left">
        <h2 class="text-3xl font-bold text-black dark:text-white mb-2">
          {{ personalInfo.name }}
        </h2>
        <p class="text-xl text-primary mb-3">
          {{ personalInfo.title }}
        </p>
        <p class="text-bodydark2 mb-4 flex items-center justify-center lg:justify-start">
          <MapPinIcon class="w-4 h-4 mr-2" />
          {{ personalInfo.location }}
        </p>
        <p class="text-bodydark leading-relaxed">
          {{ personalInfo.summary }}
        </p>
      </div>

      <!-- Contact Info -->
      <div class="flex-shrink-0">
        <div class="space-y-3">
          <a :href="`mailto:${personalInfo.email}`"
             class="flex items-center text-bodydark2 hover:text-primary transition-colors">
            <MailIcon class="w-4 h-4 mr-2" />
            {{ personalInfo.email }}
          </a>
          <a :href="`tel:${personalInfo.phone}`"
             class="flex items-center text-bodydark2 hover:text-primary transition-colors">
            <PhoneIcon class="w-4 h-4 mr-2" />
            {{ personalInfo.phone }}
          </a>
          <a :href="`https://${personalInfo.linkedin}`" target="_blank"
             class="flex items-center text-bodydark2 hover:text-primary transition-colors">
            <LinkedinIcon class="w-4 h-4 mr-2" />
            LinkedIn
          </a>
          <a :href="`https://${personalInfo.github}`" target="_blank"
             class="flex items-center text-bodydark2 hover:text-primary transition-colors">
            <GithubIcon class="w-4 h-4 mr-2" />
            GitHub
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { MapPinIcon, MailIcon, PhoneIcon } from '@heroicons/vue/24/outline'
import { LinkedinIcon, GithubIcon } from 'lucide-vue-next'

const personalInfo = ref({
  name: 'Your Name',
  title: 'Full Stack Developer',
  location: 'San Francisco, CA',
  summary: 'Passionate full-stack developer with 5+ years of experience building scalable web applications. Specialized in Vue.js, React, Node.js, and cloud technologies. Committed to writing clean, maintainable code and delivering exceptional user experiences.',
  email: 'your.email@example.com',
  phone: '+1 (555) 123-4567',
  linkedin: 'linkedin.com/in/yourprofile',
  github: 'github.com/yourusername'
})
</script>