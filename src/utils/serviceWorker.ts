/**
 * Service Worker Registration Utility
 * Handles service worker registration, updates, and communication
 *
 * @author Dr. Vinod Devaraji CV Dashboard
 * @copyright 2024 Dr. Vinod Devaraji
 */

interface ServiceWorkerMessage {
  type: string
  data?: any
}

class ServiceWorkerManager {
  private registration: ServiceWorkerRegistration | null = null
  private updateAvailable = false

  /**
   * Register the service worker
   */
  async register(): Promise<ServiceWorkerRegistration | null> {
    if (!('serviceWorker' in navigator)) {
      console.warn('[SW] Service Worker not supported')
      return null
    }

    try {
      this.registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      })

      console.log('[SW] Service Worker registered successfully:', this.registration)

      // Handle service worker updates
      this.setupUpdateHandling()

      // Handle service worker messages
      this.setupMessageHandling()

      return this.registration
    } catch (error) {
      console.error('[SW] Service Worker registration failed:', error)
      return null
    }
  }

  /**
   * Setup update handling
   */
  private setupUpdateHandling() {
    if (!this.registration) return

    // Check for updates
    this.registration.addEventListener('updatefound', () => {
      console.log('[SW] Update found')
      const newWorker = this.registration!.installing

      if (newWorker) {
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            this.updateAvailable = true
            this.showUpdateNotification()
          }
        })
      }
    })

    // Handle controller change
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      console.log('[SW] Controller changed')
      this.updateAvailable = false
      window.location.reload()
    })
  }

  /**
   * Setup message handling
   */
  private setupMessageHandling() {
    navigator.serviceWorker.addEventListener('message', (event) => {
      console.log('[SW] Message from service worker:', event.data)

      // Handle different message types
      switch (event.data.type) {
        case 'CACHE_UPDATED':
          this.handleCacheUpdate(event.data.data)
          break
        case 'OFFLINE_MODE':
          this.handleOfflineMode(event.data.data)
          break
        default:
          console.log('[SW] Unknown message type:', event.data.type)
      }
    })
  }

  /**
   * Show update notification
   */
  private showUpdateNotification() {
    // Create update notification
    const notification = document.createElement('div')
    notification.className = 'sw-update-notification'
    notification.innerHTML = `
      <div class="sw-update-content">
        <span>🔄 New version available</span>
        <button onclick="window.serviceWorkerManager.update()">Update Now</button>
        <button onclick="this.parentElement.parentElement.remove()">Dismiss</button>
      </div>
    `

    // Add styles
    const style = document.createElement('style')
    style.textContent = `
      .sw-update-notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: #1f2937;
        color: white;
        padding: 16px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        z-index: 9999;
        border: 1px solid #374151;
      }
      .sw-update-content {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .sw-update-content button {
        background: #3b82f6;
        color: white;
        border: none;
        padding: 6px 12px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 12px;
      }
      .sw-update-content button:last-child {
        background: #6b7280;
      }
      .sw-update-content button:hover {
        opacity: 0.9;
      }
    `

    document.head.appendChild(style)
    document.body.appendChild(notification)

    // Auto-remove after 10 seconds
    setTimeout(() => {
      if (notification.parentElement) {
        notification.remove()
      }
    }, 10000)
  }

  /**
   * Update the service worker
   */
  async update(): Promise<void> {
    if (!this.registration || !this.updateAvailable) {
      return
    }

    try {
      await this.registration.waiting?.postMessage({ type: 'SKIP_WAITING' })
      console.log('[SW] Update message sent')
    } catch (error) {
      console.error('[SW] Failed to update:', error)
    }
  }

  /**
   * Check if app is online
   */
  isOnline(): boolean {
    return navigator.onLine
  }

  /**
   * Get service worker version
   */
  async getVersion(): Promise<string | null> {
    if (!this.registration) return null

    return new Promise((resolve) => {
      const channel = new MessageChannel()

      channel.port1.onmessage = (event) => {
        resolve(event.data.version)
      }

      this.registration!.active?.postMessage(
        { type: 'GET_VERSION' },
        [channel.port2]
      )
    })
  }

  /**
   * Send message to service worker
   */
  async sendMessage(message: ServiceWorkerMessage): Promise<void> {
    if (!this.registration?.active) {
      console.warn('[SW] No active service worker')
      return
    }

    try {
      await this.registration.active.postMessage(message)
    } catch (error) {
      console.error('[SW] Failed to send message:', error)
    }
  }

  /**
   * Handle cache update
   */
  private handleCacheUpdate(data: any) {
    console.log('[SW] Cache updated:', data)
    // Add any cache update handling logic
  }

  /**
   * Handle offline mode
   */
  private handleOfflineMode(data: any) {
    console.log('[SW] Offline mode:', data)
    // Add any offline mode handling logic
  }

  /**
   * Unregister service worker
   */
  async unregister(): Promise<boolean> {
    if (!this.registration) return false

    try {
      await this.registration.unregister()
      console.log('[SW] Service Worker unregistered')
      return true
    } catch (error) {
      console.error('[SW] Failed to unregister:', error)
      return false
    }
  }
}

// Create singleton instance
export const serviceWorkerManager = new ServiceWorkerManager()

// Make it available globally for the update notification
declare global {
  interface Window {
    serviceWorkerManager: ServiceWorkerManager
  }
}

window.serviceWorkerManager = serviceWorkerManager