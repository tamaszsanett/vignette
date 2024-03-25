<template>
  <div class="flex flex-col justify-center items-center text-center">
    <div class="text-xs">
      &copy; 2021-{{ currentYear }}. MINDEN JOG FENNTARTVA.
    </div>
    <div class="mt-4">
      <p class="text-sm">hungary-vignette.eu 2024</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const currentYear = computed(() => new Date().getFullYear());
</script>
