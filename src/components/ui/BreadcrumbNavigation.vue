<template>
  <nav
    v-if="breadcrumbs.length > 1"
    class="breadcrumb-navigation"
    aria-label="Breadcrumb navigation"
  >
    <ol class="breadcrumb-list">
      <li
        v-for="(breadcrumb, index) in breadcrumbs"
        :key="breadcrumb.path"
        class="breadcrumb-item"
        :class="{ 'current': index === breadcrumbs.length - 1 }"
      >
        <!-- Separator -->
        <svg
          v-if="index > 0"
          class="breadcrumb-separator"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>

                 <!-- Breadcrumb Link/Text -->
         <router-link
           v-if="index < breadcrumbs.length - 1 && breadcrumb.path"
           :to="breadcrumb.path"
           class="breadcrumb-link"
           :title="breadcrumb.title"
           @click="handleBreadcrumbClick(breadcrumb, index)"
         >
           <span v-if="breadcrumb.icon" class="breadcrumb-icon">
             <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path v-if="breadcrumb.icon === 'HomeIcon'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
               <path v-else-if="breadcrumb.icon === 'UserCircleIcon'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
               <path v-else-if="breadcrumb.icon === 'DocsIcon'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
               <path v-else-if="breadcrumb.icon === 'BoxCubeIcon'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
               <path v-else-if="breadcrumb.icon === 'CheckIcon'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
             </svg>
           </span>
           <span class="breadcrumb-text">{{ breadcrumb.title }}</span>
         </router-link>

         <span
           v-else
           class="breadcrumb-current"
           :title="breadcrumb.title"
         >
           <span v-if="breadcrumb.icon" class="breadcrumb-icon">
             <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path v-if="breadcrumb.icon === 'HomeIcon'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
               <path v-else-if="breadcrumb.icon === 'UserCircleIcon'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
               <path v-else-if="breadcrumb.icon === 'DocsIcon'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
               <path v-else-if="breadcrumb.icon === 'BoxCubeIcon'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
               <path v-else-if="breadcrumb.icon === 'CheckIcon'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
             </svg>
           </span>
           <span class="breadcrumb-text">{{ breadcrumb.title }}</span>
         </span>
      </li>
    </ol>

    <!-- Quick Actions -->
    <div v-if="showQuickActions" class="quick-actions">
      <button
        v-if="canGoBack"
        @click="goBack"
        class="quick-action-btn"
        title="Go back"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
        <span class="sr-only">Go back</span>
      </button>

      <button
        @click="goHome"
        class="quick-action-btn"
        title="Go to home"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
        </svg>
        <span class="sr-only">Go to home</span>
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

interface Breadcrumb {
  title: string
  path?: string
  icon?: any
  meta?: any
}

interface BreadcrumbNavigationProps {
  showQuickActions?: boolean
  customBreadcrumbs?: Breadcrumb[]
}

const props = withDefaults(defineProps<BreadcrumbNavigationProps>(), {
  showQuickActions: true,
  customBreadcrumbs: undefined
})

const emit = defineEmits<{
  'breadcrumb-click': [breadcrumb: Breadcrumb, index: number]
}>()

const route = useRoute()
const router = useRouter()

// Default breadcrumb configuration
const defaultBreadcrumbs = {
  '/': { title: 'Home', icon: 'HomeIcon' },
  '/cv': { title: 'CV Dashboard', icon: 'UserCircleIcon' },
  '/publications': { title: 'Publications', icon: 'DocsIcon' },
  '/github-projects': { title: 'GitHub Projects', icon: 'BoxCubeIcon' },
  '/certifications': { title: 'Certifications', icon: 'CheckIcon' },
  '/about': { title: 'About', icon: 'UserCircleIcon' }
}

