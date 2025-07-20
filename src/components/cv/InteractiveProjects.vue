<template>
  <div class="card-responsive">
    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 filter-bar rounded-xl p-4">
      <h2 class="filter-bar-label text-2xl font-bold mb-4 lg:mb-0">Research Publications</h2>
      <div class="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 min-w-0">
        <!-- Refresh Button -->
        <button
          @click="refreshData"
          :disabled="isLoading"
          class="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 flex-shrink-0 w-full sm:w-auto justify-center"
        >
          <svg v-if="isLoading" class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <svg v-else class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
          </svg>
          <span>{{ isLoading ? 'Loading...' : 'Refresh' }}</span>
        </button>

        <!-- Year Filters -->
        <div class="flex space-x-2 overflow-x-auto max-w-full min-w-0 w-full sm:w-auto">
          <button
            @click="activeFilter = 'all'"
            :class="[
              'filter-btn px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0',
              activeFilter === 'all'
                ? 'filter-btn-active'
                : 'filter-btn-inactive'
            ]"
          >
            All Publications
          </button>
          <button
            v-for="year in availableYears"
            :key="year"
            @click="activeFilter = year"
            :class="[
              'filter-btn px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0',
              activeFilter === year
                ? 'filter-btn-active'
                : 'filter-btn-inactive'
            ]"
          >
            {{ year }}
          </button>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="text-center py-12">
      <div class="w-16 h-16 mx-auto mb-4 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
        <svg class="animate-spin h-8 w-8 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">Loading Publications</h3>
      <p class="text-gray-500 dark:text-gray-400">Fetching latest data from Google Scholar...</p>
    </div>

    <!-- Content (only show when not loading) -->
    <div v-else>
      <!-- Advanced Filtering System -->
      <div class="mb-6 space-y-4">
        <!-- Category Filters -->
        <ResponsiveGrid :cols="1" :auto-fit="true" class="gap-4">
          <!-- Research Area Filter -->
          <div class="relative">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Research Area</label>
            <select
              v-model="selectedResearchArea"
              @change="updateFilters"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Research Areas</option>
              <option value="small-molecule">Small Molecule Drug Discovery</option>
              <option value="biologics">Biologics & Peptides</option>
              <option value="organometallics">Organometallics</option>
              <option value="natural-products">Natural Products & Medicinal Plants</option>
              <option value="cancer-research">Cancer Research</option>
              <option value="infectious-diseases">Infectious Diseases</option>
              <option value="neurodegenerative">Neurodegenerative Diseases</option>
              <option value="metabolic-disorders">Metabolic Disorders</option>
              <option value="formulation">Drug Formulation</option>
            </select>
          </div>

          <!-- Technique Filter -->
          <div class="relative">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Technique/Methodology</label>
            <select
              v-model="selectedTechnique"
              @change="updateFilters"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Techniques</option>
              <option value="molecular-docking">Molecular Docking</option>
              <option value="molecular-dynamics">Molecular Dynamics</option>
              <option value="quantum-mechanics">Quantum Mechanics</option>
              <option value="machine-learning">Machine Learning & AI</option>
              <option value="cheminformatics">Cheminformatics</option>
              <option value="bioinformatics">Bioinformatics</option>
              <option value="structure-based">Structure-Based Design</option>
              <option value="ligand-based">Ligand-Based Design</option>
              <option value="pharmacophore">Pharmacophore Modeling</option>
              <option value="qsar">QSAR Modeling</option>
            </select>
          </div>

          <!-- Target Type Filter -->
          <div class="relative">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Target Type</label>
            <select
              v-model="selectedTarget"
              @change="updateFilters"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Target Types</option>
              <option value="enzymes">Enzymes</option>
              <option value="receptors">Receptors</option>
              <option value="ion-channels">Ion Channels</option>
              <option value="transporters">Transporters</option>
              <option value="nucleic-acids">Nucleic Acids</option>
              <option value="proteins">Proteins</option>
              <option value="pathways">Signaling Pathways</option>
              <option value="metabolic">Metabolic Targets</option>
            </select>
          </div>
        </ResponsiveGrid>

        <!-- Search Bar -->
        <div class="relative">
          <input
            v-model="searchQuery"
            @input="updateFilters"
            type="text"
            placeholder="Search publications by title, authors, or keywords..."
            class="w-full px-4 py-3 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </div>

        <!-- Active Filters Display -->
        <div v-if="hasActiveFilters" class="flex flex-wrap items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Active Filters:</span>
          <span
            v-for="filter in activeFiltersList"
            :key="filter"
            class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
          >
            {{ filter }}
          </span>
          <button
            @click="clearAllFilters"
            class="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            Clear All
          </button>
        </div>
      </div>

      <!-- Statistics Cards -->
      <ResponsiveGrid :cols="1" :auto-fit="true" class="mb-6 gap-4">
        <div class="card-metric p-4 rounded-lg">
          <div class="card-metric-label">Total Publications</div>
          <div class="card-metric-value">{{ totalPublications }}</div>
        </div>
        <div class="card-metric p-4 rounded-lg">
          <div class="card-metric-label">Total Citations</div>
          <div class="card-metric-value">{{ totalCitations }}</div>
        </div>
        <div class="card-metric p-4 rounded-lg">
          <div class="card-metric-label">Average Impact Factor</div>
          <div class="card-metric-value">{{ averageImpact }}</div>
        </div>
        <div class="card-metric p-4 rounded-lg">
          <div class="card-metric-label">Research Years</div>
          <div class="card-metric-value">{{ researchYears }}</div>
        </div>
      </ResponsiveGrid>

      <!-- Filtered Results Count -->
      <div class="mb-4 text-sm text-gray-600 dark:text-gray-400">
        Showing {{ filteredPublications.length }} of {{ totalPublications }} publications
        <span v-if="hasActiveFilters">
          ({{ totalFilteredCitations }} total citations, {{ averageFilteredImpact }} avg. impact)
        </span>
      </div>

      <!-- Publications Grid -->
      <ResponsiveGrid :cols="1" :auto-fit="true" class="gap-6">
        <div
          v-for="publication in filteredPublications"
          :key="publication.id"
          class="card-publication p-6 rounded-lg transition-all duration-300 hover:shadow-lg"
        >
          <div class="flex flex-col space-y-4">
            <!-- Publication Header -->
            <div>
              <h3 class="card-publication-title text-lg font-bold mb-2 line-clamp-3">
                {{ publication.title }}
              </h3>
              <p class="card-publication-meta text-sm mb-2">
                <span class="font-medium">{{ publication.authors }}</span>
              </p>
              <p class="card-publication-meta text-sm">
                <span class="font-medium">{{ publication.journal }}</span>
                <span class="mx-2">•</span>
                <span>{{ publication.year }}</span>
                <span v-if="publication.volume" class="mx-2">•</span>
                <span v-if="publication.volume">Vol. {{ publication.volume }}</span>
                <span v-if="publication.pages" class="mx-2">•</span>
                <span v-if="publication.pages">{{ publication.pages }}</span>
              </p>
            </div>

            <!-- Publication Metrics -->
            <div class="flex flex-wrap items-center gap-4 text-sm">
              <div class="flex items-center space-x-1">
                <svg class="h-4 w-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
                <span class="card-publication-meta">{{ publication.citations || 0 }} citations</span>
              </div>
              <div v-if="publication.impact" class="flex items-center space-x-1">
                <svg class="h-4 w-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
                <span class="card-publication-meta">IF: {{ publication.impact }}</span>
              </div>
            </div>

            <!-- Publication Tags -->
            <div class="flex flex-wrap gap-2">
              <span
                v-for="category in publication.categories"
                :key="category"
                class="card-publication-tag px-2 py-1 rounded text-xs font-medium"
              >
                {{ category }}
              </span>
              <span
                v-for="technique in publication.techniques"
                :key="technique"
                class="card-publication-tag px-2 py-1 rounded text-xs font-medium"
              >
                {{ technique }}
              </span>
              <span
                v-for="target in publication.targets"
                :key="target"
                class="card-publication-tag px-2 py-1 rounded text-xs font-medium"
              >
                {{ target }}
              </span>
            </div>

            <!-- Publication Link -->
            <div class="flex justify-end">
              <a
                v-if="publication.link"
                :href="publication.link"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 transition-colors duration-200"
              >
                View Publication
                <svg class="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </ResponsiveGrid>

      <!-- No Results Message -->
      <div v-if="filteredPublications.length === 0 && !isLoading" class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">No publications found</h3>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Try adjusting your filters or search terms.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useExternalData } from '../../composables/useExternalData'
