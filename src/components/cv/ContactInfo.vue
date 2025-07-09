<template>
  <div class="modern-card p-6">
    <h3 class="text-xl font-semibold text-white mb-6 bg-black/20 px-4 py-2 rounded-lg drop-shadow-lg" style="color: white !important;">Contact Information</h3>

    <!-- Contact Details -->
    <div class="space-y-4 mb-6">
      <div class="flex items-center p-3 rounded-lg hover:bg-white/10 transition-all duration-300">
        <div class="w-10 h-10 bg-cyan-500/20 rounded-full flex items-center justify-center mr-3">
          <MailIcon class="w-5 h-5 text-cyan-300" />
        </div>
        <div>
          <p class="text-sm text-sky-300">Email</p>
          <a :href="`mailto:${contactInfo.email}`" class="text-white hover:text-cyan-300 transition-colors font-medium">
            {{ contactInfo.email }}
          </a>
        </div>
      </div>

      <div class="flex items-center p-3 rounded-lg hover:bg-white/10 transition-all duration-300">
        <div class="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center mr-3">
          <span class="text-green-300 text-lg">📞</span>
        </div>
        <div>
          <p class="text-sm text-sky-300">Phone</p>
          <a :href="`tel:${contactInfo.phone}`" class="text-white hover:text-green-300 transition-colors font-medium">
            {{ contactInfo.phone }}
          </a>
        </div>
      </div>

      <div class="flex items-center p-3 rounded-lg hover:bg-white/10 transition-all duration-300">
        <div class="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center mr-3">
          <span class="text-yellow-300 text-lg">📍</span>
        </div>
        <div>
          <p class="text-sm text-sky-300">Location</p>
          <p class="text-white font-medium">{{ contactInfo.location }}</p>
        </div>
      </div>
    </div>

    <!-- Social Links -->
    <div>
      <h4 class="font-semibold text-white mb-4">Connect With Me</h4>
      <div class="grid grid-cols-2 gap-3">
        <a
          v-for="social in socialLinks"
          :key="social.name"
          :href="social.url"
          target="_blank"
          :class="`${social.color} text-white text-center py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center hover:opacity-90 hover:scale-105 hover:shadow-lg`"
        >
          <span class="mr-2">{{ social.icon }}</span>
          {{ social.name }}
        </a>
      </div>
    </div>

    <!-- Download CV Button -->
    <div class="mt-6">
      <button class="w-full modern-btn bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 px-4 rounded-lg hover:opacity-90 transition-all duration-300 flex items-center justify-center hover:scale-105 hover:shadow-lg">
        <span class="mr-2">📄</span>
        Download CV (PDF)
      </button>
    </div>

    <!-- Availability Status -->
    <div class="mt-4 p-3 bg-green-500/20 rounded-lg border border-green-500/30">
      <div class="flex items-center">
        <div class="w-3 h-3 bg-green-400 rounded-full mr-2 animate-pulse"></div>
        <span class="text-green-300 text-sm font-medium">
          Available for new opportunities
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { MailIcon } from '../../icons'

const contactInfo = ref({
  email: 'donniv86@gmail.com',
  phone: '+91-6364817778',
  location: 'Bangalore, India',
  linkedin: 'linkedin.com/in/vinod-devaraji',
  orcid: '0000-0002-9355-3995'
})

const socialLinks = ref([
  {
    name: 'LinkedIn',
    url: `https://${contactInfo.value.linkedin}`,
    icon: '💼',
    color: 'bg-blue-600'
  },
  {
    name: 'ORCID',
    url: `https://orcid.org/${contactInfo.value.orcid}`,
    icon: '🔬',
    color: 'bg-green-600'
  }
])
</script>