<template>
  <div class="interactive-timeline" :class="[`variant-${variant}`, `size-${size}`]">
    <!-- Timeline Header -->
    <div v-if="showHeader" class="timeline-header">
      <h3 v-if="title" class="timeline-title">{{ title }}</h3>
      <p v-if="description" class="timeline-description">{{ description }}</p>

      <!-- Filter Controls -->
      <div v-if="showFilters && categories.length > 0" class="timeline-filters">
        <button
          v-for="category in categories"
          :key="category"
          @click="toggleFilter(category)"
          class="filter-btn"
          :class="{ 'active': activeFilters.includes(category) }"
        >
          {{ category }}
        </button>
        <button
          v-if="activeFilters.length > 0"
          @click="clearFilters"
          class="filter-btn clear-btn"
        >
          Clear All
        </button>
      </div>
    </div>

    <!-- Timeline Container -->
    <div class="timeline-container" :class="{ 'is-vertical': isVertical }">
      <!-- Timeline Line -->
      <div class="timeline-line">
        <div class="timeline-progress" :style="{ width: `${progressPercentage}%` }"></div>
      </div>

      <!-- Timeline Items -->
      <div
        v-for="(item, index) in filteredItems"
        :key="item.id"
        class="timeline-item"
        :class="[
          `item-${item.category}`,
          { 'is-active': activeItem?.id === item.id },
          { 'is-expanded': expandedItems.includes(item.id) }
        ]"
        :style="{ '--item-index': index }"
      >
        <!-- Timeline Marker -->
        <div
          class="timeline-marker"
          @click="toggleItem(item)"
          :title="item.title"
        >
          <div class="marker-icon">
            <component
              v-if="item.icon"
              :is="item.icon"
              class="icon"
            />
            <span v-else class="marker-number">{{ index + 1 }}</span>
          </div>
          <div class="marker-pulse" v-if="item.highlight"></div>
        </div>

        <!-- Timeline Content -->
        <div class="timeline-content">
          <!-- Item Header -->
          <div class="item-header" @click="toggleItem(item)">
            <div class="item-meta">
              <h4 class="item-title">{{ item.title }}</h4>
              <div class="item-subtitle">
                <span v-if="item.subtitle" class="subtitle">{{ item.subtitle }}</span>
                <span v-if="item.date" class="date">{{ formatDate(item.date) }}</span>
              </div>
              <div v-if="item.category" class="item-category">
                <span class="category-badge">{{ item.category }}</span>
              </div>
            </div>
            <div class="item-actions">
              <button
                @click.stop="toggleExpand(item)"
                class="expand-btn"
                :class="{ 'expanded': expandedItems.includes(item.id) }"
                :title="expandedItems.includes(item.id) ? 'Collapse' : 'Expand'"
              >
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
            </div>
          </div>

          <!-- Item Body -->
          <div class="item-body" v-show="expandedItems.includes(item.id)">
            <div v-if="item.description" class="item-description">
              {{ item.description }}
            </div>

            <!-- Rich Content -->
            <div v-if="item.content" class="item-rich-content" v-html="item.content"></div>

            <!-- Tags -->
            <div v-if="item.tags && item.tags.length > 0" class="item-tags">
              <span
                v-for="tag in item.tags"
                :key="tag"
                class="tag"
              >
                {{ tag }}
              </span>
            </div>

            <!-- Links -->
            <div v-if="item.links && item.links.length > 0" class="item-links">
              <a
                v-for="link in item.links"
                :key="link.url"
                :href="link.url"
                :target="link.external ? '_blank' : '_self'"
                :rel="link.external ? 'noopener noreferrer' : ''"
                class="item-link"
              >
                <span v-if="link.icon" class="link-icon">
                  <component :is="link.icon" />
                </span>
                {{ link.text }}
                <span v-if="link.external" class="external-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                  </svg>
                </span>
              </a>
            </div>

            <!-- Actions -->
            <div v-if="item.actions && item.actions.length > 0" class="item-actions-list">
              <button
                v-for="action in item.actions"
                :key="action.id"
                @click="handleAction(action, item)"
                class="action-btn"
                :class="action.variant || 'default'"
              >
                <span v-if="action.icon" class="action-icon">
                  <component :is="action.icon" />
                </span>
                {{ action.text }}
              </button>
            </div>
          </div>
        </div>

        <!-- Timeline Connector -->
        <div
          v-if="index < filteredItems.length - 1"
          class="timeline-connector"
        ></div>
      </div>
    </div>

    <!-- Timeline Navigation -->
    <div v-if="showNavigation" class="timeline-navigation">
      <button
        @click="previousItem"
        :disabled="!canGoPrevious"
        class="nav-btn prev-btn"
        title="Previous item"
      >
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
      </button>

      <div class="nav-indicator">
        <span class="current-index">{{ currentIndex + 1 }}</span>
        <span class="separator">/</span>
        <span class="total-items">{{ filteredItems.length }}</span>
      </div>

      <button
        @click="nextItem"
        :disabled="!canGoNext"
        class="nav-btn next-btn"
        title="Next item"
      >
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, nextTick } from 'vue'

