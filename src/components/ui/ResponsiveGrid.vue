<template>
  <div
    :class="[
      'grid-responsive',
      {
        'grid-cols-1': cols === 1,
        'grid-cols-2': cols === 2,
        'grid-cols-3': cols === 3,
        'grid-cols-4': cols === 4,
        'grid-cols-5': cols === 5,
        'grid-cols-6': cols === 6,
        'grid-auto-fit': autoFit,
        'grid-auto-fill': autoFill,
        'grid-masonry': masonry
      },
      customClass
    ]"
    :style="customStyle"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  cols?: 1 | 2 | 3 | 4 | 5 | 6
  autoFit?: boolean
  autoFill?: boolean
  masonry?: boolean
  customClass?: string
  customStyle?: string | Record<string, string>
}

withDefaults(defineProps<Props>(), {
  cols: 1,
  autoFit: false,
  autoFill: false,
  masonry: false,
  customClass: '',
  customStyle: ''
})
</script>

<style scoped>
.grid-responsive {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;
}

.grid-auto-fit {
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}

.grid-auto-fill {
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
}

.grid-cols-1 {
  grid-template-columns: 1fr;
}

.grid-cols-2 {
  grid-template-columns: repeat(2, 1fr);
}

.grid-cols-3 {
  grid-template-columns: repeat(3, 1fr);
}

.grid-cols-4 {
  grid-template-columns: repeat(4, 1fr);
}

.grid-cols-5 {
  grid-template-columns: repeat(5, 1fr);
}

.grid-cols-6 {
  grid-template-columns: repeat(6, 1fr);
}

.grid-masonry {
  columns: 1;
  column-gap: 1rem;
}

.grid-masonry > * {
  break-inside: avoid;
  margin-bottom: 1rem;
}

/* Responsive breakpoints */
@media (min-width: 640px) {
  .grid-responsive {
    gap: 1.5rem;
  }

  .grid-auto-fit,
  .grid-auto-fill {
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  }

  .grid-masonry {
    columns: 2;
  }
}

@media (min-width: 768px) {
  .grid-responsive {
    gap: 2rem;
  }

  .grid-auto-fit,
  .grid-auto-fill {
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  }

  .grid-cols-2 {
    grid-template-columns: repeat(2, 1fr);
  }

  .grid-cols-3 {
    grid-template-columns: repeat(3, 1fr);
  }

  .grid-cols-4 {
    grid-template-columns: repeat(2, 1fr);
  }

  .grid-cols-5 {
    grid-template-columns: repeat(3, 1fr);
  }

  .grid-cols-6 {
    grid-template-columns: repeat(3, 1fr);
  }

  .grid-masonry {
    columns: 2;
  }
}

@media (min-width: 1024px) {
  .grid-responsive {
    gap: 2.5rem;
  }

  .grid-auto-fit,
  .grid-auto-fill {
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  }

  .grid-cols-4 {
    grid-template-columns: repeat(4, 1fr);
  }

  .grid-cols-5 {
    grid-template-columns: repeat(5, 1fr);
  }

  .grid-cols-6 {
    grid-template-columns: repeat(6, 1fr);
  }

  .grid-masonry {
    columns: 3;
  }
}

@media (min-width: 1280px) {
  .grid-responsive {
    gap: 3rem;
  }

  .grid-auto-fit,
  .grid-auto-fill {
    grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  }

  .grid-masonry {
    columns: 4;
  }
}

/* Mobile optimizations */
@media (max-width: 640px) {
  .grid-responsive {
    gap: 1rem;
  }

  .grid-cols-2,
  .grid-cols-3,
  .grid-cols-4,
  .grid-cols-5,
  .grid-cols-6 {
    grid-template-columns: 1fr;
  }

  .grid-masonry {
    columns: 1;
  }
}

/* Landscape mobile */
@media (max-width: 768px) and (orientation: landscape) {
  .grid-responsive {
    gap: 0.75rem;
  }

  .grid-cols-2 {
    grid-template-columns: repeat(2, 1fr);
  }

  .grid-masonry {
    columns: 2;
  }
}
</style>