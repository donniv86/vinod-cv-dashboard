<template>
  <div class="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
    <h3 class="text-xl font-semibold text-black dark:text-white mb-6">Contact Information</h3>

    <!-- Contact Details -->
    <div class="space-y-4 mb-6">
      <div class="flex items-center">
        <div class="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
          <MailIcon class="w-5 h-5 text-primary" />
        </div>
        <div>
          <p class="text-sm text-bodydark2">Email</p>
          <a :href="`mailto:${contactInfo.email}`" class="text-black dark:text-white hover:text-primary transition-colors">
            {{ contactInfo.email }}
          </a>
        </div>
      </div>

      <div class="flex items-center">
        <div class="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center mr-3">
          <PhoneIcon class="w-5 h-5 text-success" />
        </div>
        <div>
          <p class="text-sm text-bodydark2">Phone</p>
          <a :href="`tel:${contactInfo.phone}`" class="text-black dark:text-white hover:text-success transition-colors">
            {{ contactInfo.phone }}
          </a>
        </div>
      </div>

      <div class="flex items-center">
        <div class="w-10 h-10 bg-warning/10 rounded-full flex items-center justify-center mr-3">
          <MapPinIcon class="w-5 h-5 text-warning" />
        </div>
        <div>
          <p class="text-sm text-bodydark2">Location</p>
          <p class="text-black dark:text-white">{{ contactInfo.location }}</p>
        </div>
      </div>
    </div>

    <!-- Social Links -->
    <div>
      <h4 class="font-semibold text-black dark:text-white mb-4">Connect With Me</h4>
      <div class="grid grid-cols-2 gap-3">
        <a
          v-for="social in socialLinks"
          :key="social.name"
          :href="social.url"
          target="_blank"
          :class="`${social.color} text-white text-center py-3 px-4 rounded-lg transition-colors flex items-center justify-center hover:opacity-90`"
        >
          <component :is="social.icon" class="w-4 h-4 mr-2" />
          {{ social.name }}
        </a>
      </div>
    </div>

    <!-- Download CV Button -->
    <div class="mt-6">
      <button class="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 px-4 rounded-lg hover:opacity-90 transition-all duration-300 flex items-center justify-center">
        <DownloadIcon class="w-4 h-4 mr-2" />
        Download CV (PDF)
      </button>
    </div>

    <!-- Availability Status -->
    <div class="mt-4 p-3 bg-success/10 rounded-lg">
      <div class="flex items-center">
        <div class="w-3 h-3 bg-success rounded-full mr-2"></div>
        <span class="text-success text-sm font-medium">
          Available for new opportunities
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { MailIcon, PhoneIcon, MapPinIcon } from '@heroicons/vue/24/outline'
import { LinkedinIcon, GithubIcon, TwitterIcon, GlobeIcon, DownloadIcon } from 'lucide-vue-next'

const contactInfo = ref({
  email: 'your.email@example.com',
  phone: '+1 (555) 123-4567',
  location: 'San Francisco, CA',
  linkedin: 'linkedin.com/in/yourprofile',
  github: 'github.com/yourusername',
  twitter: 'twitter.com/yourusername',
  website: 'yourwebsite.com'
})

const socialLinks = ref([
  {
    name: 'LinkedIn',
    url: `https://${contactInfo.value.linkedin}`,
    icon: LinkedinIcon,
    color: 'bg-blue-600'
  },
  {
    name: 'GitHub',
    url: `https://${contactInfo.value.github}`,
    icon: GithubIcon,
    color: 'bg-gray-800'
  },
  {
    name: 'Twitter',
    url: `https://${contactInfo.value.twitter}`,
    icon: TwitterIcon,
    color: 'bg-blue-400'
  },
  {
    name: 'Website',
    url: `https://${contactInfo.value.website}`,
    icon: GlobeIcon,
    color: 'bg-green-600'
  }
])
</script>