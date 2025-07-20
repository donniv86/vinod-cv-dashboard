<template>
  <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
    <h3 class="text-xl font-bold text-gray-800 mb-4">📊 Data Management Panel</h3>

    <!-- Current Data Display -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div class="bg-blue-50 p-4 rounded-lg">
        <h4 class="font-semibold text-blue-800 mb-2">Publications</h4>
        <div class="text-2xl font-bold text-blue-600">{{ data.publications.count }}</div>
        <div class="text-sm text-blue-600">{{ data.publications.citations }} citations</div>
        <div class="text-sm text-blue-600">H-index: {{ data.publications.hIndex }}</div>
      </div>

      <div class="bg-green-50 p-4 rounded-lg">
        <h4 class="font-semibold text-green-800 mb-2">GitHub</h4>
        <div class="text-2xl font-bold text-green-600">{{ data.github.repositories }}</div>
        <div class="text-sm text-green-600">{{ data.github.stars }} stars</div>
        <div class="text-sm text-green-600">{{ data.github.languages.join(', ') }}</div>
      </div>

      <div class="bg-purple-50 p-4 rounded-lg">
        <h4 class="font-semibold text-purple-800 mb-2">Experience</h4>
        <div class="text-2xl font-bold text-purple-600">{{ data.linkedin.experience }} years</div>
        <div class="text-sm text-purple-600">{{ data.linkedin.currentPosition }}</div>
        <div class="text-sm text-purple-600">{{ data.linkedin.company }}</div>
      </div>
    </div>

    <!-- Update Controls -->
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <div>
          <h4 class="font-semibold text-gray-800">Data Sources</h4>
          <p class="text-sm text-gray-600">GitHub: Auto-updating ✅ | Others: Manual updates</p>
        </div>
        <button
          @click="refreshData"
          :disabled="isLoading"
          class="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors"
        >
          {{ isLoading ? 'Updating...' : '🔄 Refresh Data' }}
        </button>
      </div>

      <!-- Quick Update Form -->
      <div class="bg-gray-50 p-4 rounded-lg">
        <h5 class="font-semibold text-gray-800 mb-3">Quick Update</h5>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Publications Count</label>
            <input
              v-model.number="updateForm.publications.count"
              type="number"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Citations</label>
            <input
              v-model.number="updateForm.publications.citations"
              type="number"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">H-Index</label>
            <input
              v-model.number="updateForm.publications.hIndex"
              type="number"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Experience Years</label>
            <input
              v-model.number="updateForm.linkedin.experience"
              type="number"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <button
          @click="updateData"
          class="mt-3 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          💾 Update Data
        </button>
      </div>

      <!-- Instructions -->
      <div class="bg-yellow-50 p-4 rounded-lg">
        <h5 class="font-semibold text-yellow-800 mb-2">📝 How to Update Data</h5>
        <div class="text-sm text-yellow-700 space-y-1">
          <p>• <strong>GitHub:</strong> Updates automatically from your GitHub profile</p>
          <p>• <strong>Publications/Citations:</strong> Update manually in <code class="bg-yellow-100 px-1 rounded">src/config/manual-data.ts</code></p>
          <p>• <strong>Experience:</strong> Update manually in the same file</p>
          <p>• <strong>For full automation:</strong> Set up SerpAPI (Google Scholar) and Proxycurl (LinkedIn)</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useExternalData } from '../../composables/useExternalData'

const {
  data,
  isLoading,
  refreshData,
  updateManualData
} = useExternalData()

const updateForm = reactive({
  publications: {
    count: data.value.publications.count,
    citations: data.value.publications.citations,
    hIndex: data.value.publications.hIndex,
  },
  linkedin: {
    experience: data.value.linkedin.experience,
  }
})

const updateData = () => {
  updateManualData('publications', updateForm.publications)
  updateManualData('linkedin', updateForm.linkedin)

  // Update the form with new values
  updateForm.publications.count = data.value.publications.count
  updateForm.publications.citations = data.value.publications.citations
  updateForm.publications.hIndex = data.value.publications.hIndex
  updateForm.linkedin.experience = data.value.linkedin.experience

  alert('Data updated successfully!')
}
</script>