<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
    <div class="space-y-8">
      <!-- Hero Section with Summary Chart -->
      <div class="gradient-card animate-fade-in-up" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);">
        <div class="flex flex-col lg:flex-row items-center justify-between mb-8">
          <div class="text-center lg:text-left">
            <h1 class="text-4xl lg:text-6xl font-black mb-4 text-white drop-shadow-lg bg-black/20 px-4 py-2 rounded-lg" style="color: white !important;">
              Certifications & Courses
            </h1>
            <p class="text-xl lg:text-2xl mb-6 text-white/90 font-medium">
              Continuous Learning Journey
            </p>
            <p class="text-lg mb-8 text-white/80 font-light">
              {{ totalCertifications }} certifications across {{ platforms.length - 1 }} platforms
            </p>
          </div>
          <div class="text-center lg:text-right mt-8 lg:mt-0">
            <div class="text-6xl lg:text-8xl font-black text-white/90 mb-2">{{ totalCertifications }}</div>
            <div class="text-xl text-white/80 font-medium">Total Certifications</div>
          </div>
        </div>

        <!-- Category Summary Chart -->
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          <div v-for="(category, index) in categoryStats" :key="category.name"
               class="modern-card p-4 text-center transition-all duration-300 hover:scale-105"
               :style="{ animationDelay: `${index * 0.1}s` }">
            <div class="text-2xl font-black text-transparent bg-clip-text mb-2"
                 :style="{ backgroundImage: category.gradient }">{{ category.count }}</div>
            <div class="text-sm text-white/80 font-medium">{{ category.name }}</div>
            <div class="text-xs text-white/60 mt-1">{{ category.percentage }}%</div>
          </div>
        </div>

        <!-- Platform Distribution -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="modern-card p-6">
            <h3 class="text-xl font-bold text-white mb-4 bg-black/20 px-4 py-2 rounded-lg drop-shadow-lg" style="color: white !important;">Platform Distribution</h3>
            <div class="space-y-3">
              <div v-for="platform in platforms.slice(1)" :key="platform.name"
                   class="flex items-center justify-between">
                <div class="flex items-center">
                  <div class="w-4 h-4 rounded-full mr-3"
                       :style="{ background: getPlatformColor(platform.name) }"></div>
                  <span class="text-white/90 font-medium">{{ platform.name }}</span>
                </div>
                <div class="flex items-center">
                  <div class="w-24 bg-white/20 rounded-full h-2 mr-3">
                    <div class="h-2 rounded-full transition-all duration-500"
                         :style="{
                           width: `${(platform.count / totalCertifications) * 100}%`,
                           background: getPlatformColor(platform.name)
                         }"></div>
                  </div>
                  <span class="text-white/80 text-sm font-bold">{{ platform.count }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="modern-card p-6">
            <h3 class="text-xl font-bold text-white mb-4 bg-black/20 px-4 py-2 rounded-lg drop-shadow-lg" style="color: white !important;">Learning Focus Areas</h3>
            <div class="space-y-3">
              <div v-for="focus in topFocusAreas" :key="focus.name"
                   class="flex items-center justify-between">
                <span class="text-white/90 font-medium">{{ focus.name }}</span>
                <div class="flex items-center">
                  <div class="w-20 bg-white/20 rounded-full h-2 mr-3">
                    <div class="h-2 rounded-full transition-all duration-500"
                         :style="{
                           width: `${(focus.count / Math.max(...topFocusAreas.map(f => f.count))) * 100}%`,
                           background: focus.gradient
                         }"></div>
                  </div>
                  <span class="text-white/80 text-sm font-bold">{{ focus.count }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Category Filter Tabs -->
      <div class="modern-card p-6">
        <div class="flex flex-wrap gap-3 mb-6">
          <button
            v-for="category in allCategories"
            :key="category.name"
            @click="activeCategory = category.name"
            :class="[
              'px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300',
              activeCategory === category.name
                ? 'text-white shadow-lg'
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            ]"
            :style="activeCategory === category.name ? { background: category.gradient } : {}"
          >
            <div class="flex items-center space-x-2">
              <span>{{ category.name }}</span>
              <span class="bg-white/20 px-2 py-0.5 rounded-full text-xs font-bold">
                {{ category.count }}
              </span>
            </div>
          </button>
        </div>

        <!-- Certifications Grid -->
        <div class="grid gap-6">
          <div v-for="cert in filteredCertifications" :key="cert.id"
               class="modern-card p-6 hover:scale-105 transition-all duration-300 cursor-pointer">
            <div class="flex justify-between items-start mb-4">
              <div class="flex-1">
                <div class="flex items-center mb-3">
                  <div class="w-12 h-12 rounded-xl mr-4 flex items-center justify-center text-white font-bold text-lg backdrop-blur-sm"
                       :style="{ background: getPlatformColor(cert.platform) }">
                    {{ cert.platform.charAt(0) }}
                  </div>
                  <div>
                    <h3 class="text-xl font-bold text-white mb-1 bg-black/20 px-4 py-2 rounded-lg drop-shadow-lg" style="color: white !important;">
                      {{ cert.title }}
                    </h3>
                    <div class="flex items-center text-sm text-gray-300">
                      <span class="font-medium">{{ cert.platform }}</span>
                      <span v-if="cert.issuedDate" class="ml-2 text-gray-400">
                        • {{ cert.issuedDate }}
                      </span>
                      <span class="ml-2 text-gray-400">• {{ cert.duration }}</span>
                    </div>
                  </div>
                </div>

                <div class="flex flex-wrap gap-2 mb-4">
                  <span v-for="tag in cert.tags" :key="tag"
                        class="modern-badge text-xs font-medium">
                    {{ tag }}
                  </span>
                </div>

                <div class="flex items-center justify-between">
                  <div class="flex items-center text-sm text-gray-400">
                    <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                    </svg>
                    <span v-if="cert.credentialId">Credential ID: {{ cert.credentialId }}</span>
                    <span v-else>Self-paced learning</span>
                  </div>
                  <div class="text-blue-400 hover:text-blue-300 text-sm font-semibold transition-colors">
                    View Details →
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeCategory = ref('All')