import ResponsiveGrid from '../ui/ResponsiveGrid.vue'

// Use external data for consistent information
const {
  data,
  publicationCount,
  citationCount,
  hIndex,
  refreshData,
  isLoading
} = useExternalData()

const activeFilter = ref('all')
const searchQuery = ref('')
const selectedResearchArea = ref('all')
const selectedTechnique = ref('all')
const selectedTarget = ref('all')

// Force data refresh on component mount
onMounted(async () => {
  console.log('InteractiveProjects component mounted, refreshing data...')
  await refreshData()
  console.log('Data refreshed, publications count:', data.value.publicationsList?.length || 0)
})

// Watch for data changes and log them
watch(() => data.value.publicationsList, (newPublications) => {
  console.log('Publications data updated:', newPublications?.length || 0, 'publications')
  if (newPublications && newPublications.length > 0) {
    console.log('Sample publication:', newPublications[0])
  }
}, { immediate: true })

// Comprehensive categorization system
const categorizePublication = (title: string, snippet: string, authors: string) => {
  const content = (title + ' ' + snippet + ' ' + authors).toLowerCase()
  const categories: string[] = []
  const techniques: string[] = []
  const targets: string[] = []

  // Research Area Categorization
  if (content.includes('small molecule') || content.includes('drug discovery') || content.includes('lead compound')) {
    categories.push('Small Molecule Drug Discovery')
  }
  if (content.includes('peptide') || content.includes('protein') || content.includes('antibody') || content.includes('biologic')) {
    categories.push('Biologics & Peptides')
  }
  if (content.includes('organometallic') || content.includes('metal complex') || content.includes('oxovanadium') || content.includes('chalcone')) {
    categories.push('Organometallics')
  }
  if (content.includes('medicinal plant') || content.includes('natural product') || content.includes('herbal') || content.includes('cassia')) {
    categories.push('Natural Products & Medicinal Plants')
  }
  if (content.includes('cancer') || content.includes('oncology') || content.includes('tumor') || content.includes('breast cancer')) {
    categories.push('Cancer Research')
  }
  if (content.includes('covid') || content.includes('sars') || content.includes('tuberculosis') || content.includes('malaria')) {
    categories.push('Infectious Diseases')
  }
  if (content.includes('parkinson') || content.includes('neurodegenerative') || content.includes('mao') || content.includes('monoamine')) {
    categories.push('Neurodegenerative Diseases')
  }
  if (content.includes('diabetes') || content.includes('diabetic') || content.includes('metabolic') || content.includes('insulin')) {
    categories.push('Metabolic Disorders')
  }
  if (content.includes('formulation') || content.includes('polymer') || content.includes('delivery') || content.includes('biodegradable')) {
    categories.push('Drug Formulation')
  }

  // Technique/Methodology Categorization
  if (content.includes('molecular docking') || content.includes('docking')) {
    techniques.push('Molecular Docking')
  }
  if (content.includes('molecular dynamics') || content.includes('md simulation') || content.includes('dynamics simulation')) {
    techniques.push('Molecular Dynamics')
  }
  if (content.includes('pharmacophore') || content.includes('pharmacophoric')) {
    techniques.push('Pharmacophore Modeling')
  }
  if (content.includes('qsar') || content.includes('quantitative structure') || content.includes('3d-qsar')) {
    techniques.push('QSAR & 3D-QSAR')
  }
  if (content.includes('virtual screening') || content.includes('virtual screen')) {
    techniques.push('Virtual Screening')
  }
  if (content.includes('machine learning') || content.includes('ml') || content.includes('ai') || content.includes('artificial intelligence')) {
    techniques.push('Machine Learning & AI')
  }
  if (content.includes('spectroscopy') || content.includes('spectroscopic') || content.includes('uv') || content.includes('cd')) {
    techniques.push('Spectroscopy')
  }
  if (content.includes('synthesis') || content.includes('synthesized') || content.includes('chemical synthesis')) {
    techniques.push('Chemical Synthesis')
  }
  if (content.includes('bioinformatics') || content.includes('genomic') || content.includes('proteomic')) {
    techniques.push('Bioinformatics')
  }

  // Target Type Categorization
  if (content.includes('enzyme') || content.includes('kinase') || content.includes('aurora') || content.includes('mmp')) {
    targets.push('Enzymes')
  }
  if (content.includes('receptor') || content.includes('par2') || content.includes('g protein')) {
    targets.push('Receptors')
  }
  if (content.includes('dna') || content.includes('rna') || content.includes('nucleic acid') || content.includes('groove binding')) {
    targets.push('DNA/RNA')
  }
  if (content.includes('protein') || content.includes('albumin') || content.includes('bsa') || content.includes('serum')) {
    targets.push('Proteins')
  }
  if (content.includes('ion channel') || content.includes('channel')) {
    targets.push('Ion Channels')
  }
  if (content.includes('transporter') || content.includes('carrier')) {
    targets.push('Transporters')
  }

  return {
    categories: categories.length > 0 ? categories : ['Research'],
    techniques: techniques.length > 0 ? techniques : ['Computational'],
    targets: targets.length > 0 ? targets : ['Molecular Targets']
  }
}

