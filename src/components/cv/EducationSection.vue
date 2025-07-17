<template>
  <div class="rounded-sm border border-stroke bg-gray-900 px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
    <h3 class="glowing-section-title text-xl font-semibold mb-6 bg-black/20 px-4 py-2 rounded-lg">Education & Certifications</h3>

    <div class="space-y-8">
      <!-- Education History -->
      <div>
        <h4 class="glowing-section-title text-lg font-semibold mb-4 flex items-center">
          <span class="w-5 h-5 mr-2 text-cyan-400">🎓</span>
          Academic Background
        </h4>

        <div class="space-y-6">
          <div
            v-for="education in educationHistory"
            :key="education.id"
            class="bg-gray-700/80 backdrop-blur-sm border border-gray-600 rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 hover:bg-gray-600 group"
          >
            <div class="flex flex-col lg:flex-row lg:justify-between lg:items-start">
              <div class="flex-1">
                <h5 class="glowing-card-title text-xl font-bold mb-2">
                  {{ education.degree }}
                </h5>
                <p class="text-lg text-cyan-400 font-medium mb-2">
                  {{ education.institution }}
                </p>
                <div class="flex flex-wrap items-center gap-4 text-gray-300 mb-3">
                  <span class="flex items-center">
                    <span class="mr-1">📅</span>
                    {{ education.year }}
                  </span>
                  <span class="flex items-center">
                    <span class="mr-1">📍</span>
                    {{ education.location }}
                  </span>
                  <span v-if="education.gpa !== 'N/A'" class="flex items-center">
                    <span class="mr-1">📊</span>
                    GPA: {{ education.gpa }}
                  </span>
                </div>
                <p class="text-gray-200 leading-relaxed mb-3">
                  {{ education.description }}
                </p>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="achievement in education.achievements"
                    :key="achievement"
                    class="px-3 py-1 bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded-full text-sm hover:bg-cyan-500 hover:text-white transition-all duration-300 cursor-default shadow-lg"
                  >
                    {{ achievement }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Certifications -->
      <div>
        <h4 class="glowing-section-title text-lg font-semibold mb-4 flex items-center">
          <span class="w-5 h-5 mr-2 text-cyan-400">🏆</span>
          Certifications
        </h4>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            v-for="cert in certifications"
            :key="cert.id"
            class="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4 hover:shadow-lg transition-all duration-300 hover:scale-105 hover:bg-gray-800 group"
          >
            <div class="flex items-start justify-between mb-3">
              <h5 class="glowing-card-title font-semibold group-hover:text-cyan-300 transition-colors duration-300">
                {{ cert.name }}
              </h5>
              <span class="text-xs text-gray-300 bg-gray-700/50 border border-gray-600 px-2 py-1 rounded">
                {{ cert.year }}
              </span>
            </div>
            <p class="text-gray-200 text-sm mb-3">
              {{ cert.issuer }}
            </p>
            <div class="flex items-center justify-between">
              <span class="text-xs text-gray-400">
                ID: {{ cert.id }}
              </span>
              <a
                v-if="cert.url"
                :href="cert.url"
                target="_blank"
                class="text-cyan-400 hover:text-cyan-300 transition-colors duration-300 text-sm font-medium"
              >
                View Certificate →
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Additional Training -->
      <div>
        <h4 class="glowing-section-title text-lg font-semibold mb-4 flex items-center">
          <span class="w-5 h-5 mr-2 text-cyan-400">📚</span>
          Additional Training
        </h4>

        <div class="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
          <ul class="space-y-3 text-gray-200">
            <li v-for="training in additionalTraining" :key="training" class="flex items-center hover:text-cyan-300 transition-colors duration-300">
              <span class="mr-3 text-cyan-400">✓</span>
              {{ training }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const educationHistory = ref([
  {
    id: 1,
    degree: 'Ph.D. in Biotechnology',
    institution: 'Vellore Institute of Technology',
    year: '2016 - 2024',
    location: 'Vellore, India',
    gpa: 'N/A',
    major: 'Biotechnology',
    description: 'Interdisciplinary Approach to Antidiabetic Drug Discovery: Advanced antidiabetic therapeutic development through an integrated strategy combining computational drug design, phytochemistry, and bioformulation.',
    achievements: ['Research Excellence', 'Interdisciplinary Approach']
  },
  {
    id: 2,
    degree: 'M.Pharm. in Medicinal Chemistry',
    institution: 'The Tamil Nadu Dr. M.G.R. Medical University, Madras Medical College',
    year: '2009 - 2011',
    location: 'Chennai, India',
    gpa: 'N/A',
    major: 'Medicinal Chemistry',
    description: 'Specialized in drug design and development with focus on computational chemistry and molecular modeling techniques.',
    achievements: ['Medicinal Chemistry', 'Drug Design']
  },
  {
    id: 3,
    degree: 'B.Pharm.',
    institution: 'The Tamil Nadu Dr. M.G.R. Medical University, Madras Medical College',
    year: '2005 - 2009',
    location: 'Chennai, India',
    gpa: 'N/A',
    major: 'Pharmacy',
    description: 'Comprehensive foundation in pharmaceutical sciences, drug development, and clinical pharmacy.',
    achievements: ['Pharmaceutical Sciences', 'Clinical Pharmacy']
  }
])

const certifications = ref([
  {
    id: 'CERT001',
    name: 'Schrödinger Suite Certification',
    issuer: 'Schrödinger, Inc.',
    year: '2020',
    url: null
  },
  {
    id: 'CERT002',
    name: 'Machine Learning for Drug Discovery',
    issuer: 'Coursera',
    year: '2019',
    url: null
  },
  {
    id: 'CERT003',
    name: 'Python for Data Science',
    issuer: 'DataCamp',
    year: '2018',
    url: null
  },
  {
    id: 'CERT004',
    name: 'Molecular Modeling & Simulation',
    issuer: 'Schrödinger, Inc.',
    year: '2017',
    url: null
  }
])

const additionalTraining = ref([
  'Advanced Molecular Dynamics Simulation Techniques',
  'Machine Learning Applications in Drug Discovery',
  'High-Throughput Virtual Screening Methods',
  'Structure-Based Drug Design Principles',
  'Cheminformatics and QSAR Modeling',
  'Cloud Computing for Scientific Applications',
  'Project Management in Research & Development'
])
</script>