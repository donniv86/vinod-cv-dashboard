<template>
  <div
    v-if="showInstallPrompt"
    class="pwa-install-prompt"
    :class="{ 'pwa-install-prompt-visible': showInstallPrompt }"
  >
    <div class="pwa-install-content">
      <div class="pwa-install-info">
        <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
        </svg>
        <div>
          <h3 class="pwa-install-title">Install App</h3>
          <p class="pwa-install-description">Add this app to your home screen for quick access</p>
        </div>
      </div>
      <div class="pwa-install-actions">
        <button
          @click="installApp"
          class="pwa-install-button"
          :disabled="installing"
        >
          <span v-if="!installing">Install</span>
          <span v-else>Installing...</span>
        </button>
        <button
          @click="dismissPrompt"
          class="pwa-dismiss-button"
        >
          Not now
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const showInstallPrompt = ref(false)
const installing = ref(false)
let deferredPrompt: any = null

const installApp = async () => {
  if (!deferredPrompt) return

  installing.value = true

  try {
    // Show the install prompt
    deferredPrompt.prompt()

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === 'accepted') {
      console.log('[PWA] User accepted the install prompt')
    } else {
      console.log('[PWA] User dismissed the install prompt')
    }
  } catch (error) {
    console.error('[PWA] Install failed:', error)
  } finally {
    installing.value = false
    deferredPrompt = null
    showInstallPrompt.value = false
  }
}

const dismissPrompt = () => {
  showInstallPrompt.value = false
  deferredPrompt = null

  // Store dismissal in localStorage to avoid showing again immediately
  localStorage.setItem('pwa-install-dismissed', Date.now().toString())
}

const handleBeforeInstallPrompt = (event: Event) => {
  // Prevent the mini-infobar from appearing on mobile
  event.preventDefault()

  // Store the event so it can be triggered later
  deferredPrompt = event

  // Check if we should show the prompt (not dismissed recently)
  const dismissedTime = localStorage.getItem('pwa-install-dismissed')
  const shouldShow = !dismissedTime ||
    (Date.now() - parseInt(dismissedTime)) > (7 * 24 * 60 * 60 * 1000) // 7 days

  if (shouldShow) {
    showInstallPrompt.value = true
  }
}

const handleAppInstalled = () => {
  console.log('[PWA] App was installed')
  showInstallPrompt.value = false
  deferredPrompt = null
}

onMounted(() => {
  window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
  window.addEventListener('appinstalled', handleAppInstalled)
})

onUnmounted(() => {
  window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
  window.removeEventListener('appinstalled', handleAppInstalled)
})
</script>

<style scoped>
.pwa-install-prompt {
  position: fixed;
  bottom: 20px;
  left: 20px;
  right: 20px;
  background: #1f2937;
  color: white;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  z-index: 9997;
  transform: translateY(100%);
  transition: transform 0.3s ease-in-out;
  border: 1px solid #374151;
}

.pwa-install-prompt-visible {
  transform: translateY(0);
}

.pwa-install-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.pwa-install-info {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.pwa-install-title {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
}

.pwa-install-description {
  font-size: 14px;
  color: #9ca3af;
  margin: 4px 0 0 0;
}

.pwa-install-actions {
  display: flex;
  gap: 8px;
  flex-shrink: 0;
}

.pwa-install-button {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.2s;
}

.pwa-install-button:hover:not(:disabled) {
  background: #2563eb;
}

.pwa-install-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.pwa-dismiss-button {
  background: transparent;
  color: #9ca3af;
  border: 1px solid #4b5563;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.pwa-dismiss-button:hover {
  background: #374151;
  color: white;
}

@media (max-width: 640px) {
  .pwa-install-prompt {
    left: 12px;
    right: 12px;
    bottom: 12px;
  }

  .pwa-install-content {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }

  .pwa-install-actions {
    justify-content: stretch;
  }

  .pwa-install-button,
  .pwa-dismiss-button {
    flex: 1;
  }
}
</style>