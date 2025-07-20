<template>
  <div class="skeleton-loader" :class="[`variant-${variant}`, `size-${size}`, { 'is-animated': isAnimated }]">
    <!-- Card Skeleton -->
    <div v-if="variant === 'card'" class="skeleton-card">
      <div class="skeleton-header">
        <div class="skeleton-avatar" :style="{ width: avatarSize, height: avatarSize }"></div>
        <div class="skeleton-content">
          <div class="skeleton-title"></div>
          <div class="skeleton-subtitle"></div>
        </div>
      </div>
      <div class="skeleton-body">
        <div class="skeleton-line" v-for="i in lines" :key="i" :style="{ width: getLineWidth(i) }"></div>
      </div>
      <div v-if="showFooter" class="skeleton-footer">
        <div class="skeleton-button"></div>
        <div class="skeleton-button"></div>
      </div>
    </div>

    <!-- List Item Skeleton -->
    <div v-else-if="variant === 'list-item'" class="skeleton-list-item">
      <div class="skeleton-icon" :style="{ width: iconSize, height: iconSize }"></div>
      <div class="skeleton-content">
        <div class="skeleton-title"></div>
        <div class="skeleton-subtitle"></div>
        <div class="skeleton-line" v-for="i in lines" :key="i" :style="{ width: getLineWidth(i) }"></div>
      </div>
    </div>

    <!-- Table Row Skeleton -->
    <div v-else-if="variant === 'table-row'" class="skeleton-table-row">
      <div class="skeleton-cell" v-for="i in columns" :key="i" :style="{ width: getColumnWidth(i) }">
        <div class="skeleton-line"></div>
      </div>
    </div>

    <!-- Profile Skeleton -->
    <div v-else-if="variant === 'profile'" class="skeleton-profile">
      <div class="skeleton-avatar-large"></div>
      <div class="skeleton-name"></div>
      <div class="skeleton-title"></div>
      <div class="skeleton-bio">
        <div class="skeleton-line" v-for="i in 3" :key="i" :style="{ width: getLineWidth(i) }"></div>
      </div>
      <div class="skeleton-stats">
        <div class="skeleton-stat" v-for="i in 3" :key="i">
          <div class="skeleton-stat-value"></div>
          <div class="skeleton-stat-label"></div>
        </div>
      </div>
    </div>

    <!-- Chart Skeleton -->
    <div v-else-if="variant === 'chart'" class="skeleton-chart">
      <div class="skeleton-chart-header">
        <div class="skeleton-title"></div>
        <div class="skeleton-subtitle"></div>
      </div>
      <div class="skeleton-chart-body">
        <div class="skeleton-chart-bars">
          <div class="skeleton-bar" v-for="i in 5" :key="i" :style="{ height: getBarHeight(i) }"></div>
        </div>
        <div class="skeleton-chart-labels">
          <div class="skeleton-label" v-for="i in 5" :key="i"></div>
        </div>
      </div>
    </div>

    <!-- Timeline Skeleton -->
    <div v-else-if="variant === 'timeline'" class="skeleton-timeline">
      <div class="skeleton-timeline-item" v-for="i in 3" :key="i">
        <div class="skeleton-timeline-dot"></div>
        <div class="skeleton-timeline-content">
          <div class="skeleton-title"></div>
          <div class="skeleton-subtitle"></div>
          <div class="skeleton-line" v-for="j in 2" :key="j" :style="{ width: getLineWidth(j) }"></div>
        </div>
      </div>
    </div>

    <!-- Grid Skeleton -->
    <div v-else-if="variant === 'grid'" class="skeleton-grid">
      <div class="skeleton-grid-item" v-for="i in items" :key="i">
        <div class="skeleton-image"></div>
        <div class="skeleton-content">
          <div class="skeleton-title"></div>
          <div class="skeleton-line" v-for="j in 2" :key="j" :style="{ width: getLineWidth(j) }"></div>
        </div>
      </div>
    </div>

    <!-- Custom Skeleton -->
    <div v-else class="skeleton-custom">
      <slot>
        <div class="skeleton-line" v-for="i in lines" :key="i" :style="{ width: getLineWidth(i) }"></div>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface SkeletonLoaderProps {
  variant?: 'card' | 'list-item' | 'table-row' | 'profile' | 'chart' | 'timeline' | 'grid' | 'custom'
  size?: 'small' | 'medium' | 'large'
  lines?: number
  columns?: number
  items?: number
  avatarSize?: string
  iconSize?: string
  showFooter?: boolean
  isAnimated?: boolean
}

const props = withDefaults(defineProps<SkeletonLoaderProps>(), {
  variant: 'custom',
  size: 'medium',
  lines: 3,
  columns: 4,
  items: 6,
  avatarSize: '40px',
  iconSize: '24px',
  showFooter: false,
  isAnimated: true
})

// Helper functions
const getLineWidth = (index: number) => {
  const widths = ['100%', '85%', '70%', '90%', '75%', '80%']
  return widths[index - 1] || '80%'
}

const getColumnWidth = (index: number) => {
  const widths = ['20%', '30%', '25%', '25%', '15%', '20%', '30%', '35%']
  return widths[index - 1] || '25%'
}

