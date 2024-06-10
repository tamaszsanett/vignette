<template>
  <div class="ml-2">
    <i
      :class="['pi text-sm cursor-pointer', isDarkTheme ? 'pi-sun text-base-orange' : 'pi-moon']"
      @click="toggleTheme"
    ></i>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const isDarkTheme = ref(false);

const applyTheme = (): void => {
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = localStorage.getItem('theme') || (prefersDarkScheme ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
  document.documentElement.classList.toggle('dark', theme === 'dark');
  document.documentElement.classList.toggle('light', theme === 'light');
  document.documentElement.classList.remove('light'); // Remove the default light class
  isDarkTheme.value = theme === 'dark';
};

const toggleTheme = (): void => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  document.documentElement.classList.toggle('dark', newTheme === 'dark');
  document.documentElement.classList.toggle('light', newTheme === 'light');
  localStorage.setItem('theme', newTheme);
  isDarkTheme.value = newTheme === 'dark';
};

onMounted(() => {
  applyTheme();
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  mediaQuery.addEventListener('change', applyTheme);
  onUnmounted(() => {
    mediaQuery.removeEventListener('change', applyTheme);
  });
});
</script>