// Enhanced certifications data with categories
const certifications = ref([
  {
    id: 1,
    title: "Introduction to Data Science in Python",
    platform: "Coursera",
    issuedDate: "Jun 2017",
    credentialId: "KBW4QAEWLFV9",
    duration: "4 weeks",
    tags: ["Python", "Data Science", "Machine Learning"],
    category: "Data Science"
  },
  {
    id: 2,
    title: "Analyzing Police Activity with pandas",
    platform: "DataCamp",
    issuedDate: "2017",
    duration: "4 hours",
    tags: ["pandas", "Data Analysis", "Python"],
    category: "Data Analysis"
  },
  {
    id: 3,
    title: "Cleaning Data in Python",
    platform: "DataCamp",
    issuedDate: "2017",
    duration: "4 hours",
    tags: ["Data Cleaning", "Python", "pandas"],
    category: "Data Analysis"
  },
  {
    id: 4,
    title: "Cloud Computing for Everyone",
    platform: "DataCamp",
    issuedDate: "2017",
    duration: "3 hours",
    tags: ["Cloud Computing", "AWS", "Technology"],
    category: "Cloud Computing"
  },
  {
    id: 5,
    title: "Conda Essentials",
    platform: "DataCamp",
    issuedDate: "2017",
    duration: "2 hours",
    tags: ["Conda", "Environment Management", "Python"],
    category: "Development Tools"
  },
  {
    id: 6,
    title: "Fundamentals of Machine Learning with Python Tracks",
    platform: "DataCamp",
    issuedDate: "2017",
    duration: "20 hours",
    tags: ["Machine Learning", "Python", "scikit-learn"],
    category: "Machine Learning"
  },
  {
    id: 7,
    title: "Importing Data in Python (Part 1)",
    platform: "DataCamp",
    issuedDate: "2017",
    duration: "4 hours",
    tags: ["Data Import", "Python", "pandas"],
    category: "Data Analysis"
  },
  {
    id: 8,
    title: "Importing Data in Python (Part 2)",
    platform: "DataCamp",
    issuedDate: "2017",
    duration: "4 hours",
    tags: ["Data Import", "Python", "Advanced"],
    category: "Data Analysis"
  },
  {
    id: 9,
    title: "Intermediate Python for Data Science",
    platform: "DataCamp",
    issuedDate: "2017",
    duration: "4 hours",
    tags: ["Python", "Intermediate", "Data Science"],
    category: "Programming"
  },
  {
    id: 10,
    title: "Intro to SQL for Data Science",
    platform: "DataCamp",
    issuedDate: "2017",
    duration: "4 hours",
    tags: ["SQL", "Database", "Data Science"],
    category: "Database"
  },
  {
    id: 11,
    title: "Introduction to AWS Boto",
    platform: "DataCamp",
    issuedDate: "2017",
    duration: "3 hours",
    tags: ["AWS", "Boto", "Cloud Services"],
    category: "Cloud Computing"
  },
  {
    id: 12,
    title: "Introduction to Data Visualization with Python",
    platform: "DataCamp",
    issuedDate: "2017",
    duration: "4 hours",
    tags: ["Data Visualization", "Python", "Matplotlib"],
    category: "Data Visualization"
  },
  {
    id: 13,
    title: "Introduction to Python",
    platform: "DataCamp",
    issuedDate: "2017",
    duration: "4 hours",
    tags: ["Python", "Programming", "Basics"],
    category: "Programming"
  },
  {
    id: 14,
    title: "Machine Learning Fundamentals",
    platform: "DataCamp",
    issuedDate: "2017",
    duration: "4 hours",
    tags: ["Machine Learning", "Fundamentals", "AI"],
    category: "Machine Learning"
  },
  {
    id: 15,
    title: "Manipulating DataFrames with pandas",
    platform: "DataCamp",
    issuedDate: "2017",
    duration: "4 hours",
    tags: ["pandas", "DataFrames", "Data Manipulation"],
    category: "Data Analysis"
  },
  {
    id: 16,
    title: "Merging DataFrames with pandas",
    platform: "DataCamp",
    issuedDate: "2017",
    duration: "4 hours",
    tags: ["pandas", "Data Merging", "Data Analysis"],
    category: "Data Analysis"
  },
  {
    id: 17,
    title: "Pandas Foundation",
    platform: "DataCamp",
    issuedDate: "2017",
    duration: "4 hours",
    tags: ["pandas", "Foundation", "Data Analysis"],
    category: "Data Analysis"
  },
  {
    id: 18,
    title: "Python Data Science Toolbox (Part 1)",
    platform: "DataCamp",
    issuedDate: "2017",
    duration: "4 hours",
    tags: ["Python", "Data Science", "Toolbox"],
    category: "Data Science"
  },
  {
    id: 19,
    title: "Statistical Thinking in Python",
    platform: "DataCamp",
    issuedDate: "2017",
    duration: "4 hours",
    tags: ["Statistics", "Python", "Data Analysis"],
    category: "Statistics"
  },
  {
    id: 20,
    title: "Supervised Learning with scikit-learn",
    platform: "DataCamp",
    issuedDate: "2017",
    duration: "4 hours",
    tags: ["Supervised Learning", "scikit-learn", "Machine Learning"],
    category: "Machine Learning"
  },
  {
    id: 21,
    title: "Unsupervised Learning in Python",
    platform: "DataCamp",
    issuedDate: "2017",
    duration: "4 hours",
    tags: ["Unsupervised Learning", "Python", "Machine Learning"],
    category: "Machine Learning"
  }
])

