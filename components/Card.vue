<template>
    <div :class="`${bgClass}`" class="img-card text-white h-full lg:h-fit">
      <img v-if="imgUrl" :src="imgUrl" :alt="alt" class="w-full object-cover mt-5 max-h-52 base-card-rounded" />
      <div>
        <h3 v-if="title" class="text-start mb-3 uppercase font-semibold">{{ title }}</h3>
        <div v-if="desc" v-html="desc"></div>
        <ol class="list-disc ml-8 text-[11px] sm:text-[13px]">
          <li v-for="(item, index) in list" :key="index" class="pl-2 pb-2 uppercase">{{ item }}</li>
        </ol>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  
  const props = defineProps({
    title: String,
    desc: String,
    imgUrl: String,
    alt: String,
    list: Array,
    bgClass: String,
  });
  </script>