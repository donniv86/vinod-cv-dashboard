<template>
  <div class="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
    <div class="mb-6">
      <h3 class="text-xl font-semibold text-black dark:text-white mb-2">
        📊 Professional Analytics
      </h3>
      <p class="text-bodydark2">Real-time insights into career progression and impact</p>
    </div>

    <!-- Key Metrics Row -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div class="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 p-4 rounded-lg border border-emerald-200 dark:border-emerald-800">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-emerald-600 dark:text-emerald-400 font-medium">Citations</p>
            <p class="text-2xl font-bold text-emerald-800 dark:text-emerald-200">{{ citations }}</p>
          </div>
          <div class="text-3xl">📚</div>
        </div>
        <div class="mt-2 text-xs text-emerald-600 dark:text-emerald-400">
          +{{ citationsGrowth }}% this year
        </div>
      </div>

      <div class="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-blue-600 dark:text-blue-400 font-medium">H-Index</p>
            <p class="text-2xl font-bold text-blue-800 dark:text-blue-200">{{ hIndex }}</p>
          </div>
          <div class="text-3xl">🎯</div>
        </div>
        <div class="mt-2 text-xs text-blue-600 dark:text-blue-400">
          Top 10% in field
        </div>
      </div>

      <div class="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-purple-600 dark:text-purple-400 font-medium">Patents</p>
            <p class="text-2xl font-bold text-purple-800 dark:text-purple-200">{{ patents }}</p>
          </div>
          <div class="text-3xl">⚡</div>
        </div>
        <div class="mt-2 text-xs text-purple-600 dark:text-purple-400">
          {{ patentsPending }} pending
        </div>
      </div>

      <div class="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-orange-600 dark:text-orange-400 font-medium">Industry Impact</p>
            <p class="text-2xl font-bold text-orange-800 dark:text-orange-200">{{ industryImpact }}</p>
          </div>
          <div class="text-3xl">🏢</div>
        </div>
        <div class="mt-2 text-xs text-orange-600 dark:text-orange-400">
          Companies influenced
        </div>
      </div>
    </div>

    <!-- Growth Charts -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Publication Growth -->
      <div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
        <h4 class="font-semibold text-black dark:text-white mb-4">📈 Publication Growth</h4>
        <div class="space-y-3">
          <div v-for="year in publicationGrowth" :key="year.year" class="flex items-center justify-between">
            <span class="text-sm text-bodydark2">{{ year.year }}</span>
            <div class="flex items-center space-x-2">
              <div class="w-24 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                <div class="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000"
                     :style="{ width: (year.publications / maxPublications * 100) + '%' }"></div>
              </div>
              <span class="text-xs font-medium text-primary w-8">{{ year.publications }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Skill Evolution -->
      <div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
        <h4 class="font-semibold text-black dark:text-white mb-4">🚀 Skill Evolution</h4>
        <div class="space-y-3">
          <div v-for="skill in skillEvolution" :key="skill.name" class="flex items-center justify-between">
            <span class="text-sm text-bodydark2">{{ skill.name }}</span>
            <div class="flex items-center space-x-2">
              <div class="w-24 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                <div class="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-1000"
                     :style="{ width: skill.progress + '%' }"></div>
              </div>
              <span class="text-xs font-medium text-primary w-8">{{ skill.progress }}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Achievements -->
    <div class="mt-6">
      <h4 class="font-semibold text-black dark:text-white mb-4">🏆 Recent Achievements</h4>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="achievement in recentAchievements" :key="achievement.id"
             class="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow">
          <div class="flex items-start space-x-3">
            <div class="text-2xl">{{ achievement.icon }}</div>
            <div class="flex-1">
              <h5 class="font-medium text-black dark:text-white text-sm">{{ achievement.title }}</h5>
              <p class="text-xs text-bodydark2 mt-1">{{ achievement.description }}</p>
              <p class="text-xs text-primary mt-2">{{ achievement.date }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Industry Recognition -->
    <div class="mt-6 bg-gradient-to-r from-primary/5 to-secondary/5 p-4 rounded-lg border border-primary/20">
      <h4 class="font-semibold text-black dark:text-white mb-3">🏅 Industry Recognition</h4>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="flex items-center space-x-3">
          <div class="text-2xl">🥇</div>
          <div>
            <p class="font-medium text-black dark:text-white text-sm">Best Innovation Award</p>
            <p class="text-xs text-bodydark2">Pharmaceutical Research Society, 2023</p>
          </div>
        </div>
        <div class="flex items-center space-x-3">
          <div class="text-2xl">🎖️</div>
          <div>
            <p class="font-medium text-black dark:text-white text-sm">Excellence in AI/ML</p>
            <p class="text-xs text-bodydark2">Drug Discovery Summit, 2023</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const citations = ref(0)
const citationsGrowth = ref(0)
const hIndex = ref(0)
const patents = ref(0)
const patentsPending = ref(0)
const industryImpact = ref(0)

const publicationGrowth = ref([
  { year: '2019', publications: 3 },
  { year: '2020', publications: 5 },
  { year: '2021', publications: 7 },
  { year: '2022', publications: 9 },
  { year: '2023', publications: 12 }
])

const skillEvolution = ref([
  { name: 'AI/ML', progress: 0 },
  { name: 'Molecular Modeling', progress: 0 },
  { name: 'Drug Discovery', progress: 0 },
  { name: 'Programming', progress: 0 }
])

const recentAchievements = ref([
  {
    id: 1,
    icon: '🏆',
    title: 'Published in Nature',
    description: 'Breakthrough paper on AI-driven drug discovery',
    date: 'Dec 2023'
  },
  {
    id: 2,
    icon: '⚡',
    title: 'Patent Granted',
    description: 'Novel computational method for target identification',
    date: 'Nov 2023'
  },
  {
    id: 3,
    icon: '🎯',
    title: 'Industry Award',
    description: 'Best Innovation in Pharmaceutical Research',
    date: 'Oct 2023'
  }
])

const maxPublications = Math.max(...publicationGrowth.value.map(p => p.publications))

onMounted(() => {
  // Animate counters
  animateCounter(citations, 1250, 100)
  animateCounter(hIndex, 18, 50)
  animateCounter(patents, 8, 80)
  animateCounter(industryImpact, 15, 60)
  animateCounter(citationsGrowth, 25, 100)
  animateCounter(patentsPending, 3, 120)

  // Animate skill progress
  setTimeout(() => {
    skillEvolution.value[0].progress = 90
    skillEvolution.value[1].progress = 95
    skillEvolution.value[2].progress = 88
    skillEvolution.value[3].progress = 85
  }, 500)
})

const animateCounter = (ref: any, target: number, duration: number) => {
  const start = 0
  const increment = target / (duration / 16)
  let current = start

  const timer = setInterval(() => {
    current += increment
    if (current >= target) {
      current = target
      clearInterval(timer)
    }
    ref.value = Math.floor(current)
  }, 16)
}
</script>