// Use real publications data from Google Scholar
const publications = computed(() => {
  console.log('Computing publications, data available:', !!data.value.publicationsList)
  console.log('Publications count:', data.value.publicationsList?.length || 0)

  if (!data.value.publicationsList || data.value.publicationsList.length === 0) {
    console.log('No real data available, using fallback data')
    // Fallback to sample data if no real data available
    return [
      {
        id: 1,
        title: "Large-scale computational screening of Indian medicinal plants reveals Cassia angustifolia to be a potentially anti-diabetic",
        authors: "Devaraji, Vinod and Sivaraman, Jayanthi and Prabhu, S",
        journal: "Journal of Biomolecular Structure and Dynamics",
        year: "2024",
        volume: "42",
        pages: "194-210",
        citations: 15,
        impact: "3.2",
        tags: ["Computational Biology", "Drug Discovery", "Medicinal Plants"],
        publisher: "Taylor & Francis",
        link: "#",
        categories: ["Natural Products & Medicinal Plants", "Metabolic Disorders"],
        techniques: ["Machine Learning & AI", "Virtual Screening"],
        targets: ["Enzymes"]
      },
      {
        id: 2,
        title: "Exploring the potential of machine learning to design antidiabetic molecules: a comprehensive study with experimental validation",
        authors: "Devaraji, Vinod and Sivaraman, Jayanthi",
        journal: "Journal of Biomolecular Structure and Dynamics",
        year: "2024",
        volume: "42",
        pages: "13290-13311",
        citations: 8,
        impact: "3.2",
        tags: ["Machine Learning", "Drug Design", "Diabetes"],
        publisher: "Taylor & Francis",
        link: "#",
        categories: ["Small Molecule Drug Discovery", "Metabolic Disorders"],
        techniques: ["Machine Learning & AI", "Molecular Docking"],
        targets: ["Enzymes"]
      }
    ]
  }

  console.log('Using real Google Scholar data')
  // Convert Google Scholar data to our format with comprehensive categorization
  return data.value.publicationsList.map((pub: any, index: number) => {
    const categorization = categorizePublication(pub.title, pub.snippet || '', pub.authors || '')
    return {
      id: index + 1,
      title: pub.title,
      authors: pub.authors || 'N/A',
      journal: pub.publication || 'N/A',
      year: pub.year || 'N/A',
      volume: pub.volume || '',
      pages: pub.pages || '',
      citations: pub.citations || 0,
      impact: "3.2", // Default impact factor
      tags: generateTags(pub.title, pub.snippet || ''),
      publisher: extractPublisher(pub.publication || ''),
      link: pub.link || '#',
      categories: categorization.categories,
      techniques: categorization.techniques,
      targets: categorization.targets
    }
  })
})

