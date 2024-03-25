<template>
  <div v-if="contentItem" class="img-card text-white h-full lg:h-fit">
    <div class="mb-4">
      <img v-if="contentItem.src" :src="siteUrl + contentItem.src" :alt="contentItem.alt" class="w-full object-cover mt-5 max-h-52 rounded-[5px]" />
      <div>
        <NuxtLink :to="siteUrl + contentItem.url" class="text-title-black hover:text-secondary-orange">
          <h3 v-if="contentItem.title" class="text-sm mb-3 font-semibold my-10">{{ contentItem.title }}</h3>
        </NuxtLink>
        <div v-if="contentItem.desc" v-html="contentItem.desc" class="text-desc-gray text-sm text-ellipsis line-clamp-5"></div>
        <NuxtLink v-if="contentItem.buttonText" :to="siteUrl + contentItem.url" class="button-class" :title="contentItem.buttonTitle">
          {{ contentItem.buttonText }}
          <img v-if="contentItem.buttonIconSrc" :src="siteUrl + contentItem.buttonIconSrc" :alt="contentItem.buttonTitle" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  contentItem: Object,
  siteUrl: String,
});
</script>