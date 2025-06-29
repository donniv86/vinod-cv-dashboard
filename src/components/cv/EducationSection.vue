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
    degree: 'Master of Science in Computer Science',
    institution: 'Stanford University',
    year: '2020 - 2022',
    location: 'Stanford, CA',
    gpa: '3.9/4.0',
    major: 'Computer Science',
    description: 'Specialized in Artificial Intelligence and Machine Learning. Completed thesis on "Deep Learning Applications in Natural Language Processing".',
    achievements: ['Dean\'s List', 'Research Assistant']
  },
  {
    id: 2,
    degree: 'Bachelor of Science in Software Engineering',
    institution: 'University of California, Berkeley',
    year: '2016 - 2020',
    location: 'Berkeley, CA',
    gpa: '3.8/4.0',
    major: 'Software Engineering',
    description: 'Focused on software development methodologies, algorithms, and data structures. Completed capstone project on scalable web applications.',
    achievements: ['Honors Program', 'Dean\'s List']
  }
])

const certifications = ref([
  {
    id: 1,
    name: 'AWS Certified Solutions Architect',
    issuer: 'Amazon Web Services',
    year: '2023',
    expiry: '2026',
    description: 'Demonstrates expertise in designing distributed systems on AWS.',
    id: 'AWS-123456',
    verification: 'https://aws.amazon.com/verification'
  },
  {
    id: 2,
    name: 'Google Cloud Professional Developer',
    issuer: 'Google Cloud',
    year: '2022',
    expiry: '2025',
    description: 'Validates ability to build scalable applications on Google Cloud Platform.',
    id: 'GCP-789012',
    verification: 'https://cloud.google.com/certification'
  },
  {
    id: 3,
    name: 'Certified Kubernetes Administrator',
    issuer: 'Cloud Native Computing Foundation',
    year: '2021',
    expiry: '2024',
    description: 'Proves expertise in Kubernetes administration and operations.',
    id: 'CKA-345678',
    verification: 'https://www.cncf.io/certification'
  },
  {
    id: 4,
    name: 'MongoDB Certified Developer',
    issuer: 'MongoDB University',
    year: '2020',
    expiry: '2023',
    description: 'Validates skills in MongoDB application development and data modeling.',
    id: 'MDB-901234',
    verification: 'https://university.mongodb.com/certification'
  }
])
</script>