<template>
  <!-- bg-red-500 bg-blue-500 bg-teal-500 -->
  <main class="">
    <section class="min-h-[700px] container mx-auto px-4 pt-6">
      <!-- <h1>Főoldal</h1> -->

      <div class="flex flex-col lg:flex-row gap-8 xl:gap-40 my-16 xl:my-28">
        <!--  <div v-for="card in cards" :key="card.id">
          <Card v-bind="card" />
        </div> -->
      </div>
      <!-- <h1>HTML kártyák</h1> -->
      <h2>Recent news</h2>
      <div class="flex flex-col lg:flex-row gap-8 xl:gap-40 my-16 xl:my-28">
        <div v-for="item in newsWidget.content" :key="item.ID">
          <WidgetNews :contentItem="item" :siteUrl="siteUrl" />
        </div>
      </div>
    </section>
  </main>
</template>
<script setup>
import { ref } from "vue";
import newsWidgetData from "@/static/newsWidget.json";
const newsWidget = ref(newsWidgetData);
const siteUrl = ref(newsWidget.value.siteUrl); //
</script>
