<template>
  <ThemeProvider>
    <SidebarProvider>
      <PageTransition>
        <RouterView />
      </PageTransition>
      <LoadingOverlay
        :is-loading="loadingState.isLoading"
        :progress="loadingState.progress"
        :message="loadingState.message"
        :error="loadingState.error"
        :show-cancel="false"
        @retry="handleRetry"
        @cancel="handleCancel"
      />
      <BackToTop
        :threshold="400"
        :show-progress="true"
        :show-tooltip="true"
        :smooth="true"
        :duration="1000"
        position="bottom-right"
        size="medium"
        theme="auto"
        @scroll-start="handleScrollStart"
        @scroll-end="handleScrollEnd"
      />
      <OfflineIndicator />
      <PWAInstallPrompt />
    </SidebarProvider>
  </ThemeProvider>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import ThemeProvider from './components/layout/ThemeProvider.vue'
import SidebarProvider from './components/layout/SidebarProvider.vue'
import PageTransition from './components/ui/PageTransition.vue'
import LoadingOverlay from './components/ui/LoadingOverlay.vue'
import BackToTop from './components/ui/BackToTop.vue'
import OfflineIndicator from './components/ui/OfflineIndicator.vue'
import PWAInstallPrompt from './components/ui/PWAInstallPrompt.vue'
import { usePageTransitions } from './composables/usePageTransitions'

// Initialize page transitions
const {
  loadingState,
  simulateLoading
} = usePageTransitions()

// Handle retry and cancel events
const handleRetry = () => {
  // Implement retry logic here
  console.log('Retry requested')
}

const handleCancel = () => {
  // Implement cancel logic here
  console.log('Cancel requested')
}

// Handle scroll events
const handleScrollStart = () => {
  console.log('Back to top scroll started')
}

const handleScrollEnd = () => {
  console.log('Back to top scroll completed')
}

// Simulate initial loading on app start
onMounted(() => {
  simulateLoading(1500, 15)
})
</script>
