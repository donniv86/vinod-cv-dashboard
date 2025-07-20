<template>
  <div class="min-h-screen xl:flex">
    <app-sidebar />
    <Backdrop />
    <div
      class="flex-1 transition-all duration-300 ease-in-out"
      :class="[isExpanded || isHovered ? 'lg:ml-[290px]' : 'lg:ml-[90px]']"
    >
      <app-header />
      <ResponsiveContainer class="mx-auto max-w-(--breakpoint-2xl) md:p-3">
        <!-- Minimal breadcrumb for navigation -->
        <div class="flex items-center gap-2 mb-2 px-1">
          <span class="text-xs text-gray-400">CV Dashboard</span>
          <span class="text-xs text-gray-500">/</span>
          <span class="text-xs text-white font-medium">{{ $route.meta?.title || 'Overview' }}</span>
        </div>
        <slot></slot>
      </ResponsiveContainer>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppSidebar from './AppSidebar.vue'
import AppHeader from './AppHeader.vue'
import ResponsiveContainer from '../ui/ResponsiveContainer.vue'
import { useSidebar } from '@/composables/useSidebar'
import Backdrop from './Backdrop.vue'

const { isExpanded, isHovered } = useSidebar()

const handleBreadcrumbClick = (breadcrumb: any, index: number) => {
  console.log('Breadcrumb clicked:', breadcrumb.title, 'at index:', index)
}
</script>
