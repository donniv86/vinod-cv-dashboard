<template>
  <div class="relative" ref="dropdownRef">
    <button
      class="flex items-center text-gray-300"
      @click.prevent="toggleDropdown"
    >
      <span class="mr-3 overflow-hidden rounded-full h-11 w-11">
        <img src="/vinod.png" alt="Vinod Devaraji" />
      </span>

      <span class="block mr-1 font-medium text-theme-sm">Vinod </span>

      <ChevronDownIcon :class="{ 'rotate-180': dropdownOpen }" />
    </button>

    <!-- Dropdown Start -->
    <div
      v-if="dropdownOpen"
      class="absolute right-0 mt-[17px] flex w-[260px] flex-col rounded-2xl border border-gray-700/50 bg-gray-900/90 backdrop-blur-sm p-3 shadow-theme-lg"
    >
      <div>
        <span class="block font-medium text-cyan-400 text-theme-sm">
          Vinod Devaraji
        </span>
        <span class="mt-0.5 block text-theme-xs text-gray-300">
          donniv86@gmail.com
        </span>
      </div>

      <ul class="flex flex-col gap-1 pt-4 pb-3 border-b border-gray-700/50">
        <li v-for="item in menuItems" :key="item.href">
          <router-link
            :to="item.href"
            class="flex items-center gap-3 px-3 py-2 font-medium text-gray-300 rounded-lg group text-theme-sm hover:bg-gray-800/50 hover:text-cyan-300"
          >
            <!-- SVG icon would go here -->
            <component
              :is="item.icon"
              class="text-gray-400 group-hover:text-cyan-300"
            />
            {{ item.text }}
          </router-link>
        </li>
      </ul>
      <div class="flex items-center gap-3 px-3 py-2 mt-3 font-medium text-gray-300 rounded-lg group text-theme-sm hover:bg-gray-800/50 hover:text-cyan-300">
        <svg class="w-5 h-5 text-gray-400 group-hover:text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
        </svg>
        <a href="mailto:donniv86@gmail.com" class="text-inherit">Contact Me</a>
      </div>
    </div>
    <!-- Dropdown End -->
  </div>
</template>

<script setup>
import { UserCircleIcon, ChevronDownIcon } from '@/icons'
import { RouterLink } from 'vue-router'
import { ref, onMounted, onUnmounted } from 'vue'

const dropdownOpen = ref(false)
const dropdownRef = ref(null)

const menuItems = [
  { href: '/cv', icon: UserCircleIcon, text: 'CV Dashboard' },
]

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

const closeDropdown = () => {
  dropdownOpen.value = false
}

const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    closeDropdown()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
