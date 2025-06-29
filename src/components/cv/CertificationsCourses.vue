<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-bold text-gray-800 dark:text-white">Certifications & Online Courses</h2>
      <div class="flex items-center space-x-2">
        <svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
        <span class="text-sm text-gray-600 dark:text-gray-400">{{ totalCertifications }} Certifications</span>
      </div>
    </div>

    <!-- Platform Tabs -->
    <div class="flex space-x-2 mb-6">
      <button
        v-for="platform in platforms"
        :key="platform.name"
        @click="activePlatform = platform.name"
        :class="[
          'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
          activePlatform === platform.name
            ? 'bg-blue-600 text-white shadow-lg'
            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
        ]"
      >
        <div class="flex items-center space-x-2">
          <span>{{ platform.name }}</span>
          <span class="bg-white bg-opacity-20 px-2 py-0.5 rounded-full text-xs">
            {{ platform.count }}
          </span>
        </div>
      </button>
    </div>

    <!-- Certifications Grid -->
    <div class="grid gap-6">
      <div v-for="cert in filteredCertifications" :key="cert.id"
           class="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6 border border-gray-200 dark:border-gray-600 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div class="flex justify-between items-start mb-4">
          <div class="flex-1">
            <div class="flex items-center mb-3">
              <div class="w-8 h-8 rounded-lg mr-3 flex items-center justify-center text-white font-bold text-sm"
                   :class="cert.platform === 'Coursera' ? 'bg-blue-600' : 'bg-orange-500'">
                {{ cert.platform.charAt(0) }}
              </div>
              <h3 class="text-lg font-semibold text-gray-800 dark:text-white">
                {{ cert.title }}
              </h3>
            </div>
            <p class="text-gray-600 dark:text-gray-300 text-sm mb-3">
              <span class="font-medium">{{ cert.platform }}</span>
              <span v-if="cert.issuedDate" class="ml-2 text-gray-500">
                • Issued {{ cert.issuedDate }}
              </span>
            </p>
            <div class="flex flex-wrap gap-2 mb-3">
              <span v-for="tag in cert.tags" :key="tag"
                    class="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full text-xs font-medium">
                {{ tag }}
              </span>
            </div>
            <div v-if="cert.credentialId" class="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
              Credential ID: {{ cert.credentialId }}
            </div>
          </div>
          <div class="ml-4">
            <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
              {{ cert.platform.charAt(0) }}
            </div>
          </div>
        </div>

        <div class="flex justify-between items-center">
          <div class="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
            <span class="flex items-center">
              <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
              </svg>
              {{ cert.duration || 'Self-paced' }}
            </span>
          </div>
          <button class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium">
            View Credential →
          </button>
        </div>
      </div>
    </div>

    <!-- Statistics -->
    <div class="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
        <div class="text-2xl font-bold">{{ totalCertifications }}</div>
        <div class="text-sm opacity-90">Total Certifications</div>
      </div>
      <div class="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 text-white">
        <div class="text-2xl font-bold">{{ platforms.length - 1 }}</div>
        <div class="text-sm opacity-90">Learning Platforms</div>
      </div>
      <div class="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-4 text-white">
        <div class="text-2xl font-bold">2</div>
        <div class="text-sm opacity-90">Years of Learning</div>
      </div>
      <div class="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-4 text-white">
        <div class="text-2xl font-bold">8+</div>
        <div class="text-sm opacity-90">Skill Categories</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activePlatform = ref('All')

