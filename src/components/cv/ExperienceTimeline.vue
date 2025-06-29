<template>
  <div class="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
    <h3 class="text-xl font-semibold text-black dark:text-white mb-6">Professional Experience</h3>

    <div class="space-y-8">
      <div
        v-for="(experience, index) in experiences"
        :key="experience.id"
        class="relative group"
      >
        <!-- Timeline Line -->
        <div class="absolute left-6 top-0 bottom-0 w-0.5 bg-stroke dark:bg-strokedark group-hover:bg-primary transition-colors duration-300"></div>

        <!-- Timeline Dot -->
        <div class="absolute left-4 top-6 w-4 h-4 bg-primary rounded-full border-4 border-white dark:border-boxdark group-hover:scale-125 transition-transform duration-300"></div>

        <!-- Content -->
        <div class="ml-12">
          <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 hover:bg-white dark:hover:bg-gray-700">
            <!-- Header -->
            <div class="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
              <div>
                <h4 class="text-xl font-bold text-black dark:text-white group-hover:text-primary transition-colors duration-300">
                  {{ experience.position }}
                </h4>
                <p class="text-lg text-primary font-medium">
                  {{ experience.company }}
                </p>
              </div>
              <div class="text-right mt-2 md:mt-0">
                <p class="text-bodydark2 font-medium">{{ experience.duration }}</p>
                <p class="text-sm text-bodydark2">{{ experience.location }}</p>
              </div>
            </div>

            <!-- Description -->
            <p class="text-bodydark mb-4 leading-relaxed">
              {{ experience.description }}
            </p>

            <!-- Technologies -->
            <div class="mb-4">
              <h5 class="font-semibold text-black dark:text-white mb-2 flex items-center">
                <span class="mr-2">🛠️</span>
                Technologies:
              </h5>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tech in experience.technologies"
                  :key="tech"
                  class="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm hover:bg-primary hover:text-white transition-all duration-300 cursor-default"
                >
                  {{ tech }}
                </span>
              </div>
            </div>

            <!-- Achievements -->
            <div>
              <h5 class="font-semibold text-black dark:text-white mb-2 flex items-center">
                <span class="mr-2">🏆</span>
                Key Achievements:
              </h5>
              <ul class="list-disc list-inside space-y-1 text-bodydark">
                <li v-for="achievement in experience.achievements" :key="achievement" class="hover:text-primary transition-colors duration-300">
                  {{ achievement }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const experiences = ref([
  {
    id: 1,
    company: 'Schrödinger',
    position: 'Senior Scientist II',
    duration: 'Mar 2020 - Present',
    location: 'Bangalore, India',
    description: 'Led active learning–based virtual screening campaigns using large molecular databases for faster hit enrichment. Developed predictive deep learning models for toxicity profiling and managed large scale compound libraries.',
    technologies: ['Python', 'Machine Learning', 'Molecular Modeling', 'Schrödinger Suite', 'Deep Learning'],
    achievements: [
      'Led active learning–based virtual screening campaigns',
      'Developed predictive deep learning models for toxicity profiling',
      'Managed large scale compound libraries and automated workflows',
      'Presented complex scientific findings to executive stakeholders'
    ]
  },
  {
    id: 2,
    company: 'Schrödinger',
    position: 'Senior Scientist',
    duration: 'Jan 2016 - Mar 2020',
    location: 'Bangalore, India',
    description: 'Spearheaded cross-functional collaborations with medicinal chemists and biologists to identify and validate novel therapeutic targets in oncology. Coordinated global deployment of computational tools.',
    technologies: ['Target Prioritization', 'Data Digitization', 'Research Analytics', 'Oncology Research'],
    achievements: [
      'Led 8 new drug discovery projects for hit and lead optimisation',
      'Coordinated global research partners for data digitization',
      'Developed custom automations for target prioritization',
      'Created advanced automated analytics and computational tools'
    ]
  },
  {
    id: 3,
    company: 'Schrödinger',
    position: 'Junior Application Scientist',
    duration: 'May 2011 - Jan 2016',
    location: 'Bangalore, India',
    description: 'Trained researchers on advanced computational methods and provided technical support. Developed impactful case studies and training materials for computational techniques.',
    technologies: ['Molecular Docking', 'Molecular Dynamics', '3D QSAR', 'Cheminformatics', 'Training'],
    achievements: [
      'Trained over 10 researchers annually on computational methods',
      'Resolved 20+ user issues monthly',
      'Developed impactful case studies for software adoption',
      'Contributed to training materials and documentation'
    ]
  }
])
</script>