// Generate breadcrumbs from current route
const generateBreadcrumbs = (): Breadcrumb[] => {
  if (props.customBreadcrumbs) {
    return props.customBreadcrumbs
  }

  const pathSegments = route.path.split('/').filter(segment => segment.length > 0)
  const breadcrumbs: Breadcrumb[] = []

  // Always add home
  breadcrumbs.push({
    title: 'Home',
    path: '/',
    icon: 'HomeIcon'
  })

  // Build breadcrumbs from path segments
  let currentPath = ''
  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`

    // Get breadcrumb info from route meta or default config
    const routeInfo = route.matched.find(match => match.path === currentPath)
    const defaultInfo = defaultBreadcrumbs[currentPath as keyof typeof defaultBreadcrumbs]

    const title = (routeInfo?.meta?.breadcrumbTitle as string) ||
                  defaultInfo?.title ||
                  segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ') || 'Unknown'

    breadcrumbs.push({
      title,
      path: index === pathSegments.length - 1 ? undefined : currentPath,
      icon: defaultInfo?.icon,
      meta: routeInfo?.meta
    })
  })

  return breadcrumbs
}

// Computed properties
const breadcrumbs = computed(() => generateBreadcrumbs())

const canGoBack = computed(() => {
  return window.history.length > 1
})

// Methods
const handleBreadcrumbClick = (breadcrumb: Breadcrumb, index: number) => {
  emit('breadcrumb-click', breadcrumb, index)
}

const goBack = () => {
  router.back()
}

const goHome = () => {
  router.push('/')
}

// Icon type definition
type IconName = 'HomeIcon' | 'UserCircleIcon' | 'DocsIcon' | 'BoxCubeIcon' | 'CheckIcon'

// Expose methods
defineExpose({
  breadcrumbs: computed(() => breadcrumbs.value),
  goBack,
  goHome
})
</script>

<style scoped>
.breadcrumb-navigation {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  margin-bottom: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.breadcrumb-list {
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  flex-wrap: wrap;
  gap: 0.25rem;
}

.breadcrumb-item {
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.7);
  transition: all 0.2s ease;
}

.breadcrumb-item.current {
  color: white;
  font-weight: 600;
}

.breadcrumb-separator {
  width: 1rem;
  height: 1rem;
  margin: 0 0.5rem;
  color: rgba(255, 255, 255, 0.4);
  flex-shrink: 0;
}

.breadcrumb-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  text-decoration: none;
  color: inherit;
  transition: all 0.2s ease;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid transparent;
}

.breadcrumb-link:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
  color: white;
  transform: translateY(-1px);
}

.breadcrumb-current {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.breadcrumb-icon {
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
}

.breadcrumb-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
}

.quick-actions {
  display: flex;
  gap: 0.5rem;
  flex-shrink: 0;
}

.quick-action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  transition: all 0.2s ease;
}

.quick-action-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.3);
  color: white;
  transform: translateY(-1px);
}

.quick-action-btn:active {
  transform: translateY(0);
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Responsive design */
@media (max-width: 768px) {
  .breadcrumb-navigation {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    padding: 1rem;
  }

  .breadcrumb-list {
    width: 100%;
    overflow-x: auto;
    padding-bottom: 0.5rem;
  }

  .breadcrumb-text {
    max-width: 120px;
  }

  .quick-actions {
    align-self: flex-end;
  }
}

@media (max-width: 480px) {
  .breadcrumb-navigation {
    padding: 0.75rem;
  }

  .breadcrumb-item {
    font-size: 0.75rem;
  }

  .breadcrumb-link,
  .breadcrumb-current {
    padding: 0.375rem 0.5rem;
  }

  .breadcrumb-text {
    max-width: 80px;
  }

  .quick-action-btn {
    width: 2rem;
    height: 2rem;
  }
}

/* Animation for breadcrumb changes */
.breadcrumb-item {
  animation: breadcrumbFadeIn 0.3s ease-out;
}

@keyframes breadcrumbFadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Focus styles for accessibility */
.breadcrumb-link:focus,
.quick-action-btn:focus {
  outline: 2px solid rgba(255, 255, 255, 0.5);
  outline-offset: 2px;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .breadcrumb-navigation {
    border: 2px solid white;
  }

  .breadcrumb-link,
  .breadcrumb-current,
  .quick-action-btn {
    border-width: 2px;
  }
}
</style>