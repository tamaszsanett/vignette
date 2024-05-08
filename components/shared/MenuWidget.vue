<template>
  <header v-if="menuWidget" class="w-full z-40 top-0 bg-secondary-black">
    <nav
      class="mx-auto flex justify-between items-center p-4 text-white menu-wrapper max-w-[1245px]"
    >
      <div class="flex justify-start items-center">
        <a v-if="menuWidget.logo" :href="`/${langSelection?.code}`">
          <img
            :src="menuWidget.logo.src"
            :alt="menuWidget.logo.alt"
            class="w-28 h-10 sm:w-[196px] sm:h-[69px] md:w-28 md:h-10 xl:w-[196px] xl:h-[69px]"
          />
        </a>
        <div class="hidden md:flex space-x-4 ml-5">
          <a
            v-for="item in menuWidget.menu"
            :href="`/${currentLanguage}${item.url}`"
            :key="item.url"
            :class="{ 'active-link': isActive(item.url) }"
            class="home"
          >
            {{ item.title }}
          </a>
        </div>
      </div>
      <!-- Language Selector -->
      <div class="relative ml-auto">
        <Button
          @click="visible = true"
          class="btn-sm btn lang-btn"
          v-if="langSelection"
        >
          <span>{{ langSelection.title }}</span>
          <img class="max-w-[20px] ml-2" :src="langSelection.imgSrc" alt="Language" />
        </Button>
        <!--   <transition name="drop-down">
          <Button v-if="isLanguageDropdownOpen" label="show" @click="visible = true" class="lang-switcher mt-5">
          </Button>
        </transition> -->
      </div>
      <button type="button" class="md:hidden p-4" @click="toggleMobileMenu" aria-label="Toggle menu">
        <!-- Menu Icon -->
        <svg
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16m-7 6h7"
          ></path>
        </svg>
      </button>
      <transition name="slide">
        <div
          v-if="isMobileMenuOpen"
          class="text-white fixed h-screen left-0 top-0 w-full max-w-xs mx-auto bg-base-black p-4 z-30"
        >
          <div class="mt-5 flex flex-col items-start">
            <button class="self-end" @click="toggleMobileMenu" aria-label="Toggle menu">
              <!-- Close Icon -->
              <svg
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <a :href="menuWidget.siteUrl" class="text-2xl font-bold mb-5">
              <img
                :src="`${menuWidget.logo.src}`"
                :alt="menuWidget.logo.alt"
                class="opacity-60 w-[196px] h-[69px]"
              />
            </a>
            <a
              v-for="item in menuWidget.menu"
              :href="`/${currentLanguage}${item.url}`"
              :key="item.url"
              :class="{ 'active-link': isActive(item.url) }"
              class="block py-2 hover:text-zinc-300"
              @click="toggleMobileMenu"
            >
              {{ item.title }}
            </a>
          </div>
        </div>
      </transition>
      <Dialog
        v-model:visible="visible"
        modal
        dismissableMask
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
        class="max-w-sm w-full top-40 absolute rounded-md"
      >
        <template #header v-if="langSelection">
          <div class="inline-flex items-center gap-2 pb-2 border-b w-full">
            <img class="max-w-[20px]" :src="langSelection.imgSrc" />
            <span class="font-bold whitespace-nowrap">{{
              langSelection.title
            }}</span>
          </div>
        </template>
        <div class="grid grid-cols-2 justify-between gap-2">
          <div
            v-for="item in menuWidget.languageSelection"
            @click="() => changeLanguage(item.code, item.url)"
            :key="item.title"
            class="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-[4px] flex items-center gap-1"
          >
          <img
              :src="`${item.imgSrc}`"
              :alt="item.alt"
              class="inline-block ml-2 w-5 h-5"
            />  
          <span>{{ item.title }}</span>
            
          </div>
        </div>
        <template #footer>
          <div class="border-t pt-5 w-full">
            <Button
              class="btn primary-btn btn-sm mx-auto"
              label="Close"
              icon="pi pi-check"
              @click="visible = false"
              autofocus
            />
          </div>
        </template>
      </Dialog>
    </nav>
  </header>
</template>

<script setup lang="ts">
import type { MenuWidget, LanguageSelectionItem } from "~/types/types";

import type { PropType } from "vue";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import { ref, onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useWidgets } from "~/composables/useWidgets";
const route = useRoute();
const router = useRouter();
const isMobileMenuOpen = ref(false);
const visible = ref(false);

const props = defineProps({
  menuWidget: {
    type: Object as PropType<MenuWidget>,
    required: true,
  },
});

const { currentLanguage } = useWidgets();
const langSelection = ref<LanguageSelectionItem>();

const changeLanguage = (langCode: string, url: string): void => {
  currentLanguage.value = langCode;
  const newLang = props.menuWidget.languageSelection.find(
    (lang: { code: string }) => lang.code === langCode
  );
  if (newLang) {
    langSelection.value = newLang;
  }
  url = url.replace("https://new-hungary-vignette.voxpay.hu", "");
  if (url.startsWith("https"))
  {
    navigateTo(url, { external: true }); 
  }
  else {
    navigateTo(url);
  }
};

const isActive = (url: string): boolean => route.path === url;

const toggleMobileMenu = (): void => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

// Initialize langSelection based on the current language in the URL
onMounted(() => {
  const langCode = route.params.lang || "en"; // Default to 'en' if no language code is provided
  const language = props.menuWidget.languageSelection.find(
    (lang: { code: string | string[] }) => lang.code === langCode
  );
  langSelection.value = language || props.menuWidget.languageSelection[0]; // Default to the first language if the specified language is not found
});
</script>

<style scoped>
/* Slide-in animation */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.8s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}
.slide-enter-to,
.slide-leave-from {
  transform: translateX(0);
}

/* Drop-down animation */
.drop-down-enter-active,
.drop-down-leave-active {
  transition: transform 0.8s ease;
}
.drop-down-enter-from,
.drop-down-leave-to {
  transform: translateY(10%);
  opacity: 0;
}
.drop-down-enter-to,
.drop-down-leave-from {
  transform: translateY(0);
  opacity: 1;
}
</style>