interface TimelineLink {
  text: string
  url: string
  external?: boolean
  icon?: any
}

interface TimelineAction {
  id: string
  text: string
  icon?: any
  variant?: 'default' | 'primary' | 'secondary' | 'danger'
  handler?: (item: TimelineItem) => void
}

interface TimelineItem {
  id: string
  title: string
  subtitle?: string
  description?: string
  content?: string
  date?: string | Date
  category?: string
  tags?: string[]
  links?: TimelineLink[]
  actions?: TimelineAction[]
  icon?: any
  highlight?: boolean
  color?: string
}

interface InteractiveTimelineProps {
  items: TimelineItem[]
  title?: string
  description?: string
  variant?: 'default' | 'compact' | 'detailed'
  size?: 'small' | 'medium' | 'large'
  isVertical?: boolean
  showHeader?: boolean
  showFilters?: boolean
  showNavigation?: boolean
  autoExpand?: boolean
  highlightCurrent?: boolean
  animateOnScroll?: boolean
}

const props = withDefaults(defineProps<InteractiveTimelineProps>(), {
  items: () => [],
  variant: 'default',
  size: 'medium',
  isVertical: false,
  showHeader: true,
  showFilters: true,
  showNavigation: true,
  autoExpand: false,
  highlightCurrent: true,
  animateOnScroll: true
})

const emit = defineEmits<{
  'item-click': [item: TimelineItem]
  'item-expand': [item: TimelineItem]
  'item-collapse': [item: TimelineItem]
  'filter-change': [filters: string[]]
  'action-click': [action: TimelineAction, item: TimelineItem]
}>()

// Reactive state
const activeItem = ref<TimelineItem | null>(null)
const expandedItems = ref<string[]>([])
const activeFilters = ref<string[]>([])
const currentIndex = ref(0)
const isVisible = ref(false)

// Computed properties
const categories = computed(() => {
  const cats = new Set(props.items.map(item => item.category).filter((cat): cat is string => Boolean(cat)))
  return Array.from(cats)
})

const filteredItems = computed(() => {
  if (activeFilters.value.length === 0) return props.items
  return props.items.filter(item =>
    item.category && activeFilters.value.includes(item.category)
  )
})

const progressPercentage = computed(() => {
  if (filteredItems.value.length === 0) return 0
  return ((currentIndex.value + 1) / filteredItems.value.length) * 100
})

const canGoPrevious = computed(() => currentIndex.value > 0)
const canGoNext = computed(() => currentIndex.value < filteredItems.value.length - 1)

// Methods
const toggleFilter = (category: string) => {
  const index = activeFilters.value.indexOf(category)
  if (index > -1) {
    activeFilters.value.splice(index, 1)
  } else {
    activeFilters.value.push(category)
  }
  emit('filter-change', activeFilters.value)
  currentIndex.value = 0
}

const clearFilters = () => {
  activeFilters.value = []
  emit('filter-change', activeFilters.value)
  currentIndex.value = 0
}

const toggleItem = (item: TimelineItem) => {
  if (activeItem.value?.id === item.id) {
    activeItem.value = null
  } else {
    activeItem.value = item
  }
  emit('item-click', item)
}

const toggleExpand = (item: TimelineItem) => {
  const index = expandedItems.value.indexOf(item.id)
  if (index > -1) {
    expandedItems.value.splice(index, 1)
    emit('item-collapse', item)
  } else {
    expandedItems.value.push(item.id)
    emit('item-expand', item)
  }
}

const nextItem = () => {
  if (canGoNext.value) {
    currentIndex.value++
    const item = filteredItems.value[currentIndex.value]
    if (item) {
      activeItem.value = item
      scrollToItem(item)
    }
  }
}

