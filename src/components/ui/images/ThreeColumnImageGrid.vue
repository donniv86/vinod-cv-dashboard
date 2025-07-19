<template>
  <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
    <div v-for="(image, index) in images" :key="index">
      <LazyImage
        :src="image.src"
        :alt="image.alt"
        image-class="w-full border border-gray-200 rounded-xl dark:border-gray-800"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import LazyImage from '../LazyImage.vue'

const images = [
  { src: '/images/grid-image/image-04.png', alt: 'Grid image 1' },
  { src: '/images/grid-image/image-05.png', alt: 'Grid image 2' },
  { src: '/images/grid-image/image-06.png', alt: 'Grid image 3' },
]
</script>
