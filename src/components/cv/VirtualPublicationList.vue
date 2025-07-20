<template>
  <div class="virtual-publication-list">
    <!-- Search and Filter Controls -->
    <div class="controls-panel">
      <div class="search-section">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search publications..."
          class="search-input"
          @input="handleSearch"
        >
        <div class="search-stats">
          {{ filteredPublications.length }} of {{ publications.length }} publications
        </div>
      </div>

      <div class="filter-section">
        <select v-model="selectedYear" @change="handleFilter" class="filter-select">
          <option value="">All Years</option>
          <option v-for="year in availableYears" :key="year" :value="year">
            {{ year }}
          </option>
        </select>

        <select v-model="selectedJournal" @change="handleFilter" class="filter-select">
          <option value="">All Journals</option>
          <option v-for="journal in availableJournals" :key="journal" :value="journal">
            {{ journal }}
          </option>
        </select>

        <select v-model="sortBy" @change="handleSort" class="filter-select">
          <option value="date">Sort by Date</option>
          <option value="title">Sort by Title</option>
          <option value="citations">Sort by Citations</option>
          <option value="journal">Sort by Journal</option>
        </select>
      </div>
    </div>

    <!-- Virtual Scroller -->
    <VirtualScroller
      ref="scrollerRef"
      :items="filteredPublications"
      :item-height="120"
      :height="600"
      :loading="loading"
      @scroll-end="handleScrollEnd"
      @item-visible="handleItemVisible"
    >
      <template #default="{ item, index }">
        <div class="publication-item">
          <div class="publication-header">
            <h3 class="publication-title">
              <a
                :href="item.url"
                target="_blank"
                rel="noopener noreferrer"
                class="title-link"
              >
                {{ item.title }}
              </a>
            </h3>
            <div class="publication-meta">
              <span class="journal">{{ item.journal }}</span>
              <span class="year">{{ item.year }}</span>
              <span class="citations" v-if="item.citations">
                {{ item.citations }} citations
              </span>
            </div>
          </div>

          <div class="publication-authors">
            <span class="authors-label">Authors:</span>
            <span class="authors-list">{{ item.authors.join(', ') }}</span>
          </div>

          <div class="publication-abstract" v-if="item.abstract">
            <p>{{ truncateAbstract(item.abstract) }}</p>
          </div>

          <div class="publication-tags" v-if="item.tags && item.tags.length">
            <span
              v-for="tag in item.tags.slice(0, 3)"
              :key="tag"
              class="tag"
            >
              {{ tag }}
            </span>
            <span v-if="item.tags.length > 3" class="tag-more">
              +{{ item.tags.length - 3 }} more
            </span>
          </div>

          <div class="publication-actions">
            <button
              @click="copyCitation(item)"
              class="action-btn"
              title="Copy citation"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
              </svg>
              Copy
            </button>
            <button
              @click="sharePublication(item)"
              class="action-btn"
              title="Share publication"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"/>
              </svg>
              Share
            </button>
          </div>
        </div>
      </template>

      <template #empty>
        <div class="empty-publications">
          <svg class="empty-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
          <h3>No publications found</h3>
          <p>Try adjusting your search criteria or filters</p>
        </div>
      </template>
    </VirtualScroller>

    <!-- Performance Stats (Development Only) -->
    <div v-if="isDevelopment" class="performance-stats">
      <div class="stat-item">
        <span class="stat-label">Visible Items:</span>
        <span class="stat-value">{{ visibleCount }}</span>
      </div>
      <div class="stat-item">
        <span class="stat-label">Total Items:</span>
        <span class="stat-value">{{ filteredPublications.length }}</span>
      </div>
      <div class="stat-item">
        <span class="stat-label">Render Time:</span>
        <span class="stat-value">{{ renderTime }}ms</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import VirtualScroller from '../ui/VirtualScroller.vue'

const isDevelopment = computed(() => import.meta.env.DEV)

interface Publication {
  id: string
  title: string
  authors: string[]
  journal: string
  year: number
  url: string
  abstract?: string
  citations?: number
  tags?: string[]
}

interface VirtualPublicationListProps {
  publications: Publication[]
  loading?: boolean
  itemHeight?: number
  height?: number
}

const props = withDefaults(defineProps<VirtualPublicationListProps>(), {
  loading: false,
  itemHeight: 120,
  height: 600
})

const emit = defineEmits<{
  'publication-click': [publication: Publication]
  'publication-share': [publication: Publication]
  'scroll-end': []
}>()

// Reactive state
const searchQuery = ref('')
const selectedYear = ref('')
const selectedJournal = ref('')
const sortBy = ref('date')
const visibleCount = ref(0)
const renderTime = ref(0)

// Refs
const scrollerRef = ref<InstanceType<typeof VirtualScroller>>()

// Computed properties
const availableYears = computed(() => {
  const years = [...new Set(props.publications.map(p => p.year))]
  return years.sort((a, b) => b - a)
})

const availableJournals = computed(() => {
  const journals = [...new Set(props.publications.map(p => p.journal))]
  return journals.sort()
})

