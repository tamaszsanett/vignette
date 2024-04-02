<template>
  <!-- bg-red-500 bg-blue-500 bg-teal-500 -->
  <main class="">
    <section class="min-h-[700px] container mx-auto px-4 pt-6">
      <div class="flex flex-col gap-8 xl:gap-20 my-16 xl:my-28">
<!--         <WidgetWhyYouBuyHere />
 -->      </div>
      <div class="flex flex-col gap-8 xl:gap-20 my-16 xl:my-28">
        <WidgetVignetteAccordion />
      </div>
      <div class="flex flex-col gap-8 xl:gap-20 my-16 xl:my-28">
        <WidgetFaq />
      </div>
      <section class="my-16 xl:my-28">
        <h2>Recent news</h2>
        <div
          class="grid sm:grid-cols-2 md:grid-cols-3 content-center gap-8 xl:gap-10"
        >
          <div v-for="item in newsWidget.content" :key="item.ID">
            <WidgetNews :contentItem="item" :siteUrl="siteUrl" />
          </div>
        </div>
      </section>
    </section>
  </main>
</template>
<script setup>
import { ref } from "vue";
import newsWidgetData from "@/static/newsWidget.json";
const newsWidget = ref(newsWidgetData);
const siteUrl = ref(newsWidget.value.siteUrl); //

import Dialog from "primevue/dialog";
import Button from "primevue/button";
import Calendar from "primevue/calendar";

const visible = ref(false);
</script>
