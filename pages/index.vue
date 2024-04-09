<template>
  <!-- bg-red-500 bg-blue-500 bg-teal-500 -->
  <main class="">
    <section class="min-h-[700px] container mx-auto px-4 lg:px-0 pt-6">
      <WidgetMainTextBox />
      <WidgetVignetteAccordion />
      <WidgetPurchaseProcess />
      <WidgetTypeOfBaseTime />
      <WidgetTypeCategory />
      <WidgetWhyYouBuyHere />
      <WidgetFaq />
      <WidgetNews />
    </section>
  </main>
</template>
<script setup>
import { ref } from "vue";

const visible = ref(false);
</script>
