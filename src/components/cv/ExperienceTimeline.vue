<template>
  <div class="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
    <h3 class="text-xl font-semibold text-black dark:text-white mb-6">Professional Experience</h3>

    <div class="space-y-8">
      <div
        v-for="(experience, index) in experiences"
        :key="experience.id"
        class="relative"
      >
        <!-- Timeline Line -->
        <div class="absolute left-6 top-0 bottom-0 w-0.5 bg-stroke dark:bg-strokedark"></div>

        <!-- Timeline Dot -->
        <div class="absolute left-4 top-6 w-4 h-4 bg-primary rounded-full border-4 border-white dark:border-boxdark"></div>

        <!-- Content -->
        <div class="ml-12">
          <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 hover:shadow-md transition-shadow">
            <!-- Header -->
            <div class="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
              <div>
                <h4 class="text-xl font-bold text-black dark:text-white">
                  {{ experience.position }}
                </h4>
                <p class="text-lg text-primary font-medium">
                  {{ experience.company }}
                </p>
              </div>
              <div class="text-right mt-2 md:mt-0">
                <p class="text-bodydark2">{{ experience.duration }}</p>
                <p class="text-sm text-bodydark2">{{ experience.location }}</p>
              </div>
            </div>

            <!-- Description -->
            <p class="text-bodydark mb-4 leading-relaxed">
              {{ experience.description }}
            </p>

            <!-- Technologies -->
            <div class="mb-4">
              <h5 class="font-semibold text-black dark:text-white mb-2">Technologies:</h5>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tech in experience.technologies"
                  :key="tech"
                  class="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                >
                  {{ tech }}
                </span>
              </div>
            </div>

            <!-- Achievements -->
            <div>
              <h5 class="font-semibold text-black dark:text-white mb-2">Key Achievements:</h5>
              <ul class="list-disc list-inside space-y-1 text-bodydark">
                <li v-for="achievement in experience.achievements" :key="achievement">
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
    company: 'TechCorp Inc.',
    position: 'Senior Full Stack Developer',
    duration: '2022 - Present',
    location: 'San Francisco, CA',
    description: 'Led development of scalable web applications using Vue.js, Node.js, and AWS. Mentored junior developers and implemented CI/CD pipelines.',
    technologies: ['Vue.js', 'Node.js', 'AWS', 'Docker', 'MongoDB'],
    achievements: [
      'Increased application performance by 40%',
      'Reduced deployment time by 60%',
      'Led team of 5 developers'
    ]
  },
  {
    id: 2,
    company: 'StartupXYZ',
    position: 'Frontend Developer',
    duration: '2020 - 2022',
    location: 'Remote',
    description: 'Built responsive user interfaces and implemented modern frontend architectures. Collaborated with design and backend teams.',
    technologies: ['React', 'TypeScript', 'Redux', 'Tailwind CSS'],
    achievements: [
      'Improved user engagement by 25%',
      'Reduced bundle size by 30%',
      'Implemented accessibility features'
    ]
  },
  {
    id: 3,
    company: 'Digital Solutions Ltd.',
    position: 'Junior Developer',
    duration: '2019 - 2020',
    location: 'New York, NY',
    description: 'Developed and maintained web applications. Learned modern development practices and tools.',
    technologies: ['JavaScript', 'HTML', 'CSS', 'PHP', 'MySQL'],
    achievements: [
      'Completed 15+ client projects',
      'Learned modern development practices',
      'Contributed to open source projects'
    ]
  }
])
</script>