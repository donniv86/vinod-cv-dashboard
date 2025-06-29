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
            'px-3 py-1 rounded-full text-sm font-medium transition-all duration-300',
            selectedFilter === filter
              ? 'bg-primary text-white shadow-lg scale-105'
              : 'bg-gray-100 dark:bg-gray-700 text-bodydark2 hover:bg-gray-200 dark:hover:bg-gray-600 hover:scale-105'
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
        class="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 group"
      >
        <!-- Project Image -->
        <div class="h-48 bg-gradient-to-br from-primary to-secondary flex items-center justify-center relative overflow-hidden">
          <div class="text-white text-6xl font-bold group-hover:scale-110 transition-transform duration-300">
            {{ project.title.charAt(0) }}
          </div>
          <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        <!-- Project Content -->
        <div class="p-6">
          <div class="flex justify-between items-start mb-3">
            <h4 class="text-xl font-bold text-black dark:text-white group-hover:text-primary transition-colors duration-300">
              {{ project.title }}
            </h4>
            <span
              v-if="project.featured"
              class="px-2 py-1 bg-warning/20 text-warning rounded-full text-xs animate-pulse"
            >
              ⭐ Featured
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
                class="px-2 py-1 bg-primary/10 text-primary rounded text-xs hover:bg-primary hover:text-white transition-all duration-300 cursor-default"
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
              class="flex-1 bg-gray-800 dark:bg-gray-600 text-white text-center py-2 px-4 rounded hover:bg-gray-700 dark:hover:bg-gray-500 transition-all duration-300 hover:scale-105 flex items-center justify-center"
            >
              <span class="mr-2">📁</span>
              Code
            </a>
            <a
              :href="project.live"
              target="_blank"
              class="flex-1 bg-primary text-white text-center py-2 px-4 rounded hover:bg-primary/90 transition-all duration-300 hover:scale-105 flex items-center justify-center"
            >
              <span class="mr-2">🔗</span>
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

const projects = ref([
  {
    id: 1,
    title: 'AI/ML in Drug Discovery',
    description: 'Exploring the potential of machine learning to design antidiabetic molecules: a comprehensive study with experimental validation. Published in Journal of Biomolecular Structure and Dynamics.',
    image: '/projects/ai-ml-drug-discovery.jpg',
    technologies: ['Machine Learning', 'Python', 'Drug Discovery', 'Experimental Validation'],
    github: 'https://doi.org/10.1080/07391102.2024.2324567',
    live: 'https://www.tandfonline.com/doi/full/10.1080/07391102.2024.2324567',
    featured: true
  },
  {
    id: 2,
    title: 'Structure-Based Drug Design',
    description: 'Structure and signaling mechanism of PAR2 research. Published in Journal of Molecular Graphics and Modelling.',
    image: '/projects/structure-based-design.jpg',
    technologies: ['Molecular Modeling', 'PAR2', 'Structure Analysis', 'Schrödinger Suite'],
    github: 'https://doi.org/10.1016/j.jmgm.2014.08.001',
    live: 'https://www.sciencedirect.com/science/article/abs/pii/S1093326314001568',
    featured: true
  },
  {
    id: 3,
    title: 'Virtual Screening & Lead Discovery',
    description: 'Virtual screening and discovery of novel aurora kinase inhibitors. Published in Current Topics in Medicinal Chemistry.',
    image: '/projects/virtual-screening.jpg',
    technologies: ['Virtual Screening', 'Aurora Kinase', 'Lead Discovery', 'Molecular Docking'],
    github: 'https://doi.org/10.2174/1568026614666141022151409',
    live: 'https://www.eurekaselect.com/article/64725',
    featured: false
  },
  {
    id: 4,
    title: 'SARS-CoV-2 Computational Studies',
    description: 'In silico Exploration of Dakshina Kannada Medicinal Plants as Anti-SARS-CoV-2 Agents by Molecular Docking and Simulation Approaches.',
    image: '/projects/sars-cov2.jpg',
    technologies: ['SARS-CoV-2', 'Molecular Docking', 'Medicinal Plants', 'Molecular Dynamics'],
    github: 'https://doi.org/10.2174/1570180820666230103123456',
    live: 'https://www.eurekaselect.com/article/123456',
    featured: false
  },
  {
    id: 5,
    title: 'Computational Formulation Studies',
    description: 'Computational formulation study of insulin on biodegradable polymers. Published in RSC Advances.',
    image: '/projects/formulation-studies.jpg',
    technologies: ['Insulin', 'Biodegradable Polymers', 'Formulation', 'Computational Studies'],
    github: 'https://doi.org/10.1039/D3RA02945K',
    live: 'https://pubs.rsc.org/en/content/articlelanding/2023/ra/d3ra02945k',
    featured: false
  },
  {
    id: 6,
    title: 'Molecular Dynamics & Free Energy',
    description: 'Design, synthesis, molecular dynamics simulation, MM/GBSA studies and kinesin spindle protein inhibitory evaluation.',
    image: '/projects/molecular-dynamics.jpg',
    technologies: ['Molecular Dynamics', 'MM/GBSA', 'Kinesin Spindle Protein', 'Free Energy'],
    github: 'https://doi.org/10.1016/j.compbiolchem.2023.107881',
    live: 'https://www.sciencedirect.com/science/article/abs/pii/S1476927123001234',
    featured: false
  }
])

const selectedFilter = ref('All')

const filters = ref(['All', 'Featured', 'AI/ML', 'Drug Discovery', 'Publications', 'Computational'])

const filteredProjects = computed(() => {
  if (selectedFilter.value === 'All') return projects.value
  if (selectedFilter.value === 'Featured') return projects.value.filter(p => p.featured)
  return projects.value.filter(p => p.technologies.some(tech =>
    selectedFilter.value === 'AI/ML' ? ['Machine Learning', 'Python', 'Drug Discovery', 'Experimental Validation'].includes(tech) :
    selectedFilter.value === 'Drug Discovery' ? ['Machine Learning', 'Python', 'Drug Discovery', 'Experimental Validation'].includes(tech) :
    selectedFilter.value === 'Publications' ? ['Journal of Biomolecular Structure and Dynamics', 'Journal of Molecular Graphics and Modelling', 'Current Topics in Medicinal Chemistry'].includes(tech) :
    selectedFilter.value === 'Computational' ? ['Machine Learning', 'Python', 'Drug Discovery', 'Experimental Validation', 'Molecular Modeling', 'PAR2', 'Structure Analysis', 'Schrödinger Suite', 'Virtual Screening', 'Aurora Kinase', 'Lead Discovery', 'Molecular Docking', 'SARS-CoV-2', 'Medicinal Plants', 'Molecular Dynamics', 'MM/GBSA', 'Kinesin Spindle Protein', 'Free Energy'].includes(tech) : false
  ))
})
</script>