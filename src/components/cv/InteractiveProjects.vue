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
    paper?: string | null
    github?: string | null
    demo?: string | null
  }
}

const activeFilter = ref('All')
const selectedProject = ref<Project | null>(null)

const categories = ['All', 'AI/ML', 'Drug Discovery', 'Research', 'Tools']

const projects = ref<Project[]>([
  {
    id: 1,
    title: 'Antihypertensive Activity of Quinoline Chalcone',
    description: 'Developed novel quinoline-appended chalcone derivatives with antihypertensive activity and site-specific binding interactions.',
    fullDescription: 'This research focused on the design and synthesis of quinoline-appended chalcone derivatives with potential antihypertensive activity. The study involved comprehensive molecular modeling, binding interaction analysis, and biological evaluation. The work demonstrated significant binding affinity to target carrier proteins and established structure-activity relationships.',
    icon: '💊',
    status: 'Completed',
    category: 'Drug Discovery',
    technologies: ['Molecular Modeling', 'Binding Studies', 'RSC Advances', 'Spectroscopy'],
    impact: {
      metric1: '103',
      label1: 'Citations',
      metric2: '2015',
      label2: 'Publication Year'
    },
    achievements: [
      'Published in RSC Advances (Impact Factor: 3.9)',
      'Achieved 103 citations demonstrating high impact',
      'Established structure-activity relationships',
      'Demonstrated site-specific protein binding'
    ],
    links: {
      paper: 'https://pubs.rsc.org/en/content/articlelanding/2015/ra/c5ra10706a',
      github: null,
      demo: null
    }
  },
  {
    id: 2,
    title: 'Oxovanadium-Salphen Complexes for Cancer',
    description: 'Investigated oxovanadium(IV)–salphen complexes interaction with bovine serum albumin and cytotoxicity against cancer cells.',
    fullDescription: 'This project explored the interaction of oxovanadium(IV)–salphen complexes with bovine serum albumin (BSA) and evaluated their cytotoxicity against cancer cells. The research involved spectroscopic studies, molecular docking, and in vitro cytotoxicity assays. The complexes showed promising binding interactions and selective cytotoxicity.',
    icon: '🔬',
    status: 'Completed',
    category: 'Research',
    technologies: ['Spectroscopy', 'Molecular Docking', 'Cytotoxicity Assays', 'Dalton Transactions'],
    impact: {
      metric1: '86',
      label1: 'Citations',
      metric2: '2014',
      label2: 'Publication Year'
    },
    achievements: [
      'Published in Dalton Transactions (Impact Factor: 4.1)',
      'Achieved 86 citations showing research impact',
      'Demonstrated selective cytotoxicity',
      'Established protein binding mechanisms'
    ],
    links: {
      paper: 'https://pubs.rsc.org/en/content/articlelanding/2014/dt/c3dt53076a',
      github: null,
      demo: null
    }
  },
  {
    id: 3,
    title: 'MAO-B Inhibitors: Fluorinated Chalcones',
    description: 'Designed potent and highly selective dual-targeting monoamine oxidase-B inhibitors using fluorinated chalcones.',
    fullDescription: 'This research focused on the design and synthesis of fluorinated chalcones as potent and highly selective monoamine oxidase-B (MAO-B) inhibitors. The study involved pharmacophore modeling, molecular docking, and biological evaluation. The compounds showed excellent selectivity and potency.',
    icon: '🧠',
    status: 'Completed',
    category: 'Drug Discovery',
    technologies: ['Pharmacophore Modeling', 'Molecular Docking', 'MAO-B Inhibition', 'Archiv der Pharmazie'],
    impact: {
      metric1: '61',
      label1: 'Citations',
      metric2: '2019',
      label2: 'Publication Year'
    },
    achievements: [
      'Published in Archiv der Pharmazie (Impact Factor: 4.7)',
      'Achieved 61 citations demonstrating impact',
      'Developed highly selective MAO-B inhibitors',
      'Established structure-selectivity relationships'
    ],
    links: {
      paper: 'https://onlinelibrary.wiley.com/doi/abs/10.1002/ardp.201800309',
      github: null,
      demo: null
    }
  },
  {
    id: 4,
    title: 'Quinoline Chalcone DNA Interaction',
    description: 'Comprehensive spectroscopic study of quinoline-appended chalcone derivative DNA damage and drug discovery applications.',
    fullDescription: 'This comprehensive study investigated the interaction of quinoline-appended chalcone derivatives with DNA using various spectroscopic techniques. The research provided insights into DNA binding mechanisms and potential drug discovery applications.',
    icon: '🧬',
    status: 'Completed',
    category: 'Research',
    technologies: ['Spectroscopy', 'DNA Binding', 'J. Phys. Chem. B', 'Molecular Modeling'],
    impact: {
      metric1: '36',
      label1: 'Citations',
      metric2: '2014',
      label2: 'Publication Year'
    },
    achievements: [
      'Published in J. Phys. Chem. B (Impact Factor: 3.3)',
      'Comprehensive spectroscopic analysis',
      'Established DNA binding mechanisms',
      'Advanced drug discovery understanding'
    ],
    links: {
      paper: 'https://pubs.acs.org/doi/abs/10.1021/jp503145r',
      github: null,
      demo: null
    }
  },
  {
    id: 5,
    title: 'PAR2 Structure for Breast Cancer',
    description: 'Molecular modeling study of protease activated receptor 2 (PAR2) structure and signaling mechanism for breast cancer targeting.',
    fullDescription: 'This computational study focused on the structure and putative signaling mechanism of protease activated receptor 2 (PAR2) as a promising target for breast cancer therapy. The research involved molecular modeling, structure prediction, and signaling pathway analysis.',
    icon: '🎯',
    status: 'Completed',
    category: 'Research',
    technologies: ['Molecular Modeling', 'PAR2 Structure', 'J. Mol. Graphics', 'Breast Cancer'],
    impact: {
      metric1: '30',
      label1: 'Citations',
      metric2: '2014',
      label2: 'Publication Year'
    },
    achievements: [
      'Published in J. Mol. Graphics and Modelling',
      'Identified PAR2 as breast cancer target',
      'Predicted signaling mechanisms',
      'Advanced therapeutic target understanding'
    ],
    links: {
      paper: 'https://www.sciencedirect.com/science/article/abs/pii/S1093326314000894',
      github: null,
      demo: null
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