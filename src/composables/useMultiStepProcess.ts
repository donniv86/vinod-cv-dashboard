/**
 * Multi-Step Process Composable
 * Manages multi-step processes with progress tracking and state management
 *
 * @author Dr. Vinod Devaraji CV Dashboard
 * @copyright 2024 Dr. Vinod Devaraji
 */

import { ref, computed, watch } from 'vue'

export interface ProcessStep {
  id: string
  title: string
  description?: string
  status: 'pending' | 'active' | 'completed' | 'error' | 'skipped'
  error?: string
  data?: any
  required?: boolean
  canSkip?: boolean
  validation?: () => boolean | Promise<boolean>
  onEnter?: () => void | Promise<void>
  onExit?: () => void | Promise<void>
}

export interface ProcessConfig {
  steps: ProcessStep[]
  allowBackward?: boolean
  allowSkip?: boolean
  autoAdvance?: boolean
  validateOnEnter?: boolean
  showProgress?: boolean
}

export const useMultiStepProcess = (config: ProcessConfig) => {
  const {
    steps: initialSteps,
    allowBackward = true,
    allowSkip = false,
    autoAdvance = false,
    validateOnEnter = true,
    showProgress = true
  } = config

  // Reactive state
  const steps = ref<ProcessStep[]>(initialSteps.map(step => ({
    ...step,
    status: step.status || 'pending'
  })))

  const currentStepIndex = ref(0)
  const isProcessing = ref(false)
  const processData = ref<Record<string, any>>({})
  const errors = ref<string[]>([])

  // Computed properties
  const currentStep = computed(() => steps.value[currentStepIndex.value])
  const totalSteps = computed(() => steps.value.length)
  const completedSteps = computed(() =>
    steps.value.filter(step => step.status === 'completed').length
  )
  const progressPercentage = computed(() =>
    (completedSteps.value / totalSteps.value) * 100
  )

  const canGoNext = computed(() => {
    const step = currentStep.value
    if (!step) return false

    if (step.status === 'error') return false
    if (step.required && step.status !== 'completed') return false

    return currentStepIndex.value < totalSteps.value - 1
  })

  const canGoPrevious = computed(() => {
    return allowBackward && currentStepIndex.value > 0
  })

  const canSkip = computed(() => {
    const step = currentStep.value
    return allowSkip && step?.canSkip && step.status === 'pending'
  })

  const isFirstStep = computed(() => currentStepIndex.value === 0)
  const isLastStep = computed(() => currentStepIndex.value === totalSteps.value - 1)
  const isComplete = computed(() =>
    currentStepIndex.value === totalSteps.value - 1 &&
    currentStep.value?.status === 'completed'
  )

  // Methods
  const validateStep = async (stepIndex: number): Promise<boolean> => {
    const step = steps.value[stepIndex]
    if (!step) return false

    try {
      if (step.validation) {
        const isValid = await step.validation()
        if (!isValid) {
          step.status = 'error'
          step.error = 'Validation failed'
          return false
        }
      }

      step.status = 'completed'
      step.error = undefined
      return true
    } catch (error) {
      step.status = 'error'
      step.error = error instanceof Error ? error.message : 'Unknown error'
      return false
    }
  }

  const enterStep = async (stepIndex: number): Promise<void> => {
    const step = steps.value[stepIndex]
    if (!step) return

    step.status = 'active'

    if (step.onEnter) {
      try {
        await step.onEnter()
      } catch (error) {
        step.status = 'error'
        step.error = error instanceof Error ? error.message : 'Failed to enter step'
      }
    }
  }

  const exitStep = async (stepIndex: number): Promise<void> => {
    const step = steps.value[stepIndex]
    if (!step) return

    if (step.onExit) {
      try {
        await step.onExit()
      } catch (error) {
        console.error('Error exiting step:', error)
      }
    }
  }

  const goToStep = async (stepIndex: number): Promise<boolean> => {
    if (stepIndex < 0 || stepIndex >= totalSteps.value) return false
    if (stepIndex === currentStepIndex.value) return true

    isProcessing.value = true
    errors.value = []

    try {
      // Exit current step
      await exitStep(currentStepIndex.value)

      // Validate current step if moving forward
      if (stepIndex > currentStepIndex.value && validateOnEnter) {
        const isValid = await validateStep(currentStepIndex.value)
        if (!isValid) {
          errors.value.push('Current step validation failed')
          return false
        }
      }

      // Update step index
      currentStepIndex.value = stepIndex

      // Enter new step
      await enterStep(stepIndex)

      return true
    } catch (error) {
      errors.value.push(error instanceof Error ? error.message : 'Unknown error')
      return false
    } finally {
      isProcessing.value = false
    }
  }

  const nextStep = async (): Promise<boolean> => {
    if (!canGoNext.value) return false
    return goToStep(currentStepIndex.value + 1)
  }

  const previousStep = async (): Promise<boolean> => {
    if (!canGoPrevious.value) return false
    return goToStep(currentStepIndex.value - 1)
  }

  const skipStep = async (): Promise<boolean> => {
    if (!canSkip.value) return false

    const step = currentStep.value
    if (!step) return false

    step.status = 'skipped'

    if (autoAdvance) {
      return nextStep()
    }

    return true
  }

  const completeStep = async (data?: any): Promise<boolean> => {
    const step = currentStep.value
    if (!step) return false

    isProcessing.value = true
    errors.value = []

    try {
      // Store step data
      if (data) {
        step.data = data
        processData.value[step.id] = data
      }

      // Validate step
      const isValid = await validateStep(currentStepIndex.value)
      if (!isValid) {
        errors.value.push(step.error || 'Step validation failed')
        return false
      }

      // Auto-advance if enabled
      if (autoAdvance && canGoNext.value) {
        return nextStep()
      }

      return true
    } catch (error) {
      errors.value.push(error instanceof Error ? error.message : 'Unknown error')
      return false
    } finally {
      isProcessing.value = false
    }
  }

  const resetProcess = (): void => {
    steps.value.forEach(step => {
      step.status = 'pending'
      step.error = undefined
      step.data = undefined
    })
    currentStepIndex.value = 0
    processData.value = {}
    errors.value = []
    isProcessing.value = false
  }

  const getStepData = (stepId: string): any => {
    return processData.value[stepId]
  }

  const setStepData = (stepId: string, data: any): void => {
    processData.value[stepId] = data
    const step = steps.value.find(s => s.id === stepId)
    if (step) {
      step.data = data
    }
  }

  const getAllData = (): Record<string, any> => {
    return { ...processData.value }
  }

  const hasErrors = computed(() => errors.value.length > 0 ||
    steps.value.some(step => step.status === 'error')
  )

  const getStepStatus = (stepIndex: number): ProcessStep['status'] => {
    const step = steps.value[stepIndex]
    return step?.status || 'pending'
  }

  const getStepError = (stepIndex: number): string | undefined => {
    const step = steps.value[stepIndex]
    return step?.error
  }

  // Watch for step changes
  watch(currentStepIndex, async (newIndex, oldIndex) => {
    if (oldIndex >= 0 && oldIndex < steps.value.length) {
      const oldStep = steps.value[oldIndex]
      if (oldStep.status === 'active') {
        oldStep.status = 'pending'
      }
    }
  })

  // Initialize first step
  if (steps.value.length > 0) {
    enterStep(0)
  }

  return {
    // State
    steps: computed(() => steps.value),
    currentStep: computed(() => currentStep.value),
    currentStepIndex: computed(() => currentStepIndex.value),
    isProcessing: computed(() => isProcessing.value),
    processData: computed(() => processData.value),
    errors: computed(() => errors.value),

    // Computed
    totalSteps: computed(() => totalSteps.value),
    completedSteps: computed(() => completedSteps.value),
    progressPercentage: computed(() => progressPercentage.value),
    canGoNext: computed(() => canGoNext.value),
    canGoPrevious: computed(() => canGoPrevious.value),
    canSkip: computed(() => canSkip.value),
    isFirstStep: computed(() => isFirstStep.value),
    isLastStep: computed(() => isLastStep.value),
    isComplete: computed(() => isComplete.value),
    hasErrors: computed(() => hasErrors.value),

    // Methods
    goToStep,
    nextStep,
    previousStep,
    skipStep,
    completeStep,
    resetProcess,
    getStepData,
    setStepData,
    getAllData,
    getStepStatus,
    getStepError,
    validateStep,
    enterStep,
    exitStep
  }
}