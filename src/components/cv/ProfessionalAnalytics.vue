<template>
  <div class="rounded-sm border border-gray-700 bg-gray-900/50 backdrop-blur-sm px-5 pt-6 pb-2.5 shadow-default sm:px-7.5 xl:pb-1">
    <div class="mb-6">
      <h3 class="text-xl font-semibold text-white mb-2 bg-black/20 px-4 py-2 rounded-lg drop-shadow-lg" style="color: white !important;">
        📊 Professional Analytics
      </h3>
      <p class="text-gray-300">Real-time insights into career progression and impact</p>
    </div>

    <!-- Key Metrics Row -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div class="card-metric p-4 rounded-lg">
        <div class="flex items-center justify-between">
          <div>
            <p class="card-metric-label">Total Citations</p>
            <p class="card-metric-value">{{ citations }}</p>
          </div>
          <div class="text-3xl">📚</div>
        </div>
        <div class="mt-2 text-xs card-metric-label">
          +{{ citationsGrowth }}% recent (2020+)
        </div>
      </div>

      <div class="card-metric p-4 rounded-lg">
        <div class="flex items-center justify-between">
          <div>
            <p class="card-metric-label">H-Index</p>
            <p class="card-metric-value">{{ hIndex }}</p>
          </div>
          <div class="text-3xl">🎯</div>
        </div>
        <div class="mt-2 text-xs card-metric-label">
          Recent: {{ recentHIndex }} (2020+)
        </div>
      </div>

      <div class="card-metric p-4 rounded-lg">
        <div class="flex items-center justify-between">
          <div>
            <p class="card-metric-label">i10-Index</p>
            <p class="card-metric-value">{{ i10Index }}</p>
          </div>
          <div class="text-3xl">📊</div>
        </div>
        <div class="mt-2 text-xs card-metric-label">
          Papers with 10+ citations
        </div>
      </div>

      <div class="card-metric p-4 rounded-lg">
        <div class="flex items-center justify-between">
          <div>
            <p class="card-metric-label">Recent Citations</p>
            <p class="card-metric-value">{{ recentCitations }}</p>
          </div>
          <div class="text-3xl">🚀</div>
        </div>
        <div class="mt-2 text-xs card-metric-label">
          Since 2020
        </div>
      </div>
    </div>

    <!-- Growth Charts -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Publication Growth -->
      <div class="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
        <h4 class="font-semibold text-white mb-4">📈 Publication Growth</h4>
        <div class="space-y-3">
          <div v-for="year in publicationGrowth" :key="year.year" class="flex items-center justify-between">
            <span class="text-sm text-gray-300">{{ year.year }}</span>
            <div class="flex items-center space-x-2">
              <div class="w-24 bg-gray-600 rounded-full h-2">
                <div class="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000"
                     :style="{ width: (year.publications / maxPublications * 100) + '%' }"></div>
              </div>
              <span class="text-xs font-medium text-cyan-400 w-8">{{ year.publications }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Skill Evolution -->
      <div class="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
        <h4 class="font-semibold text-white mb-4">🚀 Skill Evolution</h4>
        <div class="space-y-3">
          <div v-for="skill in skillEvolution" :key="skill.name" class="flex items-center justify-between">
            <span class="text-sm text-gray-300">{{ skill.name }}</span>
            <div class="flex items-center space-x-2">
              <div class="w-24 bg-gray-600 rounded-full h-2">
                <div class="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-1000"
                     :style="{ width: skill.progress + '%' }"></div>
              </div>
              <span class="text-xs font-medium text-cyan-400 w-8">{{ skill.progress }}%</span>
            </div>
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
const i10Index = ref(0)
const recentCitations = ref(0)
const recentHIndex = ref(0)
const patents = ref(0)
const patentsPending = ref(0)
const industryImpact = ref(0)

const publicationGrowth = ref([
  { year: '2014', publications: 8 },
  { year: '2015', publications: 3 },
  { year: '2017', publications: 1 },
  { year: '2018', publications: 1 },
  { year: '2019', publications: 2 },
  { year: '2021', publications: 1 },
  { year: '2023', publications: 1 },
  { year: '2024', publications: 1 }
])

const skillEvolution = ref([
  { name: 'CADD', progress: 0 },
  { name: 'Molecular Modeling', progress: 0 },
  { name: 'Drug Discovery', progress: 0 },
  { name: 'Schrödinger Suite', progress: 0 }
])

const maxPublications = Math.max(...publicationGrowth.value.map(p => p.publications))

const analyticsData = {
  publications: {
    total: 31,
    byYear: [
      { year: '2011', count: 1 },
      { year: '2012', count: 1 },
      { year: '2013', count: 3 },
      { year: '2014', count: 6 },
      { year: '2015', count: 3 },
      { year: '2016', count: 1 },
      { year: '2017', count: 1 },
      { year: '2018', count: 1 },
      { year: '2019', count: 2 },
      { year: '2020', count: 1 },
      { year: '2021', count: 1 },
      { year: '2022', count: 3 },
      { year: '2023', count: 4 },
      { year: '2024', count: 3 }
    ]
  },
  citations: {
    total: 1247,
    recent: 156,
    trend: '+12.5%',
    byJournal: [
      { journal: 'J. Phys. Chem. B', citations: 67, impact: 3.6 },
      { journal: 'RSC Advances', citations: 52, impact: 3.9 },
      { journal: 'J. Biomol. Struct. Dyn.', citations: 45, impact: 3.2 },
      { journal: 'Archiv der Pharmazie', citations: 42, impact: 4.1 },
      { journal: 'Med. Chem. Res.', citations: 42, impact: 2.8 },
      { journal: 'Int. J. Biol. Macromol.', citations: 41, impact: 6.2 },
      { journal: 'Curr. Top. Med. Chem.', citations: 48, impact: 3.4 },
      { journal: 'Dalton Trans.', citations: 36, impact: 4.6 },
      { journal: 'Bioorg. Chem.', citations: 35, impact: 5.1 },
      { journal: 'ACS Omega', citations: 31, impact: 4.1 }
    ]
  },
  researchAreas: [
    { area: 'Drug Discovery & Design', publications: 12, impact: 4.2 },
    { area: 'Computational Biology', publications: 8, impact: 3.8 },
    { area: 'Cancer Research', publications: 6, impact: 4.5 },
    { area: 'Molecular Dynamics', publications: 5, impact: 3.6 },
    { area: 'Medicinal Chemistry', publications: 4, impact: 3.1 },
    { area: 'Protein Interactions', publications: 3, impact: 4.8 },
    { area: 'Machine Learning', publications: 2, impact: 3.1 },
    { area: 'Spectroscopy', publications: 2, impact: 4.4 }
  ],
  collaborations: [
    { collaborator: 'Dr. Sujit Kumar Ghosh', institution: 'IIT Guwahati', papers: 8 },
    { collaborator: 'Dr. Bijo Mathew', institution: 'Amrita University', papers: 6 },
    { collaborator: 'Dr. Jayanthi Sivaraman', institution: 'IIT Madras', papers: 4 },
    { collaborator: 'Dr. Jainey P James', institution: 'Manipal University', papers: 4 },
    { collaborator: 'Dr. Himank Kumar', institution: 'IIT Delhi', papers: 6 },
    { collaborator: 'Dr. A Jerad Suresh', institution: 'SRM University', papers: 3 }
  ],
  impactMetrics: {
    hIndex: 16,
    i10Index: 20,
    averageCitations: 40.2,
    topCitedPaper: {
      title: "Design, synthesis, physicochemical studies, solvation, and DNA damage of quinoline-appended chalcone derivative",
      citations: 67,
      journal: "The Journal of Physical Chemistry B",
      year: 2014
    }
  }
}

onMounted(() => {
  // Animate counters with real data
  animateCounter(citations, 682, 100)
  animateCounter(hIndex, 16, 50)
  animateCounter(i10Index, 20, 60)
  animateCounter(recentCitations, 457, 80)
  animateCounter(recentHIndex, 12, 70)
  animateCounter(citationsGrowth, 67, 120) // 457/682 * 100
  animateCounter(patents, 8, 80)
  animateCounter(patentsPending, 3, 120)
  animateCounter(industryImpact, 15, 60)

  // Animate skill progress
  setTimeout(() => {
    skillEvolution.value[0].progress = 95 // CADD
    skillEvolution.value[1].progress = 92 // Molecular Modeling
    skillEvolution.value[2].progress = 88 // Drug Discovery
    skillEvolution.value[3].progress = 90 // Schrödinger Suite
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