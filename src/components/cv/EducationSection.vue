<template>
  <div class="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
    <h3 class="text-xl font-semibold text-black dark:text-white mb-6">Education & Certifications</h3>

    <div class="space-y-6">
      <!-- Education -->
      <div>
        <h4 class="text-lg font-semibold text-black dark:text-white mb-4 flex items-center">
          <GraduationCapIcon class="w-5 h-5 mr-2 text-primary" />
          Education
        </h4>

        <div class="space-y-4">
          <div
            v-for="education in educationHistory"
            :key="education.id"
            class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4"
          >
            <div class="flex justify-between items-start mb-2">
              <div>
                <h5 class="font-bold text-black dark:text-white">
                  {{ education.degree }}
                </h5>
                <p class="text-primary font-medium">
                  {{ education.institution }}
                </p>
              </div>
              <div class="text-right">
                <p class="text-bodydark2">{{ education.year }}</p>
                <p class="text-sm text-bodydark2">{{ education.location }}</p>
              </div>
            </div>

            <p class="text-bodydark mb-2">
              {{ education.description }}
            </p>

            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <span class="text-sm text-bodydark2 mr-4">GPA: {{ education.gpa }}</span>
                <span class="text-sm text-bodydark2">Major: {{ education.major }}</span>
              </div>
              <div class="flex space-x-2">
                <span
                  v-for="achievement in education.achievements"
                  :key="achievement"
                  class="px-2 py-1 bg-success/10 text-success rounded text-xs"
                >
                  {{ achievement }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Certifications -->
      <div>
        <h4 class="text-lg font-semibold text-black dark:text-white mb-4 flex items-center">
          <CertificateIcon class="w-5 h-5 mr-2 text-primary" />
          Certifications
        </h4>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            v-for="cert in certifications"
            :key="cert.id"
            class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div class="flex justify-between items-start mb-2">
              <div>
                <h5 class="font-bold text-black dark:text-white">
                  {{ cert.name }}
                </h5>
                <p class="text-primary font-medium">
                  {{ cert.issuer }}
                </p>
              </div>
              <div class="text-right">
                <p class="text-bodydark2">{{ cert.year }}</p>
                <p class="text-sm text-bodydark2">{{ cert.expiry }}</p>
              </div>
            </div>

            <p class="text-bodydark mb-3">
              {{ cert.description }}
            </p>

            <div class="flex justify-between items-center">
              <span class="text-sm text-bodydark2">ID: {{ cert.id }}</span>
              <a
                :href="cert.verification"
                target="_blank"
                class="text-primary hover:underline text-sm"
              >
                Verify Certificate
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Skills Summary -->
      <div class="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-4">
        <h4 class="font-semibold text-black dark:text-white mb-3">Academic Highlights</h4>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div class="text-2xl font-bold text-primary">{{ educationHistory.length }}</div>
            <div class="text-sm text-bodydark2">Degrees</div>
          </div>
          <div>
            <div class="text-2xl font-bold text-success">{{ certifications.length }}</div>
            <div class="text-sm text-bodydark2">Certifications</div>
          </div>
          <div>
            <div class="text-2xl font-bold text-warning">3.8</div>
            <div class="text-sm text-bodydark2">Average GPA</div>
          </div>
          <div>
            <div class="text-2xl font-bold text-danger">5+</div>
            <div class="text-sm text-bodydark2">Years Study</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { GraduationCapIcon, CertificateIcon } from '@heroicons/vue/24/outline'

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
    description: 'Dual inhibitor design of Aurora Kinase Subtypes A and B: Identified dual inhibitors through pharmacophore design, docking studies, and 3D QSAR analysis.',
    achievements: ['Research Project', 'Molecular Modeling']
  },
  {
    id: 3,
    degree: 'B.Pharm. in Pharmacy',
    institution: 'The Tamil Nadu Dr. M.G.R. Medical University, Padmavathi College of Pharmacy',
    year: '2004 - 2008',
    location: 'Dharmapuri, India',
    gpa: 'N/A',
    major: 'Pharmacy',
    description: 'Evaluated Anthelmintic Activity of Cissus quadrangularis Linn. (Stem): Comprehensive computational phytochemistry study employing molecular docking, phytochemical analysis, and pharmacological assessment.',
    achievements: ['Research Project', 'Computational Studies']
  }
])

const certifications = ref([
  {
    id: 1,
    name: 'Data Science and Machine Learning',
    issuer: 'Coursera & DataCamp',
    year: '2020-2023',
    expiry: 'N/A',
    description: 'Completed coursework in core data science and machine learning concepts, including statistical learning, supervised and unsupervised learning algorithms.',
    id: 'DS-ML-001',
    verification: 'https://coursera.org'
  },
  {
    id: 2,
    name: 'Python Programming and Data Manipulation',
    issuer: 'DataCamp',
    year: '2020-2023',
    expiry: 'N/A',
    description: 'Developed proficiency in Python programming for data science, including data manipulation with pandas, data cleaning, and data import/export.',
    id: 'PYTHON-001',
    verification: 'https://datacamp.com'
  },
  {
    id: 3,
    name: 'Cloud Computing and Software Management',
    issuer: 'DataCamp',
    year: '2020-2023',
    expiry: 'N/A',
    description: 'Completed training in cloud computing fundamentals and AWS Boto, as well as software environment management with Conda.',
    id: 'CLOUD-001',
    verification: 'https://datacamp.com'
  },
  {
    id: 4,
    name: 'Data Analysis and Databases',
    issuer: 'DataCamp',
    year: '2020-2023',
    expiry: 'N/A',
    description: 'Gained experience in data analysis techniques using pandas and SQL, including statistical analysis and data visualization.',
    id: 'DATA-001',
    verification: 'https://datacamp.com'
  }
])
</script>