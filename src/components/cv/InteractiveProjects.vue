<template>
  <div class="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
    <div class="mb-6">
      <h3 class="text-xl font-semibold text-black dark:text-white mb-2">
        🚀 Featured Projects & Research
      </h3>
      <p class="text-bodydark2">Interactive showcase of key achievements and innovations</p>
    </div>

    <!-- Filter Tabs -->
    <div class="flex flex-wrap gap-2 mb-6">
      <button
        v-for="category in categories"
        :key="category"
        @click="activeFilter = category"
        :class="[
          'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300',
          activeFilter === category
            ? 'bg-primary text-white shadow-lg'
            : 'bg-gray-100 dark:bg-gray-800 text-bodydark2 hover:bg-gray-200 dark:hover:bg-gray-700'
        ]"
      >
        {{ category }}
      </button>
    </div>

    <!-- Projects Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="project in filteredProjects"
        :key="project.id"
        class="group relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
        @click="selectedProject = project"
      >
        <!-- Project Image/Icon -->
        <div class="h-48 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
          <div class="text-6xl">{{ project.icon }}</div>
        </div>

        <!-- Project Content -->
        <div class="p-6">
          <div class="flex items-center justify-between mb-3">
            <h4 class="font-semibold text-black dark:text-white group-hover:text-primary transition-colors">
              {{ project.title }}
            </h4>
            <span class="text-xs px-2 py-1 rounded-full" :class="getStatusClass(project.status)">
              {{ project.status }}
            </span>
          </div>

          <p class="text-sm text-bodydark2 mb-4 line-clamp-3">
            {{ project.description }}
          </p>

          <!-- Technologies Used -->
          <div class="flex flex-wrap gap-1 mb-4">
            <span
              v-for="tech in project.technologies.slice(0, 3)"
              :key="tech"
              class="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-bodydark2 rounded"
            >
              {{ tech }}
            </span>
            <span v-if="project.technologies.length > 3" class="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-bodydark2 rounded">
              +{{ project.technologies.length - 3 }}
            </span>
          </div>

          <!-- Impact Metrics -->
          <div class="grid grid-cols-2 gap-2 text-xs">
            <div class="text-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
              <div class="font-semibold text-blue-600 dark:text-blue-400">{{ project.impact.metric1 }}</div>
              <div class="text-blue-500 dark:text-blue-300">{{ project.impact.label1 }}</div>
            </div>
            <div class="text-center p-2 bg-green-50 dark:bg-green-900/20 rounded">
              <div class="font-semibold text-green-600 dark:text-green-400">{{ project.impact.metric2 }}</div>
              <div class="text-green-500 dark:text-green-300">{{ project.impact.label2 }}</div>
            </div>
          </div>
        </div>

        <!-- Hover Overlay -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
          <div class="p-6 text-white">
            <p class="text-sm mb-3">Click to view details</p>
            <button class="bg-white text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
              View Project
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Project Modal -->
    <div v-if="selectedProject" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-2xl font-bold text-black dark:text-white">{{ selectedProject.title }}</h3>
            <button @click="selectedProject = null" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              <span class="text-2xl">×</span>
            </button>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 class="font-semibold text-black dark:text-white mb-3">Project Overview</h4>
              <p class="text-bodydark2 mb-4">{{ selectedProject.fullDescription }}</p>

              <h4 class="font-semibold text-black dark:text-white mb-3">Key Achievements</h4>
              <ul class="text-bodydark2 space-y-2 mb-4">
                <li v-for="achievement in selectedProject.achievements" :key="achievement" class="flex items-start">
                  <span class="text-green-500 mr-2">✓</span>
                  {{ achievement }}
                </li>
              </ul>

              <h4 class="font-semibold text-black dark:text-white mb-3">Technologies Used</h4>
              <div class="flex flex-wrap gap-2 mb-4">
                <span
                  v-for="tech in selectedProject.technologies"
                  :key="tech"
                  class="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                >
                  {{ tech }}
                </span>
              </div>
            </div>

            <div>
              <h4 class="font-semibold text-black dark:text-white mb-3">Impact Metrics</h4>
              <div class="space-y-4">
                <div class="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-lg">
                  <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">{{ selectedProject.impact.metric1 }}</div>
                  <div class="text-blue-500 dark:text-blue-300">{{ selectedProject.impact.label1 }}</div>
                </div>
                <div class="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-lg">
                  <div class="text-2xl font-bold text-green-600 dark:text-green-400">{{ selectedProject.impact.metric2 }}</div>
                  <div class="text-green-500 dark:text-green-300">{{ selectedProject.impact.label2 }}</div>
                </div>
              </div>

              <h4 class="font-semibold text-black dark:text-white mb-3 mt-6">Project Links</h4>
              <div class="space-y-2">
                <a
                  v-if="selectedProject.links.paper"
                  :href="selectedProject.links.paper"
                  target="_blank"
                  class="flex items-center text-primary hover:text-primary/80 transition-colors"
                >
                  <span class="mr-2">📄</span>
                  Research Paper
                </a>
                <a
                  v-if="selectedProject.links.github"
                  :href="selectedProject.links.github"
                  target="_blank"
                  class="flex items-center text-primary hover:text-primary/80 transition-colors"
                >
                  <span class="mr-2">💻</span>
                  GitHub Repository
                </a>
                <a
                  v-if="selectedProject.links.demo"
                  :href="selectedProject.links.demo"
                  target="_blank"
                  class="flex items-center text-primary hover:text-primary/80 transition-colors"
                >
                  <span class="mr-2">🎯</span>
                  Live Demo
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Project {
  id: number
  title: string
  description: string
  fullDescription: string
  icon: string
  status: string
  category: string
  technologies: string[]
  impact: {
    metric1: string
    label1: string
    metric2: string
    label2: string
  }
  achievements: string[]
  links: {
    paper?: string
    github?: string
    demo?: string
  }
}

