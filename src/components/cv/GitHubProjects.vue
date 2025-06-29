<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-bold text-gray-800 dark:text-white">GitHub Projects & Technical Skills</h2>
      <div class="flex items-center space-x-2">
        <svg class="w-6 h-6 text-gray-600 dark:text-gray-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
        <span class="text-sm text-gray-600 dark:text-gray-400">@donniv86</span>
      </div>
    </div>

    <!-- Current Role Highlight -->
    <div class="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white mb-6">
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-xl font-bold mb-2">Senior Scientist at Schrödinger</h3>
          <p class="text-blue-100 mb-3">Leading computational drug discovery and machine learning initiatives</p>
          <div class="flex flex-wrap gap-2">
            <span class="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">Drug Discovery</span>
            <span class="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">Machine Learning</span>
            <span class="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">Molecular Modeling</span>
            <span class="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">Python</span>
          </div>
        </div>
        <div class="text-right">
          <div class="text-3xl font-bold">10</div>
          <div class="text-sm opacity-90">Repositories</div>
        </div>
      </div>
    </div>

    <!-- Featured Projects -->
    <div class="grid gap-6 mb-8">
      <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">Featured Projects</h3>

      <div v-for="project in featuredProjects" :key="project.id"
           class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-all duration-300">
        <div class="flex justify-between items-start mb-4">
          <div class="flex-1">
            <h4 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">
              <a :href="project.url" target="_blank" class="hover:text-blue-600 dark:hover:text-blue-400">
                {{ project.name }}
              </a>
            </h4>
            <p class="text-gray-600 dark:text-gray-300 text-sm mb-3">{{ project.description }}</p>
            <div class="flex flex-wrap gap-2 mb-3">
              <span v-for="tech in project.technologies" :key="tech"
                    class="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-xs font-medium">
                {{ tech }}
              </span>
            </div>
          </div>
          <div class="ml-4 text-right">
            <div class="text-sm text-gray-500 dark:text-gray-400">{{ project.type }}</div>
            <div v-if="project.stars" class="flex items-center justify-end mt-1">
              <svg class="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              <span class="text-sm text-gray-600 dark:text-gray-400">{{ project.stars }}</span>
            </div>
          </div>
        </div>

        <div class="flex justify-between items-center">
          <div class="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
            <span class="flex items-center">
              <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
              </svg>
              {{ project.lastUpdated }}
            </span>
          </div>
          <a :href="project.url" target="_blank"
             class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium">
            View Project →
          </a>
        </div>
      </div>
    </div>

    <!-- Technical Skills -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">Programming & Tools</h3>
        <div class="space-y-3">
          <div v-for="skill in programmingSkills" :key="skill.name" class="flex justify-between items-center">
            <span class="text-gray-700 dark:text-gray-300">{{ skill.name }}</span>
            <div class="flex items-center">
              <div class="w-24 bg-gray-200 dark:bg-gray-600 rounded-full h-2 mr-2">
                <div class="bg-blue-600 h-2 rounded-full" :style="{ width: skill.level + '%' }"></div>
              </div>
              <span class="text-sm text-gray-500 dark:text-gray-400">{{ skill.level }}%</span>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">Domain Expertise</h3>
        <div class="space-y-3">
          <div v-for="expertise in domainExpertise" :key="expertise.name" class="flex justify-between items-center">
            <span class="text-gray-700 dark:text-gray-300">{{ expertise.name }}</span>
            <div class="flex items-center">
              <div class="w-24 bg-gray-200 dark:bg-gray-600 rounded-full h-2 mr-2">
                <div class="bg-green-600 h-2 rounded-full" :style="{ width: expertise.level + '%' }"></div>
              </div>
              <span class="text-sm text-gray-500 dark:text-gray-400">{{ expertise.level }}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- GitHub Stats -->
    <div class="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 text-white">
        <div class="text-2xl font-bold">10</div>
        <div class="text-sm opacity-90">Repositories</div>
      </div>
      <div class="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-4 text-white">
        <div class="text-2xl font-bold">5</div>
        <div class="text-sm opacity-90">Following</div>
      </div>
      <div class="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-4 text-white">
        <div class="text-2xl font-bold">13+</div>
        <div class="text-sm opacity-90">Years Experience</div>
      </div>
      <div class="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
        <div class="text-2xl font-bold">31</div>
        <div class="text-sm opacity-90">Publications</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const featuredProjects = ref([
  {
    id: 1,
    name: "ligand_ml",
    description: "Machine learning applications in ligand-based drug discovery at Schrödinger",
    url: "https://github.com/schrodinger/ligand_ml",
    type: "Schrödinger Project",
    technologies: ["Python", "Machine Learning", "Drug Discovery", "Schrödinger Suite"],
    lastUpdated: "2024",
    stars: null
  },
  {
    id: 2,
    name: "AutoClaQSAR",
    description: "Automated QSAR modeling and classification for drug discovery",
    url: "https://github.com/donniv86/AutoClaQSAR",
    type: "Public Repository",
    technologies: ["Python", "QSAR", "Machine Learning", "Drug Design"],
    lastUpdated: "2023",
    stars: 5
  },
  {
    id: 3,
    name: "Tox2020Analysis",
    description: "Comprehensive analysis of toxicity data using Jupyter notebooks",
    url: "https://github.com/donniv86/Tox2020Analysis",
    type: "Jupyter Notebook",
    technologies: ["Python", "Jupyter", "Data Analysis", "Toxicology"],
    lastUpdated: "2023",
    stars: 3
  },
  {
    id: 4,
    name: "Linear-Algebra-with-Python",
    description: "Mathematical computing and linear algebra implementations in Python",
    url: "https://github.com/donniv86/Linear-Algebra-with-Python",
    type: "Jupyter Notebook",
    technologies: ["Python", "Linear Algebra", "Mathematics", "NumPy"],
    lastUpdated: "2023",
    stars: 2
  },
  {
    id: 5,
    name: "uniprot_analysis",
    description: "Bioinformatics analysis of UniProt protein database",
    url: "https://github.com/donniv86/uniprot_analysis",
    type: "Jupyter Notebook",
    technologies: ["Python", "Bioinformatics", "Protein Analysis", "Pandas"],
    lastUpdated: "2023",
    stars: 4
  },
  {
    id: 6,
    name: "automate_email_workshop",
    description: "Automation workflows for email processing and management",
    url: "https://github.com/donniv86/automate_email_workshop",
    type: "Python",
    technologies: ["Python", "Automation", "Email", "Workflow"],
    lastUpdated: "2023",
    stars: 1
  }
])

const programmingSkills = ref([
  { name: "Python", level: 95 },
  { name: "Jupyter Notebooks", level: 90 },
  { name: "Machine Learning", level: 85 },
  { name: "Schrödinger Suite", level: 90 },
  { name: "Molecular Modeling", level: 88 },
  { name: "Data Analysis", level: 85 },
  { name: "Git/GitHub", level: 80 },
  { name: "Bioinformatics", level: 75 }
])

const domainExpertise = ref([
  { name: "Drug Discovery", level: 95 },
  { name: "QSAR Modeling", level: 90 },
  { name: "Molecular Dynamics", level: 88 },
  { name: "Computational Chemistry", level: 85 },
  { name: "Toxicology Analysis", level: 80 },
  { name: "Protein Analysis", level: 75 },
  { name: "Machine Learning", level: 85 },
  { name: "Automation", level: 70 }
])
</script>