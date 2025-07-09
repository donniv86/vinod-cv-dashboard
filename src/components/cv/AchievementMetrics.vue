<template>
  <div class="rounded-sm border border-gray-700 bg-gray-900/50 backdrop-blur-sm px-5 pt-6 pb-2.5 shadow-default sm:px-7.5 xl:pb-1">
    <div class="mb-6">
      <h3 class="text-xl font-semibold text-white mb-2 bg-black/20 px-4 py-2 rounded-lg drop-shadow-lg" style="color: white !important;">
        🏆 Key Achievements & Impact
      </h3>
      <p class="text-bodydark2">Quantified results and career milestones</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <!-- Years of Experience -->
      <div class="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-blue-600 dark:text-blue-400 font-medium">Experience</p>
            <p class="text-2xl font-bold text-blue-800 dark:text-blue-200">10+ Years</p>
          </div>
          <div class="text-3xl">⏰</div>
        </div>
        <p class="text-xs text-blue-600 dark:text-blue-400 mt-2">CADD & Molecular Modeling</p>
      </div>

      <!-- Publications -->
      <div class="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-green-600 dark:text-green-400 font-medium">Publications</p>
            <p class="text-2xl font-bold text-green-800 dark:text-green-200">18+</p>
          </div>
          <div class="text-3xl">📚</div>
        </div>
        <p class="text-xs text-green-600 dark:text-green-400 mt-2">Peer-Reviewed Papers</p>
      </div>

      <!-- Citations -->
      <div class="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-purple-600 dark:text-purple-400 font-medium">Citations</p>
            <p class="text-2xl font-bold text-purple-800 dark:text-purple-200">682</p>
          </div>
          <div class="text-3xl">📊</div>
        </div>
        <p class="text-xs text-purple-600 dark:text-purple-400 mt-2">Google Scholar</p>
      </div>

      <!-- H-Index -->
      <div class="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-orange-600 dark:text-orange-400 font-medium">H-Index</p>
            <p class="text-2xl font-bold text-orange-800 dark:text-orange-200">16</p>
          </div>
          <div class="text-3xl">🎯</div>
        </div>
        <p class="text-xs text-orange-600 dark:text-orange-400 mt-2">Research Impact</p>
      </div>
    </div>

    <!-- Impact Metrics -->
    <div class="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div class="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
        <h4 class="font-semibold text-white mb-2">🧬 Research Focus</h4>
        <ul class="text-sm text-gray-300 space-y-1">
          <li>• Computer-Aided Drug Design (CADD)</li>
          <li>• Molecular Modeling & Dynamics</li>
          <li>• Cancer Therapeutics</li>
          <li>• Pharmacophore Modeling</li>
        </ul>
      </div>

      <div class="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
        <h4 class="font-semibold text-white mb-2">🏢 Current Position</h4>
        <ul class="text-sm text-gray-300 space-y-1">
          <li>• Application Scientist</li>
          <li>• Schrödinger Inc.</li>
          <li>• CADD Applications</li>
          <li>• Industry Leadership</li>
        </ul>
      </div>

      <div class="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
        <h4 class="font-semibold text-white mb-2">💻 Technical Expertise</h4>
        <ul class="text-sm text-gray-300 space-y-1">
          <li>• Schrödinger Suite</li>
          <li>• Molecular Dynamics</li>
          <li>• Python Programming</li>
          <li>• Drug Discovery Pipeline</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const metrics = [
  {
    id: 1,
    title: "Total Publications",
    value: "31",
    change: "+3",
    changeType: "positive",
    description: "Peer-reviewed research papers",
    icon: "📚",
    color: "blue",
    details: "Published in high-impact journals including ACS, RSC, Elsevier, and Springer"
  },
  {
    id: 2,
    title: "Total Citations",
    value: "1,247",
    change: "+156",
    changeType: "positive",
    description: "Citations across all publications",
    icon: "📊",
    color: "green",
    details: "Average of 40+ citations per publication"
  },
  {
    id: 3,
    title: "H-Index",
    value: "16",
    change: "+2",
    changeType: "positive",
    description: "Hirsch index based on citations",
    icon: "🎯",
    color: "purple",
    details: "Consistent research impact over 13+ years"
  },
  {
    id: 4,
    title: "Research Years",
    value: "13+",
    change: "Active",
    changeType: "positive",
    description: "Years of active research",
    icon: "⏰",
    color: "orange",
    details: "Continuous research from 2011 to present"
  },
  {
    id: 5,
    title: "Avg Impact Factor",
    value: "3.2",
    change: "+0.3",
    changeType: "positive",
    description: "Average journal impact factor",
    icon: "⭐",
    color: "indigo",
    details: "Publications in journals with IF 1.2-6.2"
  },
  {
    id: 6,
    title: "Research Areas",
    value: "8+",
    change: "Diverse",
    changeType: "positive",
    description: "Different research domains",
    icon: "🔬",
    color: "teal",
    details: "Drug discovery, computational biology, cancer research, and more"
  }
]
</script>