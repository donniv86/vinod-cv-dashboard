<template>
  <div class="bg-gray-900/50 backdrop-blur-sm rounded-lg border border-gray-700/50 px-5 pt-6 pb-2.5 shadow-lg">
    <div class="mb-6">
              <h3 class="text-xl font-semibold text-white mb-2 bg-black/20 px-4 py-2 rounded-lg drop-shadow-lg" style="color: white !important;">
          🎯 Technical Skills Radar
        </h3>
      <p class="text-sky-300">Interactive visualization of core competencies</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Radar Chart Container -->
      <div class="relative">
        <canvas ref="radarCanvas" width="300" height="300" class="mx-auto"></canvas>

        <!-- Skill Legend -->
        <div class="mt-4 grid grid-cols-2 gap-2 text-xs">
          <div v-for="skill in skills" :key="skill.name"
               class="flex items-center space-x-2 p-2 rounded bg-gray-800/50 border border-gray-700/50">
            <div class="w-3 h-3 rounded-full" :style="{ backgroundColor: skill.color }"></div>
            <span class="text-sky-300">{{ skill.name }}</span>
                          <span class="ml-auto font-semibold text-cyan-300">{{ skill.level }}%</span>
          </div>
        </div>
      </div>

      <!-- Skills Categories -->
      <div class="space-y-4">
        <div v-for="category in skillCategories" :key="category.name"
             class="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg border border-gray-700/50">
          <h4 class="font-semibold text-white mb-3 flex items-center bg-black/20 px-4 py-2 rounded-lg drop-shadow-lg" style="color: white !important;">
            <span class="mr-2">{{ category.icon }}</span>
            {{ category.name }}
          </h4>
          <div class="space-y-2">
            <div v-for="skill in category.skills" :key="skill.name"
                 class="flex items-center justify-between">
              <span class="text-sm text-sky-300">{{ skill.name }}</span>
              <div class="flex items-center space-x-2">
                <div class="w-20 bg-gray-700 rounded-full h-2">
                  <div class="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                       :style="{ width: skill.proficiency + '%' }"></div>
                </div>
                <span class="text-xs font-medium text-blue-300 w-8">{{ skill.proficiency }}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Skill Highlights -->
    <div class="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="text-center p-4 bg-gradient-to-br from-blue-900/20 to-blue-800/20 rounded-lg border border-blue-700/50">
        <div class="text-2xl mb-2">🧬</div>
        <h4 class="font-semibold text-blue-200">CADD</h4>
        <p class="text-xs text-blue-400">Expert Level</p>
      </div>

      <div class="text-center p-4 bg-gradient-to-br from-green-900/20 to-green-800/20 rounded-lg border border-green-700/50">
        <div class="text-2xl mb-2">💻</div>
        <h4 class="font-semibold text-green-200">Schrödinger Suite</h4>
        <p class="text-xs text-green-400">Advanced Level</p>
      </div>

      <div class="text-center p-4 bg-gradient-to-br from-purple-900/20 to-purple-800/20 rounded-lg border border-purple-700/50">
        <div class="text-2xl mb-2">⚡</div>
        <h4 class="font-semibold text-purple-200">Python Programming</h4>
        <p class="text-xs text-purple-400">Proficient Level</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const radarCanvas = ref<HTMLCanvasElement>()

const skills = ref([
  { name: 'CADD', level: 95, color: '#3B82F6' },
  { name: 'Molecular Modeling', level: 92, color: '#10B981' },
  { name: 'Schrödinger Suite', level: 90, color: '#8B5CF6' },
  { name: 'Drug Discovery', level: 88, color: '#F59E0B' },
  { name: 'Python Programming', level: 85, color: '#EF4444' },
  { name: 'Pharmacophore Modeling', level: 87, color: '#06B6D4' }
])

const skillCategories = ref([
  {
    name: 'Core Research Skills',
    icon: '🧬',
    skills: [
      { name: 'Computer-Aided Drug Design', proficiency: 95 },
      { name: 'Molecular Dynamics', proficiency: 92 },
      { name: 'Docking & Scoring', proficiency: 88 },
      { name: 'Structure-Based Design', proficiency: 90 }
    ]
  },
  {
    name: 'Software & Tools',
    icon: '💻',
    skills: [
      { name: 'Schrödinger Suite', proficiency: 90 },
      { name: 'Maestro', proficiency: 88 },
      { name: 'Glide', proficiency: 85 },
      { name: 'Prime', proficiency: 87 }
    ]
  },
  {
    name: 'Programming & Analysis',
    icon: '⚡',
    skills: [
      { name: 'Python', proficiency: 85 },
      { name: 'R', proficiency: 80 },
      { name: 'Data Analysis', proficiency: 88 },
      { name: 'Statistical Modeling', proficiency: 82 }
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
    ctx.strokeStyle = '#374151'
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