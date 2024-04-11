<template>
  <header v-if="menuWidget" class="w-full z-40 top-0 bg-base-black">
    <nav
      class="container mx-auto flex justify-between items-center p-4 text-white menu-wrapper"
    >
      <div class="flex justify-start items-center">
        <a href="/">
          <img
            :src="`${menuWidget.logo.src}`"
            :alt="menuWidget.logo.alt"
            class="w-28 h-10 sm:w-[196px] sm:h-[69px] md:w-28 md:h-10 xl:w-[196px] xl:h-[69px]"
          />
        </a>
        <div class="hidden md:flex space-x-4 ml-5">
          <a
            v-for="item in menuWidget.menu"
            :href="item.url"
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
        <Button @click="visible = true" class="btn-sm btn lang-btn">
          <span>{{ currentLanguage.title }}</span>
          <img :src="currentLanguage.src" alt="Language" class="ml-2" />
        </Button>
        <!--   <transition name="drop-down">
          <Button v-if="isLanguageDropdownOpen" label="show" @click="visible = true" class="lang-switcher mt-5">
          </Button>
        </transition> -->
      </div>
      <button type="button" class="md:hidden p-4" @click="toggleMobileMenu">
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
            <button class="self-end" @click="toggleMobileMenu">
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
              :href="item.url"
              :key="item.url"
              :class="{ 'active-link': isActive(item.url) }"
              class="block py-2 hover:text-gray-300"
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
        <template #header>
          <div class="inline-flex items-center gap-2 pb-2 border-b w-full">
            <img :src="currentLanguage.src" />
            <span class="font-bold whitespace-nowrap">{{
              currentLanguage.title
            }}</span>
          </div>
        </template>
        <div class="grid grid-cols-2 justify-between gap-2">
          <a
            v-for="lang in menuWidget.languageSelection"
            :href="lang.url"
            :key="lang.title"
            class="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-[4px] flex items-center gap-1"
          >
            <span>{{ lang.title }}</span>
            <img
              :src="`${lang.imgSrc}`"
              :alt="lang.alt"
              class="inline-block ml-2 w-5 h-5"
            />
          </a>
        </div>
        <template #footer>
          <div class="border-t pt-5 w-full">
            <Button
              class="btn primary-btn btn-sm mx-auto"
              label="Bezárás"
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
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useAsyncData } from "nuxt/app";

interface MenuLogo {
  src: string;
  alt: string;
  title: string;
}

interface MenuItem {
  title: string;
  url: string;
}

interface LanguageSelectionItem {
  title: string;
  url: string;
  imgSrc: string;
  alt: string;
}

interface MenuWidgetContent {
  siteUrl: string;
  logo: MenuLogo;
  menu: MenuItem[];
  langArrowSrc: string;
  languageSelection: LanguageSelectionItem[];
}

interface MenuWidget {
  widgetId: string;
  widgetType: string;
  content: string;
}

interface ApiResponse {
  value: {
    widgets: MenuWidget[];
  };
}

const api =
  "https://test-core.voxpay.hu/CMS.Public.Gateway/api/GetWidgetsByPageUri";
const pageUri = "%2F&";
const lang = "en";
const targetWidgetId = "2112036c-bbf0-4d3f-bb77-24dbffed8b37";
const uniqueKey = `menuWidget-${targetWidgetId}`;

// UseAsyncData reactive update
const { data: menuWidgetData, error: menuWidgetError } =
  useAsyncData<MenuWidgetContent | null>(uniqueKey, async () => {
    try {
      const response = await fetch(
        `${api}?PageUri=${pageUri}Localization=${lang}`
      );
      if (!response.ok) {
        throw new Error("Server response error");
      }

      const jsonResponse: ApiResponse = await response.json();
      const widget = jsonResponse.value.widgets.find(
        (widget) => widget.widgetId === targetWidgetId
      );

      //console.log(widget);

      if (!widget) {
        throw new Error("Widget not found");
      }

      const parsedContent = JSON.parse(widget.content);
      return parsedContent;

    } catch (error) {
      console.error("Error fetching menu widget:", error);
      return null;
    }
  });

const isMobileMenuOpen = ref(false);
const visible = ref(false);
const route = useRoute();

// `currentLanguage` and `isActive` logic with default values and implementation
const currentLanguage = ref({
  title: "English",
  src: "https://www.autopalyamatrica.hu/Content/Flag_of_the_United_Kingdom.svg",
  alt: "English",
});

const isActive = (url: string) => {
  return route.path === url;
};

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const menuWidget = computed(() => menuWidgetData.value);

if (menuWidgetError.value) {
  console.error(
    "Error occurred while fetching the menu widget:",
    menuWidgetError.value
  );
}
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
