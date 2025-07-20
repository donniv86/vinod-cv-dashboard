<template>
  <div
    :class="[
      'container-responsive',
      {
        'container-fluid': fluid,
        'container-narrow': narrow,
        'container-wide': wide
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
  fluid?: boolean
  narrow?: boolean
  wide?: boolean
  customClass?: string
  customStyle?: string | Record<string, string>
}

withDefaults(defineProps<Props>(), {
  fluid: false,
  narrow: false,
  wide: false,
  customClass: '',
  customStyle: ''
})
</script>

<style scoped>
.container-responsive {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--container-padding);
  padding-right: var(--container-padding);
}

.container-fluid {
  max-width: none;
}

.container-narrow {
  max-width: 768px;
}

.container-wide {
  max-width: 1400px;
}

/* Responsive breakpoints */
@media (min-width: 640px) {
  .container-responsive:not(.container-fluid):not(.container-narrow):not(.container-wide) {
    max-width: 640px;
  }
}

@media (min-width: 768px) {
  .container-responsive:not(.container-fluid):not(.container-narrow):not(.container-wide) {
    max-width: 768px;
  }
}

@media (min-width: 1024px) {
  .container-responsive:not(.container-fluid):not(.container-narrow):not(.container-wide) {
    max-width: 1024px;
  }
}

@media (min-width: 1280px) {
  .container-responsive:not(.container-fluid):not(.container-narrow):not(.container-wide) {
    max-width: 1280px;
  }
}

@media (min-width: 1536px) {
  .container-responsive:not(.container-fluid):not(.container-narrow):not(.container-wide) {
    max-width: 1536px;
  }
}

/* Mobile optimizations */
@media (max-width: 768px) {
  .container-responsive {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

@media (max-width: 480px) {
  .container-responsive {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }
}
</style>