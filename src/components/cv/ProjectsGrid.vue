<template>
  <div class="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
    <div class="flex justify-between items-center mb-6">
      <h3 class="text-xl font-semibold text-black dark:text-white">Portfolio Projects</h3>

      <!-- Filter Buttons -->
      <div class="flex space-x-2">
        <button
          v-for="filter in filters"
          :key="filter"
          @click="selectedFilter = filter"
          :class="[
            'px-3 py-1 rounded-full text-sm font-medium transition-colors',
            selectedFilter === filter
              ? 'bg-primary text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-bodydark2 hover:bg-gray-200 dark:hover:bg-gray-600'
          ]"
        >
          {{ filter }}
        </button>
      </div>
    </div>

    <!-- Projects Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="project in filteredProjects"
        :key="project.id"
        class="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
      >
        <!-- Project Image -->
        <div class="h-48 bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
          <div class="text-white text-6xl font-bold">
            {{ project.title.charAt(0) }}
          </div>
        </div>

        <!-- Project Content -->
        <div class="p-6">
          <div class="flex justify-between items-start mb-3">
            <h4 class="text-xl font-bold text-black dark:text-white">
              {{ project.title }}
            </h4>
            <span
              v-if="project.featured"
              class="px-2 py-1 bg-warning/20 text-warning rounded-full text-xs"
            >
              Featured
            </span>
          </div>

          <p class="text-bodydark mb-4 leading-relaxed">
            {{ project.description }}
          </p>

          <!-- Technologies -->
          <div class="mb-4">
            <div class="flex flex-wrap gap-1">
              <span
                v-for="tech in project.technologies.slice(0, 3)"
                :key="tech"
                class="px-2 py-1 bg-primary/10 text-primary rounded text-xs"
              >
                {{ tech }}
              </span>
              <span
                v-if="project.technologies.length > 3"
                class="px-2 py-1 bg-gray-100 dark:bg-gray-600 text-bodydark2 rounded text-xs"
              >
                +{{ project.technologies.length - 3 }}
              </span>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex space-x-2">
            <a
              :href="project.github"
              target="_blank"
              class="flex-1 bg-gray-800 dark:bg-gray-600 text-white text-center py-2 px-4 rounded hover:bg-gray-700 dark:hover:bg-gray-500 transition-colors"
            >
              <GithubIcon class="w-4 h-4 mr-2 inline" />
              Code
            </a>
            <a
              :href="project.live"
              target="_blank"
              class="flex-1 bg-primary text-white text-center py-2 px-4 rounded hover:bg-primary/90 transition-colors"
            >
              <ExternalLinkIcon class="w-4 h-4 mr-2 inline" />
              Live
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { GithubIcon, ExternalLinkIcon } from 'lucide-vue-next'

const projects = ref([
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce platform built with Vue.js, Node.js, and MongoDB. Features include user authentication, product management, payment processing, and admin dashboard.',
    image: '/projects/ecommerce.jpg',
    technologies: ['Vue.js', 'Node.js', 'MongoDB', 'Stripe', 'AWS'],
    github: 'https://github.com/yourusername/ecommerce-platform',
    live: 'https://ecommerce-demo.com',
    featured: true
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
    image: '/projects/taskmanager.jpg',
    technologies: ['React', 'TypeScript', 'Socket.io', 'PostgreSQL'],
    github: 'https://github.com/yourusername/task-manager',
    live: 'https://taskmanager-demo.com',
    featured: true
  },
  {
    id: 3,
    title: 'Weather Dashboard',
    description: 'A weather application that displays current weather conditions and forecasts using multiple weather APIs and interactive charts.',
    image: '/projects/weather.jpg',
    technologies: ['Vue.js', 'Chart.js', 'OpenWeather API', 'Tailwind CSS'],
    github: 'https://github.com/yourusername/weather-dashboard',
    live: 'https://weather-demo.com',
    featured: false
  },
  {
    id: 4,
    title: 'Portfolio Website',
    description: 'A responsive portfolio website built with modern web technologies and featuring smooth animations and interactive elements.',
    image: '/projects/portfolio.jpg',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'GSAP'],
    github: 'https://github.com/yourusername/portfolio',
    live: 'https://your-portfolio.com',
    featured: false
  },
  {
    id: 5,
    title: 'Chat Application',
    description: 'Real-time chat application with user authentication, message history, and file sharing capabilities.',
    image: '/projects/chat.jpg',
    technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
    github: 'https://github.com/yourusername/chat-app',
    live: 'https://chat-demo.com',
    featured: false
  },
  {
    id: 6,
    title: 'Data Visualization Dashboard',
    description: 'Interactive dashboard for visualizing complex data sets with multiple chart types and filtering options.',
    image: '/projects/dashboard.jpg',
    technologies: ['Vue.js', 'D3.js', 'Python', 'Flask'],
    github: 'https://github.com/yourusername/data-dashboard',
    live: 'https://dashboard-demo.com',
    featured: false
  }
])

const selectedFilter = ref('All')

const filters = ref(['All', 'Featured', 'Frontend', 'Full Stack', 'Data Science'])

const filteredProjects = computed(() => {
  if (selectedFilter.value === 'All') return projects.value
  if (selectedFilter.value === 'Featured') return projects.value.filter(p => p.featured)
  return projects.value.filter(p => p.technologies.some(tech =>
    selectedFilter.value === 'Frontend' ? ['Vue.js', 'React', 'HTML5', 'CSS3'].includes(tech) :
    selectedFilter.value === 'Full Stack' ? ['Node.js', 'MongoDB', 'PostgreSQL'].includes(tech) :
    selectedFilter.value === 'Data Science' ? ['Python', 'D3.js', 'Chart.js'].includes(tech) : false
  ))
})
</script>