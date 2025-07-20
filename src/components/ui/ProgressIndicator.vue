<template>
  <div class="progress-indicator" :class="[`variant-${variant}`, `size-${size}`, { 'is-vertical': isVertical }]">
    <!-- Progress Bar -->
    <div v-if="variant === 'bar'" class="progress-bar-container">
      <div class="progress-bar">
        <div
          class="progress-fill"
          :style="{ width: `${percentage}%` }"
          :class="{ 'is-animated': isAnimated }"
        ></div>
      </div>
      <div v-if="showLabel" class="progress-label">
        <span class="progress-text">{{ label || `${Math.round(percentage)}%` }}</span>
        <span v-if="showValue" class="progress-value">{{ currentValue }}/{{ totalValue }}</span>
      </div>
    </div>

    <!-- Step Progress -->
    <div v-else-if="variant === 'steps'" class="steps-container">
      <div
        v-for="(step, index) in steps"
        :key="index"
        class="step-item"
        :class="{
          'is-completed': index < currentStep,
          'is-current': index === currentStep,
          'is-pending': index > currentStep,
          'is-error': step.error
        }"
      >
        <!-- Step Circle -->
        <div class="step-circle">
          <div v-if="index < currentStep" class="step-icon">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <div v-else-if="step.error" class="step-icon error">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </div>
          <span v-else class="step-number">{{ index + 1 }}</span>
        </div>

        <!-- Step Content -->
        <div class="step-content">
          <div class="step-title">{{ step.title }}</div>
          <div v-if="step.description" class="step-description">{{ step.description }}</div>
          <div v-if="step.error" class="step-error">{{ step.error }}</div>
        </div>

        <!-- Step Connector -->
        <div
          v-if="index < steps.length - 1"
          class="step-connector"
          :class="{ 'is-completed': index < currentStep }"
        ></div>
      </div>
    </div>

    <!-- Circular Progress -->
    <div v-else-if="variant === 'circular'" class="circular-container">
      <svg class="circular-progress" viewBox="0 0 120 120">
        <!-- Background circle -->
        <circle
          class="circular-bg"
          cx="60"
          cy="60"
          r="54"
          stroke-width="8"
        />
        <!-- Progress circle -->
        <circle
          class="circular-fill"
          :class="{ 'is-animated': isAnimated }"
          cx="60"
          cy="60"
          r="54"
          stroke-width="8"
          :stroke-dasharray="circumference"
          :stroke-dashoffset="strokeDashoffset"
          transform="rotate(-90 60 60)"
        />
      </svg>
      <div class="circular-content">
        <div v-if="showLabel" class="circular-label">{{ label || `${Math.round(percentage)}%` }}</div>
        <div v-if="showValue" class="circular-value">{{ currentValue }}/{{ totalValue }}</div>
      </div>
    </div>

    <!-- Loading Spinner -->
    <div v-else-if="variant === 'spinner'" class="spinner-container">
      <div class="spinner" :class="{ 'is-animated': isAnimated }">
        <div class="spinner-ring"></div>
        <div class="spinner-ring"></div>
        <div class="spinner-ring"></div>
      </div>
      <div v-if="showLabel" class="spinner-label">{{ label || 'Loading...' }}</div>
    </div>

    <!-- Status Messages -->
    <div v-if="statusMessage" class="status-message" :class="`status-${statusType}`">
      {{ statusMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'

interface Step {
  title: string
  description?: string
  error?: string
  completed?: boolean
}

interface ProgressIndicatorProps {
  variant?: 'bar' | 'steps' | 'circular' | 'spinner'
  percentage?: number
  currentValue?: number
  totalValue?: number
  currentStep?: number
  steps?: Step[]
  label?: string
  showLabel?: boolean
  showValue?: boolean
  isAnimated?: boolean
  isVertical?: boolean
  size?: 'small' | 'medium' | 'large'
  statusMessage?: string
  statusType?: 'info' | 'success' | 'warning' | 'error'
}

const props = withDefaults(defineProps<ProgressIndicatorProps>(), {
  variant: 'bar',
  percentage: 0,
  currentValue: 0,
  totalValue: 100,
  currentStep: 0,
  steps: () => [],
  label: '',
  showLabel: true,
  showValue: false,
  isAnimated: true,
  isVertical: false,
  size: 'medium',
  statusMessage: '',
  statusType: 'info'
})

const emit = defineEmits<{
  'step-complete': [stepIndex: number]
  'step-error': [stepIndex: number, error: string]
  'progress-complete': []
}>()

// Computed properties
const circumference = computed(() => 2 * Math.PI * 54)
const strokeDashoffset = computed(() => {
  const progress = Math.min(100, Math.max(0, props.percentage))
  return circumference.value - (progress / 100) * circumference.value
})

// Watch for step completion
watch(() => props.currentStep, (newStep, oldStep) => {
  if (newStep > oldStep && oldStep < props.steps.length) {
    emit('step-complete', oldStep)
  }

  if (newStep >= props.steps.length && props.steps.length > 0) {
    emit('progress-complete')
  }
})

// Watch for percentage completion
watch(() => props.percentage, (newPercentage) => {
  if (newPercentage >= 100) {
    emit('progress-complete')
  }
})

// Expose methods
defineExpose({
  getCurrentStep: () => props.currentStep,
  getPercentage: () => props.percentage,
  getSteps: () => props.steps
})
</script>

<style scoped>
.progress-indicator {
  width: 100%;
  font-family: inherit;
}

/* Progress Bar Variant */
.progress-bar-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6);
  border-radius: 4px;
  transition: width 0.3s ease;
  position: relative;
}