const previousItem = () => {
  if (canGoPrevious.value) {
    currentIndex.value--
    const item = filteredItems.value[currentIndex.value]
    if (item) {
      activeItem.value = item
      scrollToItem(item)
    }
  }
}

const scrollToItem = (item: TimelineItem) => {
  nextTick(() => {
    const element = document.querySelector(`[data-item-id="${item.id}"]`)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      })
    }
  })
}

const handleAction = (action: TimelineAction, item: TimelineItem) => {
  if (action.handler) {
    action.handler(item)
  }
  emit('action-click', action, item)
}

const formatDate = (date: string | Date) => {
  if (typeof date === 'string') return date
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// Auto-expand first item
watch(() => props.items, (newItems) => {
  if (props.autoExpand && newItems.length > 0) {
    expandedItems.value = [newItems[0].id]
  }
}, { immediate: true })

// Intersection Observer for animations
onMounted(() => {
  if (props.animateOnScroll) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            isVisible.value = true
            entry.target.classList.add('animate-in')
          }
        })
      },
      { threshold: 0.1 }
    )

    const timelineElement = document.querySelector('.interactive-timeline')
    if (timelineElement) {
      observer.observe(timelineElement)
    }
  }
})

// Expose methods
defineExpose({
  expandItem: (itemId: string) => {
    if (!expandedItems.value.includes(itemId)) {
      expandedItems.value.push(itemId)
    }
  },
  collapseItem: (itemId: string) => {
    const index = expandedItems.value.indexOf(itemId)
    if (index > -1) {
      expandedItems.value.splice(index, 1)
    }
  },
  expandAll: () => {
    expandedItems.value = props.items.map(item => item.id)
  },
  collapseAll: () => {
    expandedItems.value = []
  },
  goToItem: (itemId: string) => {
    const item = props.items.find(item => item.id === itemId)
    if (item) {
      activeItem.value = item
      const index = filteredItems.value.findIndex(i => i.id === itemId)
      if (index > -1) {
        currentIndex.value = index
      }
    }
  }
})
</script>

<style scoped>
.interactive-timeline {
  position: relative;
  width: 100%;
  font-family: inherit;
}

/* Timeline Header */
.timeline-header {
  margin-bottom: 2rem;
}

.timeline-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.timeline-description {
  color: #6b7280;
  margin-bottom: 1rem;
}

/* Filters */
.timeline-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}

.filter-btn {
  padding: 0.375rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background: white;
  color: #374151;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
}

.filter-btn:hover {
  background: #f9fafb;
  border-color: #9ca3af;
}

.filter-btn.active {
  background: #3b82f6;
  color: white;
  border-color: #3b82f6;
}

.clear-btn {
  background: #f3f4f6;
  color: #6b7280;
}

.clear-btn:hover {
  background: #e5e7eb;
}

/* Timeline Container */
.timeline-container {
  position: relative;
  padding: 1rem 0;
}

.timeline-container.is-vertical {
  padding-left: 2rem;
}

/* Timeline Line */
.timeline-line {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 1.5rem;
  width: 2px;
  background: #e5e7eb;
  z-index: 1;
}

.timeline-progress {
  height: 100%;
  background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
  transition: width 0.3s ease;
}

/* Timeline Items */
.timeline-item {
  position: relative;
  margin-bottom: 2rem;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.3s ease;
}

.timeline-item.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.timeline-item:nth-child(even) {
  animation-delay: 0.1s;
}

.timeline-item:nth-child(odd) {
  animation-delay: 0.2s;
}

.timeline-item.is-active {
  z-index: 10;
}

