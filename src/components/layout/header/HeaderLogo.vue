<template>
  <router-link to="/" class="lg:hidden">
    <LazyImage
      src="/images/logo/logo.png?v=2"
      alt="Logo"
      height="48px"
      image-class="h-12 brightness-0 invert"
    />
  </router-link>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import LazyImage from '../../ui/LazyImage.vue'
</script>