const activeFilter = ref('All')
const selectedProject = ref<Project | null>(null)

const categories = ['All', 'AI/ML', 'Drug Discovery', 'Research', 'Tools']

const projects = ref<Project[]>([
  {
    id: 1,
    title: 'AI-Driven Drug Target Prediction',
    description: 'Developed a deep learning model for predicting novel drug targets with 85% accuracy across multiple disease areas.',
    fullDescription: 'This project involved developing a comprehensive deep learning framework for predicting novel drug targets. The model integrates multiple data sources including protein sequences, gene expression data, and known drug-target interactions to identify promising therapeutic targets.',
    icon: '🧬',
    status: 'Completed',
    category: 'AI/ML',
    technologies: ['Python', 'TensorFlow', 'PyTorch', 'Bioinformatics', 'AWS'],
    impact: {
      metric1: '85%',
      label1: 'Prediction Accuracy',
      metric2: '40%',
      label2: 'Time Reduction'
    },
    achievements: [
      'Reduced target identification time by 40%',
      'Achieved 85% prediction accuracy across 5 disease areas',
      'Published in Nature Biotechnology',
      'Deployed as cloud service for research teams'
    ],
    links: {
      paper: 'https://example.com/paper',
      github: 'https://github.com/example/repo',
      demo: 'https://demo.example.com'
    }
  },
  {
    id: 2,
    title: 'Automated DMTA Pipeline',
    description: 'Built an end-to-end pipeline automating Design-Make-Test-Analyze cycles, reducing cycle time by 60%.',
    fullDescription: 'Developed a comprehensive automation pipeline that streamlines the entire DMTA (Design-Make-Test-Analyze) cycle in drug discovery. The system integrates molecular modeling, synthesis planning, and data analysis.',
    icon: '⚙️',
    status: 'Active',
    category: 'Drug Discovery',
    technologies: ['Python', 'Schrödinger', 'RDKit', 'PostgreSQL', 'Docker'],
    impact: {
      metric1: '60%',
      label1: 'Cycle Time Reduction',
      metric2: '50+',
      label2: 'Compounds Processed'
    },
    achievements: [
      'Automated 60% of manual processes',
      'Processed 50+ compounds per cycle',
      'Integrated with existing lab infrastructure',
      'Reduced human error by 90%'
    ],
    links: {
      github: 'https://github.com/example/dmta-pipeline'
    }
  },
  {
    id: 3,
    title: 'Molecular Dynamics Optimization',
    description: 'Optimized molecular dynamics simulations achieving 10x performance improvement on GPU clusters.',
    fullDescription: 'Led the optimization of molecular dynamics simulations for large-scale drug discovery projects. Implemented GPU acceleration and parallel processing techniques.',
    icon: '⚡',
    status: 'Completed',
    category: 'Research',
    technologies: ['CUDA', 'OpenMM', 'Python', 'HPC', 'Slurm'],
    impact: {
      metric1: '10x',
      label1: 'Performance Gain',
      metric2: '1000+',
      label2: 'Simulations/Day'
    },
    achievements: [
      'Achieved 10x performance improvement',
      'Scaled to 1000+ simulations per day',
      'Reduced computational costs by 70%',
      'Published optimization methodology'
    ],
    links: {
      paper: 'https://example.com/md-paper',
      github: 'https://github.com/example/md-optimization'
    }
  }
])

const filteredProjects = computed(() => {
  if (activeFilter.value === 'All') {
    return projects.value
  }
  return projects.value.filter(project => project.category === activeFilter.value)
})

const getStatusClass = (status: string) => {
  switch (status) {
    case 'Completed':
      return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
    case 'Active':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
    case 'In Progress':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
  }
}
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>