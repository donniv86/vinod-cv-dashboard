<template>
  <div class="progress-demo">
    <div class="container mx-auto px-4 py-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-4">Progress Indicators Demo</h1>
        <p class="text-gray-600">Showcasing various progress indicators and multi-step processes</p>
      </div>

      <!-- Progress Bar Examples -->
      <section class="mb-12">
        <h2 class="text-2xl font-semibold text-gray-800 mb-6">Progress Bars</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-lg font-medium text-gray-700 mb-4">Basic Progress Bar</h3>
            <ProgressIndicator
              variant="bar"
              :percentage="basicProgress"
              label="Upload Progress"
              :show-value="true"
              :current-value="basicProgress"
              :total-value="100"
            />
            <div class="mt-4 flex gap-2">
              <button @click="basicProgress = Math.max(0, basicProgress - 10)" class="btn btn-sm">
                -10%
              </button>
              <button @click="basicProgress = Math.min(100, basicProgress + 10)" class="btn btn-sm">
                +10%
              </button>
              <button @click="basicProgress = 0" class="btn btn-sm btn-outline">
                Reset
              </button>
            </div>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-lg font-medium text-gray-700 mb-4">Animated Progress Bar</h3>
            <ProgressIndicator
              variant="bar"
              :percentage="animatedProgress"
              label="Processing Data"
              :is-animated="true"
              size="large"
            />
            <div class="mt-4">
              <button @click="startAnimatedProgress" class="btn btn-primary" :disabled="isAnimating">
                {{ isAnimating ? 'Processing...' : 'Start Processing' }}
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Circular Progress Examples -->
      <section class="mb-12">
        <h2 class="text-2xl font-semibold text-gray-800 mb-6">Circular Progress</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 class="text-lg font-medium text-gray-700 mb-4">Small Circular</h3>
            <div class="flex justify-center">
              <ProgressIndicator
                variant="circular"
                :percentage="circularProgress1"
                size="small"
              />
            </div>
            <div class="mt-4">
              <input
                type="range"
                v-model="circularProgress1"
                min="0"
                max="100"
                class="w-full"
              />
            </div>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 class="text-lg font-medium text-gray-700 mb-4">Medium Circular</h3>
            <div class="flex justify-center">
              <ProgressIndicator
                variant="circular"
                :percentage="circularProgress2"
                label="Download"
                :show-value="true"
                :current-value="circularProgress2"
                :total-value="100"
              />
            </div>
            <div class="mt-4">
              <input
                type="range"
                v-model="circularProgress2"
                min="0"
                max="100"
                class="w-full"
              />
            </div>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 class="text-lg font-medium text-gray-700 mb-4">Large Circular</h3>
            <div class="flex justify-center">
              <ProgressIndicator
                variant="circular"
                :percentage="circularProgress3"
                label="System Load"
                size="large"
              />
            </div>
            <div class="mt-4">
              <input
                type="range"
                v-model="circularProgress3"
                min="0"
                max="100"
                class="w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- Multi-Step Process -->
      <section class="mb-12">
        <h2 class="text-2xl font-semibold text-gray-800 mb-6">Multi-Step Process</h2>
        <div class="bg-white p-6 rounded-lg shadow-md">
          <div class="mb-6">
            <ProgressIndicator
              variant="steps"
              :steps="processSteps"
              :current-step="currentStepIndex"
              :status-message="statusMessage"
              :status-type="statusType"
            />
          </div>

          <div class="border-t pt-6">
            <div v-if="currentStep" class="mb-6">
              <h3 class="text-lg font-medium text-gray-700 mb-2">{{ currentStep.title }}</h3>
              <p v-if="currentStep.description" class="text-gray-600 mb-4">
                {{ currentStep.description }}
              </p>

              <!-- Step-specific content -->
              <div v-if="currentStepIndex === 0" class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    v-model="formData.name"
                    type="text"
                    class="form-input w-full"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    v-model="formData.email"
                    type="email"
                    class="form-input w-full"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div v-else-if="currentStepIndex === 1" class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Department</label>
                  <select v-model="formData.department" class="form-select w-full">
                    <option value="">Select department</option>
                    <option value="engineering">Engineering</option>
                    <option value="design">Design</option>
                    <option value="marketing">Marketing</option>
                    <option value="sales">Sales</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Role</label>
                  <input
                    v-model="formData.role"
                    type="text"
                    class="form-input w-full"
                    placeholder="Enter your role"
                  />
                </div>
              </div>

              <div v-else-if="currentStepIndex === 2" class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Skills</label>
                  <div class="space-y-2">
                    <label class="flex items-center">
                      <input type="checkbox" v-model="formData.skills" value="javascript" class="form-checkbox">
                      <span class="ml-2">JavaScript</span>
                    </label>
                    <label class="flex items-center">
                      <input type="checkbox" v-model="formData.skills" value="vue" class="form-checkbox">
                      <span class="ml-2">Vue.js</span>
                    </label>
                    <label class="flex items-center">
                      <input type="checkbox" v-model="formData.skills" value="typescript" class="form-checkbox">
                      <span class="ml-2">TypeScript</span>
                    </label>
                    <label class="flex items-center">
                      <input type="checkbox" v-model="formData.skills" value="nodejs" class="form-checkbox">
                      <span class="ml-2">Node.js</span>
                    </label>
                  </div>
                </div>
              </div>

              <div v-else-if="currentStepIndex === 3" class="space-y-4">
                <div class="bg-gray-50 p-4 rounded-lg">
                  <h4 class="font-medium text-gray-700 mb-2">Review Your Information</h4>
                  <div class="space-y-2 text-sm">
                    <div><strong>Name:</strong> {{ formData.name }}</div>
                    <div><strong>Email:</strong> {{ formData.email }}</div>
                    <div><strong>Department:</strong> {{ formData.department }}</div>
                    <div><strong>Role:</strong> {{ formData.role }}</div>
                    <div><strong>Skills:</strong> {{ formData.skills.join(', ') }}</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="flex justify-between">
              <button
                @click="previousStep"
                :disabled="!canGoPrevious"
                class="btn btn-outline"
              >
                Previous
              </button>

              <div class="flex gap-2">
                <button
                  v-if="canSkip"
                  @click="skipStep"
                  class="btn btn-outline"
                >
                  Skip
                </button>
                <button
                  v-if="!isLastStep"
                  @click="nextStep"
                  :disabled="!canGoNext"
                  class="btn btn-primary"
                >
                  Next
                </button>
                <button
                  v-else
                  @click="completeProcess"
                  :disabled="!canComplete"
                  class="btn btn-success"
                >
                  Complete
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Loading Spinners -->
      <section class="mb-12">
        <h2 class="text-2xl font-semibold text-gray-800 mb-6">Loading Spinners</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 class="text-lg font-medium text-gray-700 mb-4">Small Spinner</h3>
            <ProgressIndicator
              variant="spinner"
              label="Loading..."
              size="small"
              :is-animated="true"
            />
          </div>

          <div class="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 class="text-lg font-medium text-gray-700 mb-4">Medium Spinner</h3>
            <ProgressIndicator
              variant="spinner"
              label="Processing..."
              :is-animated="true"
            />
          </div>

          <div class="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 class="text-lg font-medium text-gray-700 mb-4">Large Spinner</h3>
            <ProgressIndicator
              variant="spinner"
              label="Initializing..."
              size="large"
              :is-animated="true"
            />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import ProgressIndicator from '../components/ui/ProgressIndicator.vue'
