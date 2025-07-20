<template>
  <div
    ref="containerRef"
    class="virtual-scroller"
    :style="{ height: `${height}px` }"
    @scroll="handleScroll"
  >
    <div
      class="virtual-scroller-content"
      :style="{
        height: `${totalHeight}px`,
        transform: `translateY(${offsetY}px)`
      }"
    >
      <div
        v-for="(item, index) in visibleItems"
        :key="getItemKey(item, startIndex + index)"
        :style="{ height: `${itemHeight}px` }"
        class="virtual-scroller-item"
      >
        <slot
          :item="item"
          :index="startIndex + index"
          :isVisible="true"
        />
      </div>
    </div>

    <!-- Loading indicator -->
    <div
      v-if="loading && visibleItems.length === 0"
      class="virtual-scroller-loading"
    >
      <div class="loading-spinner">
        <div class="spinner"></div>
        <span>Loading...</span>
      </div>
    </div>

    <!-- Empty state -->
    <div
      v-if="!loading && items.length === 0"
      class="virtual-scroller-empty"
    >
      <slot name="empty">
        <div class="empty-state">
          <svg class="empty-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
          <h3>No items found</h3>
          <p>Try adjusting your search or filters</p>
        </div>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'

interface VirtualScrollerProps {
  items: any[]
  itemHeight: number
  height: number
  overscan?: number
  loading?: boolean
  getItemKey?: (item: any, index: number) => string | number
}

const props = withDefaults(defineProps<VirtualScrollerProps>(), {
  overscan: 5,
  loading: false,
  getItemKey: (item: any, index: number) => item.id || item.key || index
})

const emit = defineEmits<{
  'scroll': [event: Event]
  'scroll-end': []
  'item-visible': [item: any, index: number]
}>()

const containerRef = ref<HTMLElement>()
const scrollTop = ref(0)

// Calculate visible range
const startIndex = computed(() => {
  return Math.max(0, Math.floor(scrollTop.value / props.itemHeight) - props.overscan)
})

const endIndex = computed(() => {
  const visibleCount = Math.ceil(props.height / props.itemHeight)
  return Math.min(
    props.items.length,
    Math.floor(scrollTop.value / props.itemHeight) + visibleCount + props.overscan
  )
})

const visibleItems = computed(() => {
  return props.items.slice(startIndex.value, endIndex.value)
})

const totalHeight = computed(() => {
  return props.items.length * props.itemHeight
})

const offsetY = computed(() => {
  return startIndex.value * props.itemHeight
})

// Handle scroll events
const handleScroll = (event: Event) => {
  const target = event.target as HTMLElement
  scrollTop.value = target.scrollTop

  emit('scroll', event)

  // Check if scrolled to bottom
  if (target.scrollTop + target.clientHeight >= target.scrollHeight - 10) {
    emit('scroll-end')
  }

  // Emit visible items
  visibleItems.value.forEach((item, index) => {
    emit('item-visible', item, startIndex.value + index)
  })
}

// Scroll to specific item
const scrollToItem = (index: number, behavior: 'auto' | 'smooth' = 'auto') => {
  if (!containerRef.value) return

  const scrollPosition = index * props.itemHeight
  containerRef.value.scrollTo({
    top: scrollPosition,
    behavior
  })
}

// Scroll to top
const scrollToTop = (behavior: 'auto' | 'smooth' = 'auto') => {
  if (!containerRef.value) return

  containerRef.value.scrollTo({
    top: 0,
    behavior
  })
}

// Get item at specific position
const getItemAtPosition = (y: number) => {
  const index = Math.floor(y / props.itemHeight)
  return {
    item: props.items[index],
    index
  }
}

// Update scroll position when items change
watch(() => props.items.length, () => {
  nextTick(() => {
    if (containerRef.value && scrollTop.value > totalHeight.value - props.height) {
      scrollTop.value = Math.max(0, totalHeight.value - props.height)
    }
  })
})

// Expose methods
defineExpose({
  scrollToItem,
  scrollToTop,
  getItemAtPosition,
  scrollTop: computed(() => scrollTop.value),
  startIndex: computed(() => startIndex.value),
  endIndex: computed(() => endIndex.value)
})
</script>

<style scoped>
.virtual-scroller {
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  border-radius: 8px;
  background: #f8f9fa;
}

.virtual-scroller-content {
  position: relative;
  width: 100%;
}

.virtual-scroller-item {
  width: 100%;
  box-sizing: border-box;
}

.virtual-scroller-loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.loading-spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  color: #6c757d;
}

.spinner {
  width: 2rem;
  height: 2rem;
  border: 3px solid #e9ecef;
  border-top: 3px solid #007bff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.virtual-scroller-empty {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #6c757d;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.empty-icon {
  width: 3rem;
  height: 3rem;
  color: #dee2e6;
}

.empty-state h3 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #495057;
}

.empty-state p {
  margin: 0;
  font-size: 0.875rem;
  color: #6c757d;
}

/* Custom scrollbar */
.virtual-scroller::-webkit-scrollbar {
  width: 8px;
}

.virtual-scroller::-webkit-scrollbar-track {
  background: #f1f3f4;
  border-radius: 4px;
}

.virtual-scroller::-webkit-scrollbar-thumb {
  background: #c1c7cd;
  border-radius: 4px;
}

.virtual-scroller::-webkit-scrollbar-thumb:hover {
  background: #a8b0b8;
}
</style>