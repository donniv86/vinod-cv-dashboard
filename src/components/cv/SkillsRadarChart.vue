<template>
  <div class="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
    <div class="mb-6">
      <h3 class="text-xl font-semibold text-black dark:text-white mb-2">
        🎯 Technical Skills Radar
      </h3>
      <p class="text-bodydark2">Interactive visualization of core competencies</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Radar Chart Container -->
      <div class="relative">
        <canvas ref="radarCanvas" width="300" height="300" class="mx-auto"></canvas>

        <!-- Skill Legend -->
        <div class="mt-4 grid grid-cols-2 gap-2 text-xs">
          <div v-for="skill in skills" :key="skill.name"
               class="flex items-center space-x-2 p-2 rounded bg-gray-50 dark:bg-gray-800">
            <div class="w-3 h-3 rounded-full" :style="{ backgroundColor: skill.color }"></div>
            <span class="text-bodydark2">{{ skill.name }}</span>
            <span class="ml-auto font-semibold text-primary">{{ skill.level }}%</span>
          </div>
        </div>
      </div>

      <!-- Skills Categories -->
      <div class="space-y-4">
        <div v-for="category in skillCategories" :key="category.name"
             class="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 p-4 rounded-lg">
          <h4 class="font-semibold text-black dark:text-white mb-3 flex items-center">
            <span class="mr-2">{{ category.icon }}</span>
            {{ category.name }}
          </h4>
          <div class="space-y-2">
            <div v-for="skill in category.skills" :key="skill.name"
                 class="flex items-center justify-between">
              <span class="text-sm text-bodydark2">{{ skill.name }}</span>
              <div class="flex items-center space-x-2">
                <div class="w-20 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div class="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-500"
                       :style="{ width: skill.proficiency + '%' }"></div>
                </div>
                <span class="text-xs font-medium text-primary w-8">{{ skill.proficiency }}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Skill Highlights -->
    <div class="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <div class="text-2xl mb-2">🧬</div>
        <h4 class="font-semibold text-blue-800 dark:text-blue-200">Molecular Modeling</h4>
        <p class="text-xs text-blue-600 dark:text-blue-400">Expert Level</p>
      </div>

      <div class="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg border border-green-200 dark:border-green-800">
        <div class="text-2xl mb-2">🤖</div>
        <h4 class="font-semibold text-green-800 dark:text-green-200">AI/ML</h4>
        <p class="text-xs text-green-600 dark:text-green-400">Advanced Level</p>
      </div>

      <div class="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg border border-purple-200 dark:border-purple-800">
        <div class="text-2xl mb-2">💻</div>
        <h4 class="font-semibold text-purple-800 dark:text-purple-200">Programming</h4>
        <p class="text-xs text-purple-600 dark:text-purple-400">Proficient Level</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const radarCanvas = ref<HTMLCanvasElement>()

const skills = ref([
  { name: 'Molecular Modeling', level: 95, color: '#3B82F6' },
  { name: 'AI/ML', level: 90, color: '#10B981' },
  { name: 'Cheminformatics', level: 92, color: '#8B5CF6' },
  { name: 'Drug Discovery', level: 88, color: '#F59E0B' },
  { name: 'Programming', level: 85, color: '#EF4444' },
  { name: 'Data Analysis', level: 87, color: '#06B6D4' }
])

const skillCategories = ref([
  {
    name: 'Core Competencies',
    icon: '🧬',
    skills: [
      { name: 'Molecular Dynamics', proficiency: 95 },
      { name: 'Docking & Scoring', proficiency: 92 },
      { name: 'QSAR Modeling', proficiency: 88 },
      { name: 'Structure-Based Design', proficiency: 90 }
    ]
  },
  {
    name: 'AI & Machine Learning',
    icon: '🤖',
    skills: [
      { name: 'Deep Learning', proficiency: 85 },
      { name: 'Predictive Modeling', proficiency: 90 },
      { name: 'Neural Networks', proficiency: 82 },
      { name: 'Feature Engineering', proficiency: 88 }
    ]
  },
  {
    name: 'Programming & Tools',
    icon: '💻',
    skills: [
      { name: 'Python', proficiency: 90 },
      { name: 'R', proficiency: 85 },
      { name: 'Schrödinger Suite', proficiency: 95 },
      { name: 'OpenMM', proficiency: 88 }
    ]
  }
])

onMounted(() => {
  drawRadarChart()
})

const drawRadarChart = () => {
  const canvas = radarCanvas.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const centerX = canvas.width / 2
  const centerY = canvas.height / 2
  const radius = Math.min(centerX, centerY) - 20

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // Draw radar grid
  const levels = 5
  for (let i = 1; i <= levels; i++) {
    const currentRadius = (radius * i) / levels
    ctx.beginPath()
    ctx.strokeStyle = '#E5E7EB'
    ctx.lineWidth = 1

    for (let j = 0; j < skills.value.length; j++) {
      const angle = (j * 2 * Math.PI) / skills.value.length - Math.PI / 2
      const x = centerX + currentRadius * Math.cos(angle)
      const y = centerY + currentRadius * Math.sin(angle)

      if (j === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    }
    ctx.closePath()
    ctx.stroke()
  }

  // Draw skill points and area
  ctx.beginPath()
  skills.value.forEach((skill, index) => {
    const angle = (index * 2 * Math.PI) / skills.value.length - Math.PI / 2
    const skillRadius = (radius * skill.level) / 100
    const x = centerX + skillRadius * Math.cos(angle)
    const y = centerY + skillRadius * Math.sin(angle)

    if (index === 0) {
      ctx.moveTo(x, y)
    } else {
      ctx.lineTo(x, y)
    }
  })
  ctx.closePath()

  // Fill area with gradient
  const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius)
  gradient.addColorStop(0, 'rgba(59, 130, 246, 0.3)')
  gradient.addColorStop(1, 'rgba(59, 130, 246, 0.1)')
  ctx.fillStyle = gradient
  ctx.fill()

  // Draw skill points
  skills.value.forEach((skill, index) => {
    const angle = (index * 2 * Math.PI) / skills.value.length - Math.PI / 2
    const skillRadius = (radius * skill.level) / 100
    const x = centerX + skillRadius * Math.cos(angle)
    const y = centerY + skillRadius * Math.sin(angle)

    ctx.beginPath()
    ctx.arc(x, y, 4, 0, 2 * Math.PI)
    ctx.fillStyle = skill.color
    ctx.fill()

    // Draw skill labels
    const labelRadius = radius + 15
    const labelX = centerX + labelRadius * Math.cos(angle)
    const labelY = centerY + labelRadius * Math.sin(angle)

    ctx.font = '12px Arial'
    ctx.fillStyle = '#374151'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(skill.name, labelX, labelY)
  })
}
</script>