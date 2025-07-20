<template>
  <div
    v-if="!isOnline"
    class="offline-indicator"
    :class="{ 'offline-indicator-visible': !isOnline }"
  >
    <div class="offline-content">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z"/>
      </svg>
      <span>You're offline. Some features may be limited.</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isOnline = ref(navigator.onLine)

const updateOnlineStatus = () => {
  isOnline.value = navigator.onLine
  console.log(`[OfflineIndicator] Connection status: ${isOnline.value ? 'online' : 'offline'}`)
}

onMounted(() => {
  window.addEventListener('online', updateOnlineStatus)
  window.addEventListener('offline', updateOnlineStatus)
})

onUnmounted(() => {
  window.removeEventListener('online', updateOnlineStatus)
  window.removeEventListener('offline', updateOnlineStatus)
})
</script>

<style scoped>
.offline-indicator {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: #dc2626;
  color: white;
  padding: 8px 16px;
  text-align: center;
  z-index: 9998;
  transform: translateY(-100%);
  transition: transform 0.3s ease-in-out;
}

.offline-indicator-visible {
  transform: translateY(0);
}

.offline-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 500;
}

.offline-content svg {
  flex-shrink: 0;
}
</style>