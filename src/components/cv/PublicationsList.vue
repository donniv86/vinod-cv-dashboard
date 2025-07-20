<template>
  <div class="bg-white rounded-lg shadow-lg p-6">
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-2xl font-bold text-gray-800">📚 Research Publications</h3>
      <div class="text-sm text-gray-600">
        Last updated: {{ formatDate(data.publications.lastUpdated) }}
      </div>
    </div>

    <!-- Publication Statistics -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <div class="bg-blue-50 p-4 rounded-lg text-center">
        <div class="text-3xl font-bold text-blue-600">{{ data.publications.count }}</div>
        <div class="text-sm text-blue-700">Total Publications</div>
      </div>
      <div class="bg-green-50 p-4 rounded-lg text-center">
        <div class="text-3xl font-bold text-green-600">{{ data.publications.citations.toLocaleString() }}</div>
        <div class="text-sm text-green-700">Total Citations</div>
      </div>
      <div class="bg-purple-50 p-4 rounded-lg text-center">
        <div class="text-3xl font-bold text-purple-600">{{ data.publications.hIndex }}</div>
        <div class="text-sm text-purple-700">H-Index</div>
      </div>
      <div class="bg-orange-50 p-4 rounded-lg text-center">
        <div class="text-3xl font-bold text-orange-600">{{ data.publications.averageCitations || 0 }}</div>
        <div class="text-sm text-orange-700">Avg Citations</div>
      </div>
    </div>

    <!-- Enhanced Metrics -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <!-- Citation Distribution -->
      <div class="bg-gray-50 p-4 rounded-lg">
        <h4 class="font-semibold text-gray-800 mb-3">Citation Distribution</h4>
        <div class="space-y-2">
          <div v-for="(count, range) in data.metrics?.citationRanges" :key="range"
               class="flex justify-between items-center">
            <span class="text-sm text-gray-600">{{ range }} citations</span>
            <div class="flex items-center">
              <div class="w-20 bg-gray-200 rounded-full h-2 mr-2">
                <div class="bg-blue-500 h-2 rounded-full"
                     :style="{ width: `${(count / data.publications.count) * 100}%` }"></div>
              </div>
              <span class="text-sm font-medium text-gray-800">{{ count }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Top Journals -->
      <div class="bg-gray-50 p-4 rounded-lg">
        <h4 class="font-semibold text-gray-800 mb-3">Top Publishing Journals</h4>
        <div class="space-y-2">
          <div v-for="journal in data.metrics?.topJournals?.slice(0, 5)" :key="journal.journal"
               class="flex justify-between items-center">
            <span class="text-sm text-gray-600 truncate">{{ journal.journal }}</span>
            <span class="text-sm font-medium text-gray-800">{{ journal.count }} papers</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Publications List -->
    <div class="mb-6">
      <div class="flex items-center justify-between mb-4">
        <h4 class="text-lg font-semibold text-gray-800">Recent Publications</h4>
        <div class="flex space-x-2">
          <button @click="sortBy = 'citations'"
                  :class="sortBy === 'citations' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'"
                  class="px-3 py-1 rounded text-sm">
            Sort by Citations
          </button>
          <button @click="sortBy = 'year'"
                  :class="sortBy === 'year' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'"
                  class="px-3 py-1 rounded text-sm">
            Sort by Year
          </button>
        </div>
      </div>

      <div class="space-y-4">
        <div v-for="(publication, index) in sortedPublications" :key="index"
             class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <h5 class="font-semibold text-gray-800 mb-2 line-clamp-2">{{ publication.title }}</h5>
              <div class="text-sm text-gray-600 mb-2">
                <span class="font-medium">Authors:</span> {{ publication.authors || 'N/A' }}
              </div>
              <div class="text-sm text-gray-600 mb-2">
                <span class="font-medium">Journal:</span> {{ publication.publication || 'N/A' }}
                <span v-if="publication.year" class="ml-2">({{ publication.year }})</span>
              </div>
              <p class="text-sm text-gray-700 line-clamp-2">{{ publication.snippet }}</p>
            </div>
            <div class="ml-4 text-right">
              <div class="text-2xl font-bold text-blue-600">{{ publication.citations }}</div>
              <div class="text-xs text-gray-500">citations</div>
            </div>
          </div>
          <div v-if="publication.link" class="mt-3">
            <a :href="publication.link" target="_blank"
               class="text-blue-500 hover:text-blue-700 text-sm font-medium">
              View Publication →
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Load More Button -->
    <div v-if="data.publicationsList && data.publicationsList.length > 10" class="text-center">
      <button @click="showAll = !showAll"
              class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors">
        {{ showAll ? 'Show Less' : `Show All ${data.publicationsList?.length || 0} Publications` }}
      </button>
    </div>

    <!-- Collaboration Network -->
    <div v-if="data.metrics?.topCollaborators && data.metrics.topCollaborators.length > 0" class="mt-8 bg-gray-50 p-4 rounded-lg">
      <h4 class="font-semibold text-gray-800 mb-3">Top Research Collaborators</h4>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        <div v-for="collaborator in (data.metrics?.topCollaborators || []).slice(0, 8)" :key="collaborator.author"
             class="bg-white p-3 rounded border">
          <div class="text-sm font-medium text-gray-800 truncate">{{ collaborator.author }}</div>
          <div class="text-xs text-gray-600">{{ collaborator.count }} joint papers</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useExternalData } from '../../composables/useExternalData'

const { data } = useExternalData()

const sortBy = ref<'citations' | 'year'>('citations')
const showAll = ref(false)

const sortedPublications = computed(() => {
  if (!data.value.publicationsList) return []

  let publications = [...data.value.publicationsList]

  if (sortBy.value === 'citations') {
    publications.sort((a, b) => b.citations - a.citations)
  } else if (sortBy.value === 'year') {
    publications.sort((a, b) => {
      const yearA = parseInt(a.year) || 0
      const yearB = parseInt(b.year) || 0
      return yearB - yearA
    })
  }

  return showAll.value ? publications : publications.slice(0, 10)
})

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>