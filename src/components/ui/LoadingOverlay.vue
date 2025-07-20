<template>
  <Transition name="loading-fade" appear>
    <div v-if="isVisible" class="loading-overlay">
      <div class="loading-content">
        <!-- Progress Bar -->
        <div class="progress-container">
          <div class="progress-bar">
            <div
              class="progress-fill"
              :style="{ width: `${progress}%` }"
            ></div>
          </div>
          <div class="progress-text">{{ progress }}%</div>
        </div>

        <!-- Loading Message -->
        <div class="loading-message">
          <div class="loading-spinner">
            <svg class="spinner" viewBox="0 0 50 50">
              <circle
                class="spinner-path"
                cx="25"
                cy="25"
                r="20"
                fill="none"
                stroke-width="4"
              ></circle>
            </svg>
          </div>
          <p class="message-text">{{ message }}</p>
        </div>

        <!-- Error State -->
        <div v-if="error" class="error-state">
          <div class="error-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <p class="error-message">{{ error }}</p>
          <button @click="retry" class="retry-btn">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
            Retry
          </button>
        </div>

        <!-- Cancel Button -->
        <button
          v-if="showCancel && !error"
          @click="cancel"
          class="cancel-btn"
        >
          Cancel
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface LoadingOverlayProps {
  isLoading: boolean
  progress?: number
  message?: string
  error?: string
  showCancel?: boolean
}

const props = withDefaults(defineProps<LoadingOverlayProps>(), {
  progress: 0,
  message: 'Loading...',
  showCancel: false
})

const emit = defineEmits<{
  'retry': []
  'cancel': []
}>()

const isVisible = computed(() => props.isLoading || !!props.error)

const retry = () => {
  emit('retry')
}

const cancel = () => {
  emit('cancel')
}
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.loading-content {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  max-width: 400px;
  width: 90%;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.progress-container {
  margin-bottom: 1.5rem;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6);
  border-radius: 4px;
  transition: width 0.3s ease;
}

.progress-text {
  font-size: 0.875rem;
  color: #6b7280;
  font-weight: 500;
}

.loading-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.loading-spinner {
  width: 3rem;
  height: 3rem;
}

.spinner {
  width: 100%;
  height: 100%;
  animation: spin 1s linear infinite;
}

.spinner-path {
  stroke: #3b82f6;
  stroke-linecap: round;
  stroke-dasharray: 126;
  stroke-dashoffset: 126;
  animation: dash 1.5s ease-in-out infinite;
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dashoffset: 126;
  }
  50% {
    stroke-dashoffset: 32;
  }
  100% {
    stroke-dashoffset: 126;
  }
}

.message-text {
  font-size: 1rem;
  color: #374151;
  font-weight: 500;
  margin: 0;
}

.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.error-icon {
  width: 3rem;
  height: 3rem;
  color: #ef4444;
}

.error-message {
  font-size: 1rem;
  color: #374151;
  margin: 0;
  line-height: 1.5;
}

.retry-btn {
  display: flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.retry-btn:hover {
  background: #2563eb;
  transform: translateY(-1px);
}

.cancel-btn {
  padding: 0.75rem 1.5rem;
  background: #f3f4f6;
  color: #374151;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.cancel-btn:hover {
  background: #e5e7eb;
  border-color: #9ca3af;
}

/* Transition animations */
.loading-fade-enter-active,
.loading-fade-leave-active {
  transition: opacity 0.3s ease;
}

.loading-fade-enter-from,
.loading-fade-leave-to {
  opacity: 0;
}

/* Responsive design */
@media (max-width: 640px) {
  .loading-content {
    padding: 1.5rem;
    margin: 1rem;
  }

  .loading-spinner {
    width: 2.5rem;
    height: 2.5rem;
  }

  .error-icon {
    width: 2.5rem;
    height: 2.5rem;
  }
}
</style>