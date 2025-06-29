<template>
  <div class="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
    <div class="flex flex-col lg:flex-row items-center lg:items-start gap-6">
      <!-- Profile Picture -->
      <div class="flex-shrink-0">
        <img
          src="/vinod.png"
          alt="Vinod Devaraji"
          class="w-32 h-32 rounded-full object-cover shadow-lg border-4 border-white dark:border-boxdark"
        />
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
          <a :href="`https://orcid.org/${personalInfo.orcid}`" target="_blank"
             class="flex items-center text-bodydark2 hover:text-primary transition-colors">
            <GlobeIcon class="w-4 h-4 mr-2" />
            ORCID
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { MapPinIcon, MailIcon, PhoneIcon } from '@heroicons/vue/24/outline'
import { LinkedinIcon, GlobeIcon } from 'lucide-vue-next'

const personalInfo = ref({
  name: 'Vinod Devaraji',
  title: 'Innovative Drug Hunter | Champion of AI/ML-Driven Drug Discovery',
  location: 'Bangalore, India',
  summary: 'Strategic computational chemist with 13+ years of experience advancing drug discovery through AI/ML, cheminformatics, and physics-based molecular modeling. Proven track record in hit-to-lead optimization, DMTA cycle automation, and predictive model development across oncology, metabolic, and infectious diseases.',
  email: 'donniv86@gmail.com',
  phone: '+91-6364817778',
  linkedin: 'linkedin.com/in/vinod-devaraji',
  orcid: '0000-0002-9355-3995'
})
</script>