<template>
  <div class="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
    <div class="flex justify-between items-center mb-6">
      <h3 class="text-xl font-semibold text-black dark:text-white">Technical Skills</h3>

      <!-- Category Filter -->
      <div class="flex space-x-2">
        <button
          v-for="category in categories"
          :key="category"
          @click="selectedCategory = category"
          :class="[
            'px-3 py-1 rounded-full text-sm font-medium transition-colors',
            selectedCategory === category
              ? 'bg-primary text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-bodydark2 hover:bg-gray-200 dark:hover:bg-gray-600'
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
        class="p-4 border border-stroke dark:border-strokedark rounded-lg hover:shadow-md transition-shadow"
      >
        <div class="flex justify-between items-center mb-2">
          <span class="font-medium text-black dark:text-white">{{ skill.name }}</span>
          <span class="text-sm text-bodydark2">{{ skill.level }}%</span>
        </div>

        <!-- Progress Bar -->
        <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            :class="getColorByLevel(skill.level)"
            class="h-2 rounded-full transition-all duration-300"
            :style="{ width: skill.level + '%' }"
          ></div>
        </div>

        <div class="mt-1">
          <span class="text-xs text-bodydark2">{{ skill.category }}</span>
        </div>
      </div>
    </div>

    <!-- Skills Summary -->
    <div class="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <h4 class="font-semibold text-black dark:text-white mb-2">Skills Summary</h4>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div class="text-center">
          <div class="text-2xl font-bold text-primary">{{ skills.filter(s => s.level >= 90).length }}</div>
          <div class="text-bodydark2">Expert</div>
        </div>
        <div class="text-center">
          <div class="text-2xl font-bold text-success">{{ skills.filter(s => s.level >= 80 && s.level < 90).length }}</div>
          <div class="text-bodydark2">Advanced</div>
        </div>
        <div class="text-center">
          <div class="text-2xl font-bold text-warning">{{ skills.filter(s => s.level >= 70 && s.level < 80).length }}</div>
          <div class="text-bodydark2">Intermediate</div>
        </div>
        <div class="text-center">
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
  { name: 'Vue.js', level: 90, category: 'Frontend' },
  { name: 'React', level: 85, category: 'Frontend' },
  { name: 'JavaScript', level: 95, category: 'Programming' },
  { name: 'TypeScript', level: 80, category: 'Programming' },
  { name: 'Node.js', level: 85, category: 'Backend' },
  { name: 'Python', level: 75, category: 'Programming' },
  { name: 'Docker', level: 70, category: 'DevOps' },
  { name: 'AWS', level: 65, category: 'Cloud' },
  { name: 'MongoDB', level: 80, category: 'Database' },
  { name: 'PostgreSQL', level: 75, category: 'Database' }
])

const categories = ref(['All', 'Frontend', 'Backend', 'Programming', 'DevOps', 'Cloud', 'Database'])

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