<template>
  <div>
    <div class="absolute right-0 top-0 -z-1 w-full max-w-[250px] xl:max-w-[450px]">
      <LazyImage src="/images/shape/grid-01.svg" alt="grid" />
    </div>
    <div class="absolute bottom-0 left-0 -z-1 w-full max-w-[250px] rotate-180 xl:max-w-[450px]">
      <LazyImage src="/images/shape/grid-01.svg" alt="grid" />
    </div>
  </div>
</template>

<script setup lang="ts">
import LazyImage from '../ui/LazyImage.vue'
</script>
