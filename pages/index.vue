<template>
  <main class="">
    <section class="container mx-auto px-4 lg:px-0 pt-6">
      <WidgetMainTextBox />
      <WidgetVignetteAccordion />
      <WidgetPurchaseFlow />
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
