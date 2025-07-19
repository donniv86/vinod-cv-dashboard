<template>
  <div class="relative">
    <div id="pane" class="overflow-hidden">
      <LazyImage
        src="/images/grid-image/image-01.png"
        alt="Cover"
        image-class="w-full border border-gray-200 rounded-xl dark:border-gray-800"
      />
    </div>
    <div id="ghostpane" class="absolute top-0 left-0 duration-300 ease-in-out"></div>
  </div>
</template>

<script setup lang="ts">
import LazyImage from '../LazyImage.vue'
</script>