import { useMultiStepProcess, type ProcessStep } from '../composables/useMultiStepProcess'

// Progress bar states
const basicProgress = ref(25)
const animatedProgress = ref(0)
const isAnimating = ref(false)

// Circular progress states
const circularProgress1 = ref(30)
const circularProgress2 = ref(65)
const circularProgress3 = ref(85)

// Form data
const formData = ref({
  name: '',
  email: '',
  department: '',
  role: '',
  skills: [] as string[]
})

// Multi-step process
const processSteps = ref<ProcessStep[]>([
  {
    id: 'personal',
    title: 'Personal Information',
    description: 'Enter your basic personal details',
    status: 'active',
    required: true,
    validation: () => {
      return formData.value.name.trim() !== '' && formData.value.email.trim() !== ''
    }
  },
  {
    id: 'professional',
    title: 'Professional Details',
    description: 'Provide your work information',
    status: 'pending',
    required: true,
    validation: () => {
      return formData.value.department !== '' && formData.value.role.trim() !== ''
    }
  },
  {
    id: 'skills',
    title: 'Skills & Expertise',
    description: 'Select your technical skills',
    status: 'pending',
    required: false,
    canSkip: true,
    validation: () => {
      return true // Optional step
    }
  },
  {
    id: 'review',
    title: 'Review & Submit',
    description: 'Review your information before submitting',
    status: 'pending',
    required: true,
    validation: () => {
      return Boolean(formData.value.name && formData.value.email && formData.value.department)
    }
  }
])

const {
  currentStep,
  currentStepIndex,
  canGoNext,
  canGoPrevious,
  canSkip,
  isLastStep,
  nextStep,
  previousStep,
  skipStep,
  completeStep,
  resetProcess
} = useMultiStepProcess({
  steps: processSteps.value,
  allowBackward: true,
  allowSkip: true,
  autoAdvance: false,
  validateOnEnter: true
})

// Status message
const statusMessage = ref('')
const statusType = ref<'info' | 'success' | 'warning' | 'error'>('info')

// Computed
const canComplete = computed(() => {
  return isLastStep.value && formData.value.name && formData.value.email && formData.value.department
})

// Methods
const startAnimatedProgress = async () => {
  isAnimating.value = true
  animatedProgress.value = 0

  for (let i = 0; i <= 100; i += 2) {
    animatedProgress.value = i
    await new Promise(resolve => setTimeout(resolve, 50))
  }

  isAnimating.value = false
}

const completeProcess = async () => {
  statusMessage.value = 'Processing your submission...'
  statusType.value = 'info'

  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 2000))

  statusMessage.value = 'Successfully submitted! Your information has been saved.'
  statusType.value = 'success'

  // Reset after 3 seconds
  setTimeout(() => {
    resetProcess()
    formData.value = {
      name: '',
      email: '',
      department: '',
      role: '',
      skills: []
    }
    statusMessage.value = ''
  }, 3000)
}

// Lifecycle
onMounted(() => {
  // Initialize with some demo data
  formData.value = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    department: 'engineering',
    role: 'Senior Developer',
    skills: ['javascript', 'vue']
  }
})
</script>

<style scoped>
.progress-demo {
  min-height: 100vh;
  background: #f9fafb;
}

.btn {
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-sm {
  padding: 0.25rem 0.75rem;
  font-size: 0.875rem;
}

.btn-primary {
  background-color: #2563eb;
  color: white;
}

.btn-primary:hover {
  background-color: #1d4ed8;
}

.btn-outline {
  border: 1px solid #d1d5db;
  color: #374151;
}

.btn-outline:hover {
  background-color: #f9fafb;
}

.btn-success {
  background-color: #059669;
  color: white;
}

.btn-success:hover {
  background-color: #047857;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.form-input, .form-select {
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  padding: 0.5rem 0.75rem;
}

.form-input:focus, .form-select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-checkbox {
  border-radius: 0.25rem;
  border: 1px solid #d1d5db;
  color: #2563eb;
}

.form-checkbox:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}
</style>