const getBarHeight = (index: number) => {
  const heights = ['60%', '80%', '40%', '90%', '70%']
  return heights[index - 1] || '60%'
}
</script>

<style scoped>
.skeleton-loader {
  position: relative;
  overflow: hidden;
}

.skeleton-loader.is-animated::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.4),
    transparent
  );
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}

/* Base skeleton elements */
.skeleton-line,
.skeleton-title,
.skeleton-subtitle,
.skeleton-avatar,
.skeleton-icon,
.skeleton-button,
.skeleton-stat-value,
.skeleton-stat-label,
.skeleton-image {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  border-radius: 4px;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

/* Card variant */
.skeleton-card {
  background: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.skeleton-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.skeleton-avatar {
  border-radius: 50%;
  flex-shrink: 0;
}

.skeleton-content {
  flex: 1;
}

.skeleton-title {
  height: 1.25rem;
  margin-bottom: 0.5rem;
  width: 70%;
}

.skeleton-subtitle {
  height: 1rem;
  width: 50%;
}

.skeleton-body {
  margin-bottom: 1rem;
}

.skeleton-line {
  height: 0.875rem;
  margin-bottom: 0.5rem;
}

.skeleton-footer {
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
}

.skeleton-button {
  height: 2rem;
  width: 4rem;
  border-radius: 4px;
}

/* List item variant */
.skeleton-list-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid #f0f0f0;
}

.skeleton-icon {
  border-radius: 4px;
  flex-shrink: 0;
}

/* Table row variant */
.skeleton-table-row {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #f0f0f0;
}

.skeleton-cell {
  padding: 0 0.5rem;
}

/* Profile variant */
.skeleton-profile {
  text-align: center;
  padding: 2rem;
}

.skeleton-avatar-large {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin: 0 auto 1rem;
}

.skeleton-name {
  height: 1.5rem;
  width: 60%;
  margin: 0 auto 0.5rem;
}

.skeleton-bio {
  margin: 1rem 0;
}

.skeleton-stats {
  display: flex;
  justify-content: space-around;
  margin-top: 1.5rem;
}

.skeleton-stat {
  text-align: center;
}

.skeleton-stat-value {
  height: 1.25rem;
  width: 3rem;
  margin: 0 auto 0.25rem;
}

.skeleton-stat-label {
  height: 0.875rem;
  width: 2rem;
  margin: 0 auto;
}

/* Chart variant */
.skeleton-chart {
  padding: 1rem;
}

.skeleton-chart-header {
  margin-bottom: 1rem;
}

.skeleton-chart-body {
  display: flex;
  align-items: flex-end;
  gap: 1rem;
  height: 120px;
}

.skeleton-chart-bars {
  display: flex;
  align-items: flex-end;
  gap: 0.5rem;
  flex: 1;
}

.skeleton-bar {
  flex: 1;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  border-radius: 4px 4px 0 0;
  animation: pulse 2s infinite;
}

.skeleton-chart-labels {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 60px;
}

.skeleton-label {
  height: 0.75rem;
  width: 100%;
}

/* Timeline variant */
.skeleton-timeline {
  position: relative;
  padding-left: 2rem;
}

.skeleton-timeline::before {
  content: '';
  position: absolute;
  left: 0.5rem;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #f0f0f0;
}

.skeleton-timeline-item {
  position: relative;
  margin-bottom: 1.5rem;
}

.skeleton-timeline-dot {
  position: absolute;
  left: -1.5rem;
  top: 0.25rem;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #f0f0f0;
}

.skeleton-timeline-content {
  padding-left: 1rem;
}

/* Grid variant */
.skeleton-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

.skeleton-grid-item {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.skeleton-image {
  height: 120px;
  width: 100%;
  border-radius: 0;
}

.skeleton-content {
  padding: 1rem;
}

/* Size variants */
.size-small .skeleton-line,
.size-small .skeleton-title {
  height: 0.75rem;
}

.size-small .skeleton-subtitle {
  height: 0.625rem;
}

.size-large .skeleton-line,
.size-large .skeleton-title {
  height: 1.5rem;
}

.size-large .skeleton-subtitle {
  height: 1.25rem;
}

/* Dark theme support */
@media (prefers-color-scheme: dark) {
  .skeleton-line,
  .skeleton-title,
  .skeleton-subtitle,
  .skeleton-avatar,
  .skeleton-icon,
  .skeleton-button,
  .skeleton-stat-value,
  .skeleton-stat-label,
  .skeleton-image,
  .skeleton-bar {
    background: linear-gradient(90deg, #374151 25%, #4b5563 50%, #374151 75%);
  }

  .skeleton-card,
  .skeleton-grid-item {
    background: #1f2937;
  }

  .skeleton-timeline::before {
    background: #374151;
  }

  .skeleton-timeline-dot {
    background: #374151;
  }
}

/* Responsive design */
@media (max-width: 640px) {
  .skeleton-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }

  .skeleton-stats {
    flex-direction: column;
    gap: 1rem;
  }

  .skeleton-chart-body {
    height: 80px;
  }
}
</style>