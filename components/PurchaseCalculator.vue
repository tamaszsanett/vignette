<template>
  <section :class="['shadow rounded-[15px] bg-green text-white purchase-calculator text-center', bgClass]">
    <div class="w-full flex items-center justify-center py-4">
      <span>{{ title }}</span>
    </div>
    <div class="max-h-[250px] overflow-y-auto">
      <template v-for="(item, index) in list" :key="index">
        <div class="bg-white text-base-black font-bold w-full flex items-center justify-between">
          <div class="w-2/3 p-3 text-left">{{ item.category }} - {{ item.durationType }}</div>
          <div :class="['w-1/3 pr-3 text-right', { 'py-3': index % 2 === 1 }]">{{ item.price }}</div>
        </div>
      </template>
    </div>
    <div class="w-full flex items-center justify-between py-1">
      <div class="w-2/6 pl-3 py-3 text-left">Total:</div>
      <div class="w-3/6 pr-6 text-right">{{ totalPrice }}</div>
    </div>
  </section>
</template>

<script setup>

const props = defineProps({
  title: String,
  list: Array,
  bgClass: String
});

const totalPrice = computed(() => {
  const total = props.list.reduce((acc, item) => {
    const cleanPrice = parseFloat(item.price.replace(/[^\d.]/g, ''));
    return acc + cleanPrice;
  }, 0);

  return total.toFixed(2) + " €";  
});
</script>