const certifications = ref([
  {
    id: 1,
    title: "Introduction to Data Science in Python",
    platform: "Coursera",
    issuedDate: "Jun 2017",
    credentialId: "KBW4QAEWLFV9",
    duration: "4 weeks",
    tags: ["Python", "Data Science", "Machine Learning"]
  },
  {
    id: 2,
    title: "Analyzing Police Activity with pandas",
    platform: "DataCamp",
    issuedDate: "2017",
    duration: "4 hours",
    tags: ["pandas", "Data Analysis", "Python"]
  },
  {
    id: 3,
    title: "Cleaning Data in Python",
    platform: "DataCamp",
    issuedDate: "2017",
    duration: "4 hours",
    tags: ["Data Cleaning", "Python", "pandas"]
  },
  {
    id: 4,
    title: "Cloud Computing for Everyone",
    platform: "DataCamp",
    issuedDate: "2017",
    duration: "3 hours",
    tags: ["Cloud Computing", "AWS", "Technology"]
  },
  {
    id: 5,
    title: "Conda Essentials",
    platform: "DataCamp",
    issuedDate: "2017",
    duration: "2 hours",
    tags: ["Conda", "Environment Management", "Python"]
  },
  {
    id: 6,
    title: "Fundamentals of Machine Learning with Python Tracks",
    platform: "DataCamp",
    issuedDate: "2017",
    duration: "20 hours",
    tags: ["Machine Learning", "Python", "scikit-learn"]
  },
  {
    id: 7,
    title: "Importing Data in Python (Part 1)",
    platform: "DataCamp",
    issuedDate: "2017",
    duration: "4 hours",
    tags: ["Data Import", "Python", "pandas"]
  },
  {
    id: 8,
    title: "Importing Data in Python (Part 2)",
    platform: "DataCamp",
    issuedDate: "2017",
    duration: "4 hours",
    tags: ["Data Import", "Python", "Advanced"]
  },
  {
    id: 9,
    title: "Intermediate Python for Data Science",
    platform: "DataCamp",
    issuedDate: "2017",
    duration: "4 hours",
    tags: ["Python", "Intermediate", "Data Science"]
  },
  {
    id: 10,
    title: "Intro to SQL for Data Science",
    platform: "DataCamp",
    issuedDate: "2017",
    duration: "4 hours",
    tags: ["SQL", "Database", "Data Science"]
  },
  {
    id: 11,
    title: "Introduction to AWS Boto",
    platform: "DataCamp",
    issuedDate: "2017",
    duration: "3 hours",
    tags: ["AWS", "Boto", "Cloud Services"]
  },
  {
    id: 12,
    title: "Introduction to Data Visualization with Python",
    platform: "DataCamp",
    issuedDate: "2017",
    duration: "4 hours",
    tags: ["Data Visualization", "Python", "Matplotlib"]
  },
  {
    id: 13,
    title: "Introduction to Python",
    platform: "DataCamp",
    issuedDate: "2017",
    duration: "4 hours",
    tags: ["Python", "Programming", "Basics"]
  },
  {
    id: 14,
    title: "Machine Learning Fundamentals",
    platform: "DataCamp",
    issuedDate: "2017",
    duration: "4 hours",
    tags: ["Machine Learning", "Fundamentals", "AI"]
  },
  {
    id: 15,
    title: "Manipulating DataFrames with pandas",
    platform: "DataCamp",
    issuedDate: "2017",
    duration: "4 hours",
    tags: ["pandas", "DataFrames", "Data Manipulation"]
  },
  {
    id: 16,
    title: "Merging DataFrames with pandas",
    platform: "DataCamp",
    issuedDate: "2017",
    duration: "4 hours",
    tags: ["pandas", "Data Merging", "Data Analysis"]
  },
  {
    id: 17,
    title: "Pandas Foundation",
    platform: "DataCamp",
    issuedDate: "2017",
    duration: "4 hours",
    tags: ["pandas", "Foundation", "Data Analysis"]
  },
  {
    id: 18,
    title: "Python Data Science Toolbox (Part 1)",
    platform: "DataCamp",
    issuedDate: "2017",
    duration: "4 hours",
    tags: ["Python", "Data Science", "Toolbox"]
  },
  {
    id: 19,
    title: "Statistical Thinking in Python",
    platform: "DataCamp",
    issuedDate: "2017",
    duration: "4 hours",
    tags: ["Statistics", "Python", "Data Analysis"]
  },
  {
    id: 20,
    title: "Supervised Learning with scikit-learn",
    platform: "DataCamp",
    issuedDate: "2017",
    duration: "4 hours",
    tags: ["Supervised Learning", "scikit-learn", "Machine Learning"]
  },
  {
    id: 21,
    title: "Unsupervised Learning in Python",
    platform: "DataCamp",
    issuedDate: "2017",
    duration: "4 hours",
    tags: ["Unsupervised Learning", "Python", "Machine Learning"]
  }
])

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

const filteredCertifications = computed(() => {
  if (activePlatform.value === 'All') {
    return certifications.value
  }
  return certifications.value.filter(cert => cert.platform === activePlatform.value)
})

const totalCertifications = computed(() => certifications.value.length)
</script>