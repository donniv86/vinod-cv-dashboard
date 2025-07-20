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
      <div class="card-metric p-4 rounded-lg">
        <div class="flex items-center justify-between">
          <div>
            <p class="card-metric-label">Experience</p>
            <p class="card-metric-value">{{ experienceYears }}+ Years</p>
          </div>
          <div class="text-3xl">⏰</div>
        </div>
        <p class="text-xs card-metric-label mt-2">CADD & Molecular Modeling</p>
      </div>

      <!-- Publications -->
      <div class="card-metric p-4 rounded-lg">
        <div class="flex items-center justify-between">
          <div>
            <p class="card-metric-label">Publications</p>
            <p class="card-metric-value">{{ publicationCount }}+</p>
          </div>
          <div class="text-3xl">📚</div>
        </div>
        <p class="text-xs card-metric-label mt-2">Peer-Reviewed Papers</p>
      </div>

      <!-- Citations -->
      <div class="card-metric p-4 rounded-lg">
        <div class="flex items-center justify-between">
          <div>
            <p class="card-metric-label">Citations</p>
            <p class="card-metric-value">{{ citationCount.toLocaleString() }}</p>
          </div>
          <div class="text-3xl">📊</div>
        </div>
        <p class="text-xs card-metric-label mt-2">Google Scholar</p>
      </div>

      <!-- H-Index -->
      <div class="card-metric p-4 rounded-lg">
        <div class="flex items-center justify-between">
          <div>
            <p class="card-metric-label">H-Index</p>
            <p class="card-metric-value">{{ hIndex }}</p>
          </div>
          <div class="text-3xl">🎯</div>
        </div>
        <p class="text-xs card-metric-label mt-2">Research Impact</p>
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
import { ref, onMounted } from 'vue';
import { useExternalData } from '../../composables/useExternalData';

const metrics = [
  {
    id: 1,
    title: "Total Publications",
    value: "44",
    change: "+13",
    changeType: "positive",
    description: "Peer-reviewed research papers",
    icon: "📚",
    color: "blue",
    details: "Published in high-impact journals including ACS, RSC, Elsevier, and Springer"
  },
  {
    id: 2,
    title: "Total Citations",
    value: "674",
    change: "+156",
    changeType: "positive",
    description: "Citations across all publications",
    icon: "📊",
    color: "green",
    details: "Average of 15+ citations per publication"
  },
  {
    id: 3,
    title: "H-Index",
    value: "15",
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

const { experienceYears, publicationCount, citationCount, hIndex } = useExternalData();
</script>