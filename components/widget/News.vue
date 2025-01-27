<template>
  <section v-if="newsWidget" class="my-8">
    <h1 v-if="newsWidget.content.topNews.pageTitle" class="text-center">
      {{ newsWidget.content.topNews.pageTitle }}
    </h1>
    <h2 v-if="newsWidget.content.topNews.mainTitle" class="text-center">
      {{ newsWidget.content.topNews.mainTitle }}
    </h2>
    <div
      class="grid sm:grid-cols-2 md:grid-cols-3 content-center gap-8 xl:gap-10"
    >
      <div
        v-for="item in topNewsContent?.topNews.items"
        :key="item.id"
        class="news-item"
      >
        <div class="mb-4 flex flex-col justify-around">
          <NuxtLink :to="item.url" :title="item.title" :alt="item.title">
            <img
              v-if="item.src"
              :src="item.src"
              :alt="item.title"
              class="w-full object-cover mt-5 max-h-52 rounded-[5px] aspect-video max-w-full"
            />
          </NuxtLink>

          <div class="">
            <NuxtLink
              :to="item.url"
              class="black hover:text-secondary-black"
              :title="item.title"
            >
              <h3
                v-if="item.title"
                class="news-title"
              >
                {{ item.title }}
              </h3>
            </NuxtLink>
            <div
              v-if="item.desc"
              v-html="item.desc"
              class="text-desc-gray text-sm text-ellipsis line-clamp-5 news-lead"
            ></div>
            <button
              @click="navigateTo(item.url, { external: true })"
              :to="item.url"
              class="btn primary-btn-outline mt-5 read-more-link"
              :title="item.title"
            >
              {{ t('news_page.read_more_text') }}
              <img
                class="pl-2 news-img"
                src="/assets/Content/new-site-content/arrowcircleup_icon.svg"
                :alt="item.title"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
const route = useRoute();
const router = useRouter();
import { useRoute } from "nuxt/app";
const { t, locale } = useI18n();
const currentLanguage = ref(locale);

watch(
  () => route.params.lang,
  (newLang) => {
    currentLanguage.value = Array.isArray(newLang)
      ? newLang[0]
      : newLang || "en";
  },
  { immediate: true }
);

import type { NewsWidget, TopNewsContent } from "~/types/types";

const props = defineProps({
  newsWidget: {
    type: Object as PropType<NewsWidget>,
    required: true,
  },
  topNewsContent: {
    type: Object as PropType<TopNewsContent>,
    required: true,
  },
});

const getImageSrc = (relativePath: string | URL) => {
  if (process.server) {
    return relativePath;
  }
  return new URL(relativePath, window.location.origin).href;
};



</script>