const filteredPublications = computed(() => {
  const startTime = performance.now()

  let filtered = props.publications.filter(publication => {
    // Search filter
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      const matchesTitle = publication.title.toLowerCase().includes(query)
      const matchesAuthors = publication.authors.some(author =>
        author.toLowerCase().includes(query)
      )
      const matchesJournal = publication.journal.toLowerCase().includes(query)
      const matchesAbstract = publication.abstract?.toLowerCase().includes(query)

      if (!matchesTitle && !matchesAuthors && !matchesJournal && !matchesAbstract) {
        return false
      }
    }

    // Year filter
    if (selectedYear.value && publication.year !== parseInt(selectedYear.value)) {
      return false
    }

    // Journal filter
    if (selectedJournal.value && publication.journal !== selectedJournal.value) {
      return false
    }

    return true
  })

  // Sort publications
  filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'title':
        return a.title.localeCompare(b.title)
      case 'citations':
        return (b.citations || 0) - (a.citations || 0)
      case 'journal':
        return a.journal.localeCompare(b.journal)
      case 'date':
      default:
        return b.year - a.year
    }
  })

  renderTime.value = Math.round(performance.now() - startTime)
  return filtered
})

// Methods
const handleSearch = () => {
  // Debounced search could be implemented here
}

const handleFilter = () => {
  // Filters are reactive, no additional logic needed
}

const handleSort = () => {
  // Sorting is reactive, no additional logic needed
}

const handleScrollEnd = () => {
  emit('scroll-end')
}

const handleItemVisible = (item: Publication, index: number) => {
  if (scrollerRef.value) {
    const endIndex = scrollerRef.value.endIndex
    const startIndex = scrollerRef.value.startIndex
    visibleCount.value = endIndex - startIndex
  }
}

const truncateAbstract = (abstract: string, maxLength: number = 200) => {
  if (abstract.length <= maxLength) return abstract
  return abstract.substring(0, maxLength) + '...'
}

const copyCitation = async (publication: Publication) => {
  const citation = `${publication.authors.join(', ')}. ${publication.title}. ${publication.journal}. ${publication.year}.`

  try {
    await navigator.clipboard.writeText(citation)
    console.log('Citation copied to clipboard')
  } catch (error) {
    console.error('Failed to copy citation:', error)
  }
}

const sharePublication = (publication: Publication) => {
  emit('publication-share', publication)

  if (navigator.share) {
    navigator.share({
      title: publication.title,
      text: `${publication.authors.join(', ')}. ${publication.title}`,
      url: publication.url
    })
  }
}

const scrollToPublication = (index: number) => {
  scrollerRef.value?.scrollToItem(index, 'smooth')
}

const scrollToTop = () => {
  scrollerRef.value?.scrollToTop('smooth')
}

// Expose methods
defineExpose({
  scrollToPublication,
  scrollToTop,
  searchQuery: computed(() => searchQuery.value),
  filteredCount: computed(() => filteredPublications.value.length)
})

// Watch for changes in publications to reset scroll position
watch(() => props.publications.length, () => {
  if (scrollerRef.value) {
    scrollerRef.value.scrollToTop()
  }
})
</script>

<style scoped>
.virtual-publication-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.controls-panel {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.search-section {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.search-input {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #ced4da;
  border-radius: 6px;
  font-size: 0.875rem;
  transition: border-color 0.2s;
}

.search-input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
}

.search-stats {
  font-size: 0.875rem;
  color: #6c757d;
  white-space: nowrap;
}

.filter-section {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.filter-select {
  padding: 0.5rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 0.875rem;
  background: white;
  min-width: 120px;
}

.publication-item {
  padding: 1rem;
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  margin: 0.5rem;
  transition: all 0.2s;
}

.publication-item:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.publication-header {
  margin-bottom: 0.75rem;
}

.publication-title {
  margin: 0 0 0.5rem 0;
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.4;
}

.title-link {
  color: #007bff;
  text-decoration: none;
  transition: color 0.2s;
}

.title-link:hover {
  color: #0056b3;
  text-decoration: underline;
}

.publication-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.875rem;
  color: #6c757d;
  flex-wrap: wrap;
}

.journal {
  font-weight: 500;
  color: #495057;
}

.citations {
  color: #28a745;
  font-weight: 500;
}

.publication-authors {
  margin-bottom: 0.75rem;
  font-size: 0.875rem;
}

.authors-label {
  font-weight: 500;
  color: #495057;
  margin-right: 0.5rem;
}

.authors-list {
  color: #6c757d;
}

.publication-abstract {
  margin-bottom: 0.75rem;
  font-size: 0.875rem;
  line-height: 1.5;
  color: #495057;
}

.publication-tags {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
}

.tag {
  padding: 0.25rem 0.5rem;
  background: #e9ecef;
  color: #495057;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
}

.tag-more {
  padding: 0.25rem 0.5rem;
  background: #f8f9fa;
  color: #6c757d;
  border-radius: 4px;
  font-size: 0.75rem;
  font-style: italic;
}

.publication-actions {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem 0.75rem;
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  font-size: 0.875rem;
  color: #495057;
  cursor: pointer;
  transition: all 0.2s;
}

.action-btn:hover {
  background: #e9ecef;
  border-color: #adb5bd;
}

.empty-publications {
  text-align: center;
  padding: 2rem;
  color: #6c757d;
}

.empty-icon {
  width: 3rem;
  height: 3rem;
  margin-bottom: 1rem;
  color: #dee2e6;
}

.performance-stats {
  display: flex;
  gap: 1rem;
  padding: 0.75rem;
  background: #f8f9fa;
  border-radius: 6px;
  font-size: 0.875rem;
}

.stat-item {
  display: flex;
  gap: 0.5rem;
}

.stat-label {
  color: #6c757d;
}

.stat-value {
  font-weight: 600;
  color: #495057;
}

@media (max-width: 768px) {
  .filter-section {
    flex-direction: column;
  }

  .filter-select {
    min-width: auto;
  }

  .publication-meta {
    flex-direction: column;
    gap: 0.5rem;
  }

  .performance-stats {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>