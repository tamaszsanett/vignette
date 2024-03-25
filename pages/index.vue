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

      <div class="flex flex-col lg:flex-row gap-8 xl:gap-40 my-16 xl:my-28">
        <!-- <div v-for="card in cardsWithHTML" :key="card.id">
          <Card v-bind="card" />
        </div> -->
      </div>
    </section>
  </main>
</template>
<script setup>
import { ref } from 'vue';
import cardsData from '@/static/cardsData.json';
import cardsDataWithHTML from '@/static/cardsDataHTML.json';

const cards = ref(cardsData);

const cardsWithHTML = ref(cardsDataWithHTML);
</script>