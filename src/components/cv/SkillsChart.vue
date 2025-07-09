<template>
  <div class="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
    <div class="flex justify-between items-center mb-6">
      <h3 class="text-xl font-semibold text-white bg-black/20 px-4 py-2 rounded-lg drop-shadow-lg" style="color: white !important;">Technical Skills</h3>

      <!-- Category Filter -->
      <div class="flex space-x-2">
        <button
          v-for="category in categories"
          :key="category"
          @click="selectedCategory = category"
          :class="[
            'px-3 py-1 rounded-full text-sm font-medium transition-all duration-300',
            selectedCategory === category
              ? 'bg-primary text-white shadow-lg scale-105'
              : 'bg-gray-100 dark:bg-gray-700 text-bodydark2 hover:bg-gray-200 dark:hover:bg-gray-600 hover:scale-105'
          ]"
        >
          {{ category }}
        </button>
      </div>
    </div>

    <!-- Skills Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div
        v-for="skill in filteredSkills"
        :key="skill.name"
        class="p-4 border border-stroke dark:border-strokedark rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 hover:border-primary/50"
      >
        <div class="flex justify-between items-center mb-2">
          <span class="font-medium text-black dark:text-white">{{ skill.name }}</span>
          <span class="text-sm text-bodydark2 font-semibold">{{ skill.level }}%</span>
        </div>

        <!-- Progress Bar -->
        <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
          <div
            :class="getColorByLevel(skill.level)"
            class="h-3 rounded-full transition-all duration-1000 ease-out"
            :style="{ width: skill.level + '%' }"
          ></div>
        </div>

        <div class="mt-2">
          <span class="text-xs text-bodydark2 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">{{ skill.category }}</span>
        </div>
      </div>
    </div>

    <!-- Skills Summary -->
    <div class="mt-6 p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-lg">
      <h4 class="font-semibold text-black dark:text-white mb-4">Skills Summary</h4>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div class="text-center p-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
          <div class="text-2xl font-bold text-success">{{ skills.filter(s => s.level >= 90).length }}</div>
          <div class="text-bodydark2">Expert</div>
        </div>
        <div class="text-center p-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
          <div class="text-2xl font-bold text-primary">{{ skills.filter(s => s.level >= 80 && s.level < 90).length }}</div>
          <div class="text-bodydark2">Advanced</div>
        </div>
        <div class="text-center p-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
          <div class="text-2xl font-bold text-warning">{{ skills.filter(s => s.level >= 70 && s.level < 80).length }}</div>
          <div class="text-bodydark2">Intermediate</div>
        </div>
        <div class="text-center p-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
          <div class="text-2xl font-bold text-danger">{{ skills.filter(s => s.level < 70).length }}</div>
          <div class="text-bodydark2">Learning</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const skills = ref([
  { name: 'Python', level: 95, category: 'Programming' },
  { name: 'Machine Learning', level: 90, category: 'AI/ML' },
  { name: 'Molecular Modeling', level: 95, category: 'Drug Discovery' },
  { name: 'Schrödinger Suite', level: 95, category: 'Tools' },
  { name: 'Cheminformatics', level: 90, category: 'Drug Discovery' },
  { name: 'Molecular Dynamics', level: 85, category: 'Simulation' },
  { name: 'Structure-Based Design', level: 90, category: 'Drug Discovery' },
  { name: 'Ligand-Based Design', level: 85, category: 'Drug Discovery' },
  { name: 'TensorFlow/PyTorch', level: 80, category: 'AI/ML' },
  { name: 'AWS/GCP', level: 75, category: 'Cloud' },
  { name: 'Shell Scripting', level: 80, category: 'Programming' },
  { name: 'Git', level: 85, category: 'Programming' },
  { name: 'KNIME', level: 80, category: 'Tools' },
  { name: 'GROMACS', level: 75, category: 'Tools' },
  { name: 'Quantum Mechanics', level: 70, category: 'Simulation' }
])

const categories = ref(['All', 'Programming', 'AI/ML', 'Drug Discovery', 'Tools', 'Simulation', 'Cloud'])

const selectedCategory = ref('All')

const filteredSkills = computed(() => {
  if (selectedCategory.value === 'All') {
    return skills.value
  }
  return skills.value.filter(skill => skill.category === selectedCategory.value)
})

const getColorByLevel = (level: number) => {
  if (level >= 90) return 'bg-success'
  if (level >= 80) return 'bg-primary'
  if (level >= 70) return 'bg-warning'
  return 'bg-danger'
}
</script>