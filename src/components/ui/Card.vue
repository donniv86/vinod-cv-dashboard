<template>
  <div class="modern-card animate-fade-in-up">
    <slot name="header">
      <h3 v-if="title" class="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">{{ title }}</h3>
    </slot>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
const props = defineProps<{ title?: string }>()
</script>