.timeline-item.is-expanded .timeline-content {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

/* Timeline Marker */
.timeline-marker {
  position: absolute;
  left: -0.5rem;
  top: 0.5rem;
  width: 2rem;
  height: 2rem;
  background: white;
  border: 3px solid #3b82f6;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 2;
}

.timeline-marker:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.marker-icon {
  width: 1rem;
  height: 1rem;
  color: #3b82f6;
}

.marker-number {
  font-size: 0.75rem;
  font-weight: 600;
  color: #3b82f6;
}

.marker-pulse {
  position: absolute;
  top: -0.25rem;
  left: -0.25rem;
  width: 2.5rem;
  height: 2.5rem;
  border: 2px solid #3b82f6;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}

/* Timeline Content */
.timeline-content {
  margin-left: 3rem;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1rem;
  transition: all 0.3s ease;
}

.timeline-content:hover {
  border-color: #3b82f6;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Item Header */
.item-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  cursor: pointer;
}

.item-meta {
  flex: 1;
}

.item-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.25rem;
}

.item-subtitle {
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #6b7280;
  font-size: 0.875rem;
}

.date {
  color: #9ca3af;
  font-size: 0.75rem;
}

.category-badge {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  background: #f3f4f6;
  color: #374151;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 500;
}

.expand-btn {
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 0.25rem;
  transition: all 0.2s;
}

.expand-btn:hover {
  background: #f3f4f6;
  color: #374151;
}

.expand-btn.expanded svg {
  transform: rotate(180deg);
}

.expand-btn svg {
  width: 1rem;
  height: 1rem;
  transition: transform 0.2s;
}

/* Item Body */
.item-body {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #f3f4f6;
}

.item-description {
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.item-rich-content {
  margin-bottom: 1rem;
}

.item-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tag {
  padding: 0.25rem 0.5rem;
  background: #f3f4f6;
  color: #374151;
  border-radius: 0.25rem;
  font-size: 0.75rem;
}

.item-links {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.item-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #3b82f6;
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.2s;
}

.item-link:hover {
  color: #1d4ed8;
  text-decoration: underline;
}

.link-icon, .external-icon {
  width: 1rem;
  height: 1rem;
}

.item-actions-list {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background: white;
  color: #374151;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
}

.action-btn:hover {
  background: #f9fafb;
  border-color: #9ca3af;
}

.action-btn.primary {
  background: #3b82f6;
  color: white;
  border-color: #3b82f6;
}

.action-btn.primary:hover {
  background: #1d4ed8;
}

.action-btn.secondary {
  background: #6b7280;
  color: white;
  border-color: #6b7280;
}

.action-btn.danger {
  background: #ef4444;
  color: white;
  border-color: #ef4444;
}

.action-icon {
  width: 1rem;
  height: 1rem;
}

/* Timeline Connector */
.timeline-connector {
  position: absolute;
  left: 1.5rem;
  top: 2.5rem;
  width: 2px;
  height: 2rem;
  background: #e5e7eb;
  z-index: 1;
}

/* Navigation */
.timeline-navigation {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 0.5rem;
}

.nav-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background: white;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s;
}

.nav-btn:hover:not(:disabled) {
  background: #f3f4f6;
  border-color: #9ca3af;
}

.nav-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.nav-btn svg {
  width: 1rem;
  height: 1rem;
}

.nav-indicator {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
  color: #6b7280;
}

.current-index {
  font-weight: 600;
  color: #374151;
}

/* Variants */
.variant-compact .timeline-content {
  padding: 0.75rem;
}

.variant-compact .item-title {
  font-size: 1rem;
}

.variant-detailed .timeline-content {
  padding: 1.5rem;
}

.variant-detailed .item-title {
  font-size: 1.25rem;
}

/* Sizes */
.size-small .timeline-marker {
  width: 1.5rem;
  height: 1.5rem;
  left: -0.25rem;
}

.size-small .timeline-content {
  margin-left: 2.5rem;
  padding: 0.75rem;
}

.size-large .timeline-marker {
  width: 2.5rem;
  height: 2.5rem;
  left: -0.75rem;
}

.size-large .timeline-content {
  margin-left: 3.5rem;
  padding: 1.5rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .timeline-container.is-vertical {
    padding-left: 1rem;
  }

  .timeline-line {
    left: 1rem;
  }

  .timeline-marker {
    left: -0.25rem;
  }

  .timeline-content {
    margin-left: 2.5rem;
  }

  .timeline-connector {
    left: 1rem;
  }

  .item-header {
    flex-direction: column;
    gap: 0.5rem;
  }

  .item-subtitle {
    flex-direction: column;
    gap: 0.25rem;
  }

  .timeline-filters {
    justify-content: center;
  }
}

/* High Contrast Mode */
@media (prefers-contrast: high) {
  .timeline-marker {
    border-width: 4px;
  }

  .timeline-line {
    background: #000;
  }

  .timeline-progress {
    background: #000;
  }
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .timeline-item,
  .timeline-content,
  .timeline-marker,
  .expand-btn svg {
    transition: none;
  }

  .marker-pulse {
    animation: none;
  }
}
</style>