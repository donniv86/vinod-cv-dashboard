<template>
  <div class="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
    <h3 class="text-xl font-semibold text-black dark:text-white mb-6">Education & Certifications</h3>

    <div class="space-y-8">
      <!-- Education History -->
      <div>
        <h4 class="text-lg font-semibold text-black dark:text-white mb-4 flex items-center">
          <span class="w-5 h-5 mr-2 text-primary">🎓</span>
          Academic Background
        </h4>

        <div class="space-y-6">
          <div
            v-for="education in educationHistory"
            :key="education.id"
            class="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 hover:bg-white dark:hover:bg-gray-700 group"
          >
            <div class="flex flex-col lg:flex-row lg:justify-between lg:items-start">
              <div class="flex-1">
                <h5 class="text-xl font-bold text-black dark:text-white group-hover:text-primary transition-colors duration-300 mb-2">
                  {{ education.degree }}
                </h5>
                <p class="text-lg text-primary font-medium mb-2">
                  {{ education.institution }}
                </p>
                <div class="flex flex-wrap items-center gap-4 text-bodydark2 mb-3">
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
                <p class="text-bodydark leading-relaxed mb-3">
                  {{ education.description }}
                </p>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="achievement in education.achievements"
                    :key="achievement"
                    class="px-3 py-1 bg-success/10 text-success rounded-full text-sm hover:bg-success hover:text-white transition-all duration-300 cursor-default"
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
        <h4 class="text-lg font-semibold text-black dark:text-white mb-4 flex items-center">
          <span class="w-5 h-5 mr-2 text-primary">🏆</span>
          Certifications
        </h4>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            v-for="cert in certifications"
            :key="cert.id"
            class="bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/20 rounded-lg p-4 hover:shadow-lg transition-all duration-300 hover:scale-105 hover:from-primary/10 hover:to-secondary/10 group"
          >
            <div class="flex items-start justify-between mb-3">
              <h5 class="font-semibold text-black dark:text-white group-hover:text-primary transition-colors duration-300">
                {{ cert.name }}
              </h5>
              <span class="text-xs text-bodydark2 bg-white dark:bg-gray-700 px-2 py-1 rounded">
                {{ cert.year }}
              </span>
            </div>
            <p class="text-bodydark text-sm mb-3">
              {{ cert.issuer }}
            </p>
            <div class="flex items-center justify-between">
              <span class="text-xs text-bodydark2">
                ID: {{ cert.id }}
              </span>
              <a
                v-if="cert.url"
                :href="cert.url"
                target="_blank"
                class="text-primary hover:text-primary/80 transition-colors duration-300 text-sm font-medium"
              >
                View Certificate →
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Additional Training -->
      <div>
        <h4 class="text-lg font-semibold text-black dark:text-white mb-4 flex items-center">
          <span class="w-5 h-5 mr-2 text-primary">📚</span>
          Additional Training
        </h4>

        <div class="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-lg p-6">
          <ul class="space-y-3 text-bodydark">
            <li v-for="training in additionalTraining" :key="training" class="flex items-center hover:text-primary transition-colors duration-300">
              <span class="mr-3 text-primary">✓</span>
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