.progress-fill.is-animated {
  background: linear-gradient(90deg, #3b82f6, #8b5cf6, #3b82f6);
  background-size: 200% 100%;
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.progress-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
  color: #6b7280;
}

.progress-text {
  font-weight: 500;
  color: #374151;
}

.progress-value {
  font-size: 0.75rem;
  color: #9ca3af;
}

/* Steps Variant */
.steps-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.step-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  position: relative;
}

.step-circle {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.875rem;
  flex-shrink: 0;
  border: 2px solid #e5e7eb;
  background: white;
  color: #9ca3af;
  transition: all 0.3s ease;
}

.step-item.is-completed .step-circle {
  background: #10b981;
  border-color: #10b981;
  color: white;
}

.step-item.is-current .step-circle {
  background: #3b82f6;
  border-color: #3b82f6;
  color: white;
}

.step-item.is-error .step-circle {
  background: #ef4444;
  border-color: #ef4444;
  color: white;
}

.step-icon {
  width: 1rem;
  height: 1rem;
}

.step-icon svg {
  width: 100%;
  height: 100%;
}

.step-icon.error {
  color: white;
}

.step-content {
  flex: 1;
  min-width: 0;
}

.step-title {
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.25rem;
}

.step-description {
  font-size: 0.875rem;
  color: #6b7280;
  line-height: 1.4;
}

.step-error {
  font-size: 0.875rem;
  color: #ef4444;
  margin-top: 0.25rem;
}

.step-connector {
  position: absolute;
  left: 1rem;
  top: 2.5rem;
  width: 2px;
  height: 1rem;
  background: #e5e7eb;
  transition: background-color 0.3s ease;
}

.step-connector.is-completed {
  background: #10b981;
}

/* Circular Progress Variant */
.circular-container {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.circular-progress {
  width: 120px;
  height: 120px;
  transform: rotate(-90deg);
}

.circular-bg {
  fill: none;
  stroke: #e5e7eb;
}

.circular-fill {
  fill: none;
  stroke: #3b82f6;
  stroke-linecap: round;
  transition: stroke-dashoffset 0.3s ease;
}

.circular-fill.is-animated {
  stroke: url(#gradient);
}

.circular-content {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.circular-label {
  font-weight: 600;
  color: #374151;
  font-size: 1.125rem;
}

.circular-value {
  font-size: 0.875rem;
  color: #6b7280;
  margin-top: 0.25rem;
}

/* Spinner Variant */
.spinner-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.spinner {
  position: relative;
  width: 40px;
  height: 40px;
}

.spinner-ring {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 3px solid transparent;
  border-top: 3px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.spinner-ring:nth-child(2) {
  border-top-color: #8b5cf6;
  animation-delay: -0.3s;
}

.spinner-ring:nth-child(3) {
  border-top-color: #10b981;
  animation-delay: -0.6s;
}

.spinner.is-animated .spinner-ring {
  animation-play-state: running;
}

.spinner:not(.is-animated) .spinner-ring {
  animation-play-state: paused;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.spinner-label {
  font-size: 0.875rem;
  color: #6b7280;
  text-align: center;
}

/* Status Messages */
.status-message {
  margin-top: 0.75rem;
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
}

.status-info {
  background: #eff6ff;
  color: #1e40af;
  border: 1px solid #bfdbfe;
}

.status-success {
  background: #f0fdf4;
  color: #166534;
  border: 1px solid #bbf7d0;
}

.status-warning {
  background: #fffbeb;
  color: #92400e;
  border: 1px solid #fde68a;
}

.status-error {
  background: #fef2f2;
  color: #991b1b;
  border: 1px solid #fecaca;
}

/* Size Variants */
.size-small .progress-bar {
  height: 4px;
}

.size-small .step-circle {
  width: 1.5rem;
  height: 1.5rem;
  font-size: 0.75rem;
}

.size-small .circular-progress {
  width: 80px;
  height: 80px;
}

.size-small .spinner {
  width: 24px;
  height: 24px;
}

.size-large .progress-bar {
  height: 12px;
}

.size-large .step-circle {
  width: 2.5rem;
  height: 2.5rem;
  font-size: 1rem;
}

.size-large .circular-progress {
  width: 160px;
  height: 160px;
}

.size-large .spinner {
  width: 56px;
  height: 56px;
}

/* Vertical Layout */
.progress-indicator.is-vertical .steps-container {
  flex-direction: row;
  align-items: stretch;
}

.progress-indicator.is-vertical .step-item {
  flex-direction: column;
  align-items: center;
  text-align: center;
  flex: 1;
}

.progress-indicator.is-vertical .step-connector {
  position: relative;
  left: auto;
  top: auto;
  width: 100%;
  height: 2px;
  margin-top: 0.5rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .progress-indicator.is-vertical .steps-container {
    flex-direction: column;
  }

  .progress-indicator.is-vertical .step-item {
    flex-direction: row;
    text-align: left;
  }

  .progress-indicator.is-vertical .step-connector {
    width: 2px;
    height: 1rem;
    margin-top: 0;
    position: absolute;
    left: 1rem;
    top: 2.5rem;
  }

  .circular-progress {
    width: 100px;
    height: 100px;
  }

  .size-large .circular-progress {
    width: 120px;
    height: 120px;
  }
}

/* High Contrast Mode */
@media (prefers-contrast: high) {
  .progress-fill {
    background: #000;
  }

  .step-item.is-completed .step-circle {
    background: #000;
    border-color: #000;
  }

  .step-item.is-current .step-circle {
    background: #000;
    border-color: #000;
  }

  .circular-fill {
    stroke: #000;
  }

  .spinner-ring {
    border-top-color: #000;
  }
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .progress-fill,
  .circular-fill,
  .step-circle,
  .step-connector {
    transition: none;
  }

  .progress-fill.is-animated,
  .spinner.is-animated .spinner-ring {
    animation: none;
  }
}
</style>