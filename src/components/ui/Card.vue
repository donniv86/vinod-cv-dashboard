<template>
  <div class="modern-card animate-fade-in-up">
    <slot name="header">
      <h3 v-if="title" class="text-2xl font-bold mb-6 text-white !important border-b border-white/20 pb-3 drop-shadow-lg bg-black/20 px-4 py-2 rounded-lg" style="color: white !important; text-shadow: 0 0 15px rgba(255, 255, 255, 0.8); font-weight: 900;">{{ title }}</h3>
    </slot>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
const props = defineProps<{ title?: string }>()
</script>