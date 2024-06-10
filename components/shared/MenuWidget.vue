<template>
  <header v-if="menuWidget" class="w-full z-40 top-0 bg-secondary-black">
    <nav
      class="mx-auto flex justify-between items-center p-4 text-white menu-wrapper w-full max-w-[1245px]"
    >
      <div class="flex justify-start items-center w-full">
        <a v-if="menuWidget.logo" :href="`/${langSelection?.code}`">
          <img
            :src="menuWidget.logo.src"
            :alt="menuWidget.logo.alt"
            class="w-28 h-10 sm:w-[196px] sm:h-[69px] md:w-28 md:h-10 xl:w-[196px] xl:h-[69px]"
          />
        </a>
        <div class="hidden md:flex items-center space-x-4 ml-2 mr-8">
          <a
            v-for="item in menuWidget.menu"
            :href="`/${currentLanguage}${item.url}`"
            :key="item.url"
            :class="{ 'active-link': isActive(item.url) }"
            class="home"
            v-html="item.title"
          ></a>
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
          <img
            class="max-w-[20px] ml-2"
            :src="langSelection.imgSrc"
            alt="Language"
          />
        </Button>
        <!--   <transition name="drop-down">
          <Button v-if="isLanguageDropdownOpen" label="show" @click="visible = true" class="lang-switcher mt-5">
          </Button>
        </transition> -->
      </div>
      <button
        type="button"
        class="md:hidden p-4"
        @click="toggleMobileMenu"
        aria-label="Toggle menu"
      >
        <!-- Menu Icon -->
        <svg class="toggle-icon"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-width="1.5"
            d="M20 7H4m16 5H4m16 5H4"
          />
        </svg>
      </button>
      <transition name="slide">
        <div
          v-if="isMobileMenuOpen"
          v-click-outside="closeMobileMenu"
          class="sidebar"
        >
          <div class="mt-5 flex flex-col items-start toggle-icon">
            <button
              class="self-end"
              @click="toggleMobileMenu"
              aria-label="Toggle menu"
            >
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
        class="max-w-sm w-full top-40 absolute"
      >
        <template #header v-if="langSelection">
          <div class="inline-flex items-center gap-2 pb-2 border-b w-full">
            <img class="max-w-[20px]" :src="langSelection.imgSrc" />
            <span class="font-bold whitespace-nowrap">{{
              langSelection.title
            }}</span>
          </div>
        </template>
        <ul class="grid grid-cols-2 justify-between gap-2 m-0">
          <li
            v-for="item in menuWidget.languageSelection"
            @click="() => changeLanguage(item.code, item.url)"
            :key="item.title"
            class="cursor-pointer px-4 py-2 text-sm text-base-black rounded-[4px] flex items-center gap-1 capitalize"
          >
            <img
              :src="`${item.imgSrc}`"
              :alt="item.alt"
              class="inline-block ml-2 w-5 h-5 object-contain"
            />
            <span class="hover:text-link-hover transition-all">{{ item.title }}</span>
          </li>
        </ul>
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
      <ThemeSwitcher />
    </nav>
  </header>
</template>

<script setup lang="ts">
import type { MenuWidget, LanguageSelectionItem } from "~/types/types";
import type { PropType } from "vue";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import { ref, onMounted, onUnmounted, reactive } from "vue";
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


const changeLanguage = (langCode: string, url: string): void => {
  currentLanguage.value = langCode;
  const newLang = props.menuWidget.languageSelection.find(
    (lang: { code: string }) => lang.code === langCode
  );
  if (newLang) {
    langSelection.value = newLang;
  }
  url = url.replace("https://new-hungary-vignette.voxpay.hu", "");
  url = url.replace("https://www.hungary-vignette.eu", "");
  if (url.startsWith("https")) {
    navigateTo(url, { external: true });
  } else {
    navigateTo(url);
  }
};

const { currentLanguage } = useWidgets();
const langSelection = ref<LanguageSelectionItem>();


console.log(currentLanguage.value);

const isActive = (url: string): boolean => route.path === url;

const toggleMobileMenu = (): void => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMobileMenu = (): void => {
  isMobileMenuOpen.value = false;
};

// Initialize langSelection based on the current language in the URL
const langCode = route.params.lang || "en"; // Default to 'en' if no language code is provided
const language = props.menuWidget.languageSelection.find(
  (lang: { code: string | string[] }) => lang.code === langCode
);
langSelection.value = language || props.menuWidget.languageSelection[0]; // Default to the first language if the specified language is not found
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
