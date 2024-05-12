<template>
  <section class="shadow bg-green text-white purchase-calculator">
    <div class="w-full flex items-center justify-center py-4">
      <span>{{ title }}</span>
    </div>
    <div
      class="bg-white text-base-black font-bold w-full flex items-center justify-between"
    >
      <div class="w-1/2 py-3">{{ category }} - {{ durationType }}</div>
      <div class="w-1/2">{{ price }}</div>
    </div>
    <div
      class="bg-white text-base-black font-bold w-full flex items-center justify-between"
    >
      <div class="w-1/2 py-3">D1 - 1 month</div>
      <div class="w-1/2 py-3">10 360 Ft</div>
    </div>
    <div class="w-full flex items-center justify-between py-1">
      <div class="w-1/2 py-3">Total:</div>
      <div class="w-1/2 py-3">12 800 Ft</div>
    </div>
  </section>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  title: String,
  category: String,
  durationType: String,
  price: String,
  list: Array,
  bgClass: String,
});
</script>