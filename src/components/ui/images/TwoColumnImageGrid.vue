<template>
  <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
    <div>
      <LazyImage
        src="/images/grid-image/image-02.png"
        alt="grid"
        image-class="w-full border border-gray-200 rounded-xl dark:border-gray-800"
      />
    </div>

    <div>
      <LazyImage
        src="/images/grid-image/image-03.png"
        alt="grid"
        image-class="w-full border border-gray-200 rounded-xl dark:border-gray-800"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import LazyImage from '../LazyImage.vue'
</script>
