<template>
  <div class="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
    <div class="flex flex-col lg:flex-row items-center lg:items-start gap-6">
      <!-- Profile Picture -->
      <div class="flex-shrink-0">
        <img
          src="/vinod.png"
          alt="Vinod Devaraji"
          class="w-32 h-32 rounded-full object-cover shadow-lg border-4 border-white dark:border-boxdark hover:scale-105 transition-transform duration-300"
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
          <span class="w-4 h-4 mr-2">📍</span>
          {{ personalInfo.location }}
        </p>
        <p class="text-bodydark leading-relaxed mb-4">
          {{ personalInfo.summary }}
        </p>

        <!-- Download CV Button -->
        <button class="bg-gradient-to-r from-primary to-secondary text-white px-6 py-2 rounded-lg hover:opacity-90 transition-all duration-300 flex items-center mx-auto lg:mx-0">
          <span class="mr-2">📄</span>
          Download CV (PDF)
        </button>
      </div>

      <!-- Contact Info -->
      <div class="flex-shrink-0">
        <div class="space-y-3">
          <a :href="`mailto:${personalInfo.email}`"
             class="flex items-center text-bodydark2 hover:text-primary transition-colors p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-800">
            <MailIcon class="w-4 h-4 mr-2" />
            {{ personalInfo.email }}
          </a>
          <a :href="`tel:${personalInfo.phone}`"
             class="flex items-center text-bodydark2 hover:text-primary transition-colors p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-800">
            <span class="w-4 h-4 mr-2">📞</span>
            {{ personalInfo.phone }}
          </a>
          <a :href="`https://${personalInfo.linkedin}`" target="_blank"
             class="flex items-center text-bodydark2 hover:text-primary transition-colors p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-800">
            <span class="w-4 h-4 mr-2">💼</span>
            LinkedIn
          </a>
          <a :href="`https://orcid.org/${personalInfo.orcid}`" target="_blank"
             class="flex items-center text-bodydark2 hover:text-primary transition-colors p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-800">
            <span class="w-4 h-4 mr-2">🔬</span>
            ORCID
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { MailIcon } from '../../icons'

const personalInfo = ref({
  name: "Dr. Vinod Devaraji",
  title: "Senior Scientist at Schrödinger",
  location: "Bangalore, India",
  email: "vinod.devaraji@schrodinger.com",
  phone: "+91-XXXXXXXXXX",
  linkedin: "https://www.linkedin.com/in/vinod-devaraji",
  github: "https://github.com/donniv86",
  googleScholar: "https://scholar.google.com/citations?user=YOUR_ID",
  orcid: "0000-0002-9355-3995",
  summary: "Senior Scientist at Schrödinger with 13+ years of experience in computational drug discovery, molecular modeling, and machine learning applications in pharmaceutical research. Published 31 peer-reviewed papers with 1,247+ citations (H-index: 16). Expert in QSAR modeling, molecular dynamics simulations, and AI-driven drug design. Leading innovative projects in ligand-based machine learning and automated drug discovery workflows.",
  expertise: [
    "Computational Drug Discovery",
    "Molecular Modeling & Simulation",
    "Machine Learning in Drug Design",
    "QSAR & Molecular Dynamics",
    "Bioinformatics & Protein Analysis",
    "Python Programming",
    "Automated Workflows",
    "Toxicology Analysis"
  ],
  currentRole: {
    position: "Senior Scientist",
    company: "Schrödinger",
    location: "Bangalore, India",
    duration: "Current",
    highlights: [
      "Leading computational drug discovery projects",
      "Developing machine learning models for ligand optimization",
      "Implementing automated QSAR workflows",
      "Collaborating with cross-functional drug discovery teams"
    ]
  }
})
</script>