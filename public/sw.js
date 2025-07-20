/**
 * Service Worker for Dr. Vinod Devaraji CV Dashboard
 * Provides offline functionality and intelligent caching
 *
 * @author Dr. Vinod Devaraji CV Dashboard
 * @copyright 2024 Dr. Vinod Devaraji
 */

const CACHE_NAME = 'vinod-cv-dashboard-v1.0.0'
const STATIC_CACHE = 'vinod-cv-static-v1.0.0'
const DYNAMIC_CACHE = 'vinod-cv-dynamic-v1.0.0'

// Files to cache immediately
const STATIC_FILES = [
  '/',
  '/index.html',
  '/cv',
  '/publications',
  '/github-projects',
  '/certifications',
  '/about',
  '/vinod.png',
  '/images/logo/logo.png',
  '/images/logo/vinod-cv-logo.svg',
  '/images/logo/vinod-cv-logo-dark.svg',
  '/images/user/owner.jpg',
  '/images/shape/grid-01.svg',
  '/images/error/404.svg'
]

// API endpoints to cache
const API_CACHE = [
  '/api/publications',
  '/api/projects',
  '/api/certifications'
]

// Install event - cache static files
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...')

  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('[SW] Caching static files')
        return cache.addAll(STATIC_FILES)
      })
      .then(() => {
        console.log('[SW] Static files cached successfully')
        return self.skipWaiting()
      })
      .catch((error) => {
        console.error('[SW] Failed to cache static files:', error)
      })
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...')

  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('[SW] Deleting old cache:', cacheName)
              return caches.delete(cacheName)
            }
          })
        )
      })
      .then(() => {
        console.log('[SW] Service worker activated')
        return self.clients.claim()
      })
  )
})

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return
  }

  // Handle different types of requests
  if (isStaticAsset(url.pathname)) {
    event.respondWith(handleStaticAsset(request))
  } else if (isAPIRequest(url.pathname)) {
    event.respondWith(handleAPIRequest(request))
  } else if (isNavigationRequest(request)) {
    event.respondWith(handleNavigationRequest(request))
  } else {
    event.respondWith(handleOtherRequest(request))
  }
})

// Handle static assets (images, CSS, JS)
function handleStaticAsset(request) {
  return caches.match(request)
    .then((response) => {
      if (response) {
        return response
      }

      return fetch(request)
        .then((response) => {
          if (response.status === 200) {
            const responseClone = response.clone()
            caches.open(STATIC_CACHE)
              .then((cache) => {
                cache.put(request, responseClone)
              })
          }
          return response
        })
        .catch(() => {
          // Return fallback for images
          if (request.destination === 'image') {
            return caches.match('/images/error/404.svg')
          }
        })
    })
}

// Handle API requests
function handleAPIRequest(request) {
  return fetch(request)
    .then((response) => {
      if (response.status === 200) {
        const responseClone = response.clone()
        caches.open(DYNAMIC_CACHE)
          .then((cache) => {
            cache.put(request, responseClone)
          })
      }
      return response
    })
    .catch(() => {
      return caches.match(request)
        .then((response) => {
          if (response) {
            return response
          }
          // Return empty response for failed API calls
          return new Response(JSON.stringify({ error: 'Offline - No cached data' }), {
            headers: { 'Content-Type': 'application/json' }
          })
        })
    })
}

// Handle navigation requests (HTML pages)
function handleNavigationRequest(request) {
  return fetch(request)
    .then((response) => {
      if (response.status === 200) {
        const responseClone = response.clone()
        caches.open(STATIC_CACHE)
          .then((cache) => {
            cache.put(request, responseClone)
          })
      }
      return response
    })
    .catch(() => {
      return caches.match(request)
        .then((response) => {
          if (response) {
            return response
          }
          // Return offline page
          return caches.match('/index.html')
        })
    })
}

// Handle other requests
function handleOtherRequest(request) {
  return fetch(request)
    .catch(() => {
      return caches.match(request)
    })
}

// Helper functions
function isStaticAsset(pathname) {
  return pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$/)
}

function isAPIRequest(pathname) {
  return pathname.startsWith('/api/') || API_CACHE.some(api => pathname.includes(api))
}

function isNavigationRequest(request) {
  return request.mode === 'navigate' ||
         (request.method === 'GET' && request.headers.get('accept').includes('text/html'))
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync triggered:', event.tag)

  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync())
  }
})

// Handle push notifications
self.addEventListener('push', (event) => {
  console.log('[SW] Push notification received')

  const options = {
    body: event.data ? event.data.text() : 'New update available',
    icon: '/images/logo/logo.png',
    badge: '/images/logo/logo.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'View Dashboard',
        icon: '/images/logo/logo.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/images/logo/logo.png'
      }
    ]
  }

  event.waitUntil(
    self.registration.showNotification('Dr. Vinod CV Dashboard', options)
  )
})

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Notification clicked:', event.action)

  event.notification.close()

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    )
  }
})

// Background sync function
async function doBackgroundSync() {
  try {
    console.log('[SW] Performing background sync...')
    // Add any background sync logic here
    // For example, sync offline data when connection is restored
  } catch (error) {
    console.error('[SW] Background sync failed:', error)
  }
}

// Message handling for communication with main thread
self.addEventListener('message', (event) => {
  console.log('[SW] Message received:', event.data)

  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }

  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME })
  }
})