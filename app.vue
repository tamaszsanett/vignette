<script setup lang="ts">
import { onMounted } from 'vue';

// Exchange image URLs only in test mode

// when the page loads
onMounted(() => {
  replaceImageUrls('https://www.new.hungary-vignette.eu');
});

function replaceImageUrls(baseUrl: string) {
  const images = document.querySelectorAll('img');
  
  images.forEach((img: HTMLImageElement) => {
    if (img.src.includes('Content/')) {
      img.src = baseUrl + img.getAttribute('src');
    }
  });
}
</script>

<template>
  <NuxtLayout name="default">
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>