// Category definitions with gradients
const categoryDefinitions = {
  'Data Science': { gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  'Data Analysis': { gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
  'Machine Learning': { gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
  'Programming': { gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
  'Data Visualization': { gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
  'Cloud Computing': { gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' },
  'Database': { gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)' },
  'Statistics': { gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)' },
  'Development Tools': { gradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)' }
}

// Computed properties
const platforms = computed(() => {
  const platformCounts = {}
  certifications.value.forEach(cert => {
    platformCounts[cert.platform] = (platformCounts[cert.platform] || 0) + 1
  })

  return [
    { name: 'All', count: certifications.value.length },
    ...Object.entries(platformCounts).map(([name, count]) => ({
      name,
      count
    }))
  ]
})

const categoryStats = computed(() => {
  const categoryCounts = {}
  certifications.value.forEach(cert => {
    categoryCounts[cert.category] = (categoryCounts[cert.category] || 0) + 1
  })

  return Object.entries(categoryCounts)
    .map(([name, count]) => ({
      name,
      count,
      percentage: Math.round((count / certifications.value.length) * 100),
      gradient: categoryDefinitions[name]?.gradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }))
    .sort((a, b) => b.count - a.count)
})

const allCategories = computed(() => {
  const categoryCounts = {}
  certifications.value.forEach(cert => {
    categoryCounts[cert.category] = (categoryCounts[cert.category] || 0) + 1
  })

  return [
    { name: 'All', count: certifications.value.length, gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
    ...Object.entries(categoryCounts)
      .map(([name, count]) => ({
        name,
        count,
        gradient: categoryDefinitions[name]?.gradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }))
      .sort((a, b) => b.count - a.count)
  ]
})

const filteredCertifications = computed(() => {
  if (activeCategory.value === 'All') {
    return certifications.value
  }
  return certifications.value.filter(cert => cert.category === activeCategory.value)
})

const totalCertifications = computed(() => certifications.value.length)

const topFocusAreas = computed(() => {
  const focusCounts = {}
  certifications.value.forEach(cert => {
    cert.tags.forEach(tag => {
      focusCounts[tag] = (focusCounts[tag] || 0) + 1
    })
  })

  return Object.entries(focusCounts)
    .map(([name, count]) => ({
      name,
      count,
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)
})

// Helper functions
const getPlatformColor = (platform) => {
  const colors = {
    'Coursera': 'linear-gradient(135deg, #0056D2 0%, #0056D2 100%)',
    'DataCamp': 'linear-gradient(135deg, #05192D 0%, #05192D 100%)'
  }
  return colors[platform] || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
}
</script>