// Generate tags based on publication content
const generateTags = (title: string, snippet: string) => {
  const content = (title + ' ' + snippet).toLowerCase()
  const tags = []

  if (content.includes('machine learning') || content.includes('ml') || content.includes('ai')) {
    tags.push('Machine Learning')
  }
  if (content.includes('drug discovery') || content.includes('drug design')) {
    tags.push('Drug Discovery')
  }
  if (content.includes('molecular') || content.includes('docking')) {
    tags.push('Molecular Modeling')
  }
  if (content.includes('cancer') || content.includes('oncology')) {
    tags.push('Cancer Research')
  }
  if (content.includes('diabetes') || content.includes('diabetic')) {
    tags.push('Diabetes')
  }
  if (content.includes('covid') || content.includes('sars')) {
    tags.push('COVID-19')
  }
  if (content.includes('medicinal') || content.includes('plant')) {
    tags.push('Medicinal Plants')
  }

  return tags.length > 0 ? tags : ['Research', 'Peer-reviewed']
}

// Extract publisher from journal name
const extractPublisher = (journal: string) => {
  if (journal.includes('Taylor & Francis') || journal.includes('Journal of Biomolecular Structure and Dynamics')) {
    return 'Taylor & Francis'
  }
  if (journal.includes('RSC') || journal.includes('Royal Society')) {
    return 'Royal Society of Chemistry'
  }
  if (journal.includes('Elsevier') || journal.includes('Bioorganic')) {
    return 'Elsevier'
  }
  if (journal.includes('Springer') || journal.includes('Molecular')) {
    return 'Springer'
  }
  return 'Academic Publisher'
}

// Advanced filtering system
const filteredPublications = computed(() => {
  let filtered = publications.value

  // Filter by year
  if (activeFilter.value !== 'all') {
    filtered = filtered.filter(pub => pub.year === activeFilter.value)
  }

  // Filter by research area
  if (selectedResearchArea.value !== 'all') {
    filtered = filtered.filter(pub =>
      pub.categories.some(cat =>
        cat.toLowerCase().includes(selectedResearchArea.value.replace('-', ' '))
      )
    )
  }

  // Filter by technique
  if (selectedTechnique.value !== 'all') {
    filtered = filtered.filter(pub =>
      pub.techniques.some(tech =>
        tech.toLowerCase().includes(selectedTechnique.value.replace('-', ' '))
      )
    )
  }

  // Filter by target type
  if (selectedTarget.value !== 'all') {
    filtered = filtered.filter(pub =>
      pub.targets.some(target =>
        target.toLowerCase().includes(selectedTarget.value.replace('-', ' '))
      )
    )
  }

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(pub =>
      pub.title.toLowerCase().includes(query) ||
      pub.authors.toLowerCase().includes(query) ||
      pub.journal.toLowerCase().includes(query) ||
      pub.tags.some(tag => tag.toLowerCase().includes(query)) ||
      pub.categories.some(cat => cat.toLowerCase().includes(query)) ||
      pub.techniques.some(tech => tech.toLowerCase().includes(query))
    )
  }

  return filtered
})

// Filter management
const updateFilters = () => {
  // This function is called when filters change
  // The computed properties handle the filtering automatically
}

const clearAllFilters = () => {
  activeFilter.value = 'all'
  selectedResearchArea.value = 'all'
  selectedTechnique.value = 'all'
  selectedTarget.value = 'all'
  searchQuery.value = ''
}

const hasActiveFilters = computed(() => {
  return activeFilter.value !== 'all' ||
         selectedResearchArea.value !== 'all' ||
         selectedTechnique.value !== 'all' ||
         selectedTarget.value !== 'all' ||
         searchQuery.value !== ''
})

const activeFiltersList = computed(() => {
  const filters: string[] = []
  if (activeFilter.value !== 'all') filters.push(`Year: ${activeFilter.value}`)
  if (selectedResearchArea.value !== 'all') filters.push(`Research Area: ${selectedResearchArea.value.replace('-', ' ')}`)
  if (selectedTechnique.value !== 'all') filters.push(`Technique: ${selectedTechnique.value.replace('-', ' ')}`)
  if (selectedTarget.value !== 'all') filters.push(`Target: ${selectedTarget.value.replace('-', ' ')}`)
  if (searchQuery.value) filters.push(`Search: "${searchQuery.value}"`)
  return filters
})

// Statistics
const totalPublications = computed(() => publications.value.length)
const totalCitations = computed(() => publications.value.reduce((sum, pub) => sum + (pub.citations || 0), 0))
const totalFilteredCitations = computed(() => filteredPublications.value.reduce((sum, pub) => sum + (pub.citations || 0), 0))
const averageImpact = computed(() => {
  const impacts = publications.value.map(pub => parseFloat(pub.impact)).filter(impact => !isNaN(impact))
  return impacts.length > 0 ? (impacts.reduce((sum, impact) => sum + impact, 0) / impacts.length).toFixed(1) : '0.0'
})
const averageFilteredImpact = computed(() => {
  const impacts = filteredPublications.value.map(pub => parseFloat(pub.impact)).filter(impact => !isNaN(impact))
  return impacts.length > 0 ? (impacts.reduce((sum, impact) => sum + impact, 0) / impacts.length).toFixed(1) : '0.0'
})
const researchYears = computed(() => {
  const years = publications.value.map(pub => parseInt(pub.year)).filter(year => !isNaN(year))
  return years.length > 0 ? Math.max(...years) - Math.min(...years) + 1 : 0
})

// Get unique years for filter buttons
const availableYears = computed(() => {
  const years = [...new Set(publications.value.map(pub => pub.year))]
    .filter(year => year && year !== 'N/A' && year !== 'n/a' && !isNaN(parseInt(year)))
    .sort((a, b) => parseInt(b) - parseInt(a))
  return years
})
</script>

<style scoped>
/* Year filter scrolling styles */
.overflow-x-auto {
  scrollbar-width: thin;
  scrollbar-color: rgba(156, 163, 175, 0.5) transparent;
}

.overflow-x-auto::-webkit-scrollbar {
  height: 4px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background-color: rgba(156, 163, 175, 0.5);
  border-radius: 2px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background-color: rgba(156, 163, 175, 0.7);
}

/* Ensure filters don't overflow on small screens */
@media (max-width: 768px) {
  .filter-bar {
    flex-direction: column;
    gap: 1rem;
  }

  .filter-bar > div {
    width: 100%;
  }

  .overflow-x-auto {
    max-width: 100%;
  }
}
</style>