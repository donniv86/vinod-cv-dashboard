<template>
  <admin-layout>
    <div class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div class="space-y-8">
        <!-- Hero Section with Modern Design -->
        <div class="gradient-card animate-fade-in-up" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);">
          <div class="flex flex-col lg:flex-row items-center justify-between">
            <div class="text-center lg:text-left">
              <h1 class="text-4xl lg:text-6xl font-black mb-4 text-white drop-shadow-lg bg-black/20 px-4 py-2 rounded-lg" style="color: white !important; text-shadow: 0 0 20px rgba(255, 255, 255, 0.8); font-weight: 900;">
                Research Publications
              </h1>
              <p class="text-xl lg:text-2xl mb-6 text-white/90 font-medium" style="text-shadow: 0 0 8px rgba(255, 255, 255, 0.6);">
                Peer-reviewed Research & Impact
              </p>
              <p class="text-lg mb-8 text-white/80 font-light" style="text-shadow: 0 0 5px rgba(255, 255, 255, 0.4);">
                31 publications with 1,247+ citations across multiple journals
              </p>
            </div>
            <div class="text-center lg:text-right mt-8 lg:mt-0">
              <div class="text-6xl lg:text-8xl font-black text-white/90 mb-2" style="text-shadow: 0 0 15px rgba(255, 255, 255, 0.7);">1,247</div>
              <div class="text-xl text-white/80 font-medium" style="text-shadow: 0 0 8px rgba(255, 255, 255, 0.6);">Total Citations</div>
            </div>
          </div>
        </div>

        <!-- Achievement Metrics -->
        <div class="modern-card p-8 animate-fade-in-up">
          <h2 class="text-3xl font-bold text-white mb-6 bg-black/20 px-4 py-2 rounded-lg drop-shadow-lg" style="color: white !important; text-shadow: 0 0 15px rgba(255, 255, 255, 0.8); font-weight: 900;">
            Research Impact Metrics
          </h2>
          <achievement-metrics />
        </div>

        <!-- Professional Analytics -->
        <div class="modern-card p-8 animate-fade-in-up">
          <h2 class="text-3xl font-bold text-white mb-6 bg-black/20 px-4 py-2 rounded-lg drop-shadow-lg" style="color: white !important; text-shadow: 0 0 15px rgba(255, 255, 255, 0.8); font-weight: 900;">
            Publication Analytics
          </h2>
          <professional-analytics />
        </div>

        <!-- Interactive Projects (Publications) -->
        <div class="modern-card p-8 animate-fade-in-up">
          <h2 class="text-3xl font-bold text-white mb-6 bg-black/20 px-4 py-2 rounded-lg drop-shadow-lg" style="color: white !important; text-shadow: 0 0 15px rgba(255, 255, 255, 0.8); font-weight: 900;">
            Research Publications
          </h2>
          <interactive-projects />
        </div>

        <!-- Virtual Scrolling Publications List -->
        <div class="modern-card p-8 animate-fade-in-up">
          <h2 class="text-3xl font-bold text-white mb-6 bg-black/20 px-4 py-2 rounded-lg drop-shadow-lg" style="color: white !important; text-shadow: 0 0 15px rgba(255, 255, 255, 0.8); font-weight: 900;">
            Publications Library
          </h2>
          <virtual-publication-list
            :publications="allPublications"
            :loading="loading"
            @publication-share="handlePublicationShare"
            @scroll-end="handleScrollEnd"
          />
        </div>
      </div>
    </div>
  </admin-layout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AdminLayout from '../components/layout/AdminLayout.vue'
import AchievementMetrics from '../components/cv/AchievementMetrics.vue'
import ProfessionalAnalytics from '../components/cv/ProfessionalAnalytics.vue'
import InteractiveProjects from '../components/cv/InteractiveProjects.vue'
import VirtualPublicationList from '../components/cv/VirtualPublicationList.vue'
import { generatePublications, type Publication } from '../data/publications'

// Reactive state
const loading = ref(false)
const allPublications = ref<Publication[]>([])

// Load publications
const loadPublications = async () => {
  loading.value = true
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    allPublications.value = generatePublications(200) // Generate 200 publications for testing
  } catch (error) {
    console.error('Failed to load publications:', error)
  } finally {
    loading.value = false
  }
}

// Event handlers
const handlePublicationShare = (publication: Publication) => {
  console.log('Sharing publication:', publication.title)
  // Implement sharing logic here
}

const handleScrollEnd = () => {
  console.log('Reached end of publications list')
  // Implement infinite scrolling logic here if needed
}

// Load publications on mount
onMounted(() => {
  loadPublications()
})
</script>