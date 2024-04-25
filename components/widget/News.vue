<template>
  <section v-if="newsWidget" class="my-16">
    <h2>{{ newsWidget.content.topNews.mainTitle }}</h2>
    <div
      class="grid sm:grid-cols-2 md:grid-cols-3 content-center gap-8 xl:gap-10"
    >
      <div
        v-for="item in topNewsContent?.topNews.items"
        :key="item.id"
        class="shadow-md drop-shadow-md hover:shadow-none transition-shadow text-white h-full px-4 py-2 rounded-md"
      >
        <div class="mb-4 h-full flex flex-col justify-around">
          <img
            v-if="item.src"
            :src="item.src"
            :alt="item.alt"
            class="w-full object-cover mt-5 max-h-52 rounded-[5px]"
          />
          <div>
            <NuxtLink
              :to="item.url"
              class="text-title-black hover:text-secondary-orange"
            >
              <h3 v-if="item.title" class="text-sm mb-4 font-semibold mt-6">
                {{ item.title }}
              </h3>
            </NuxtLink>
            <div
              v-if="item.desc"
              v-html="item.desc"
              class="text-desc-gray text-sm text-ellipsis line-clamp-5"
            ></div>
            <NuxtLink
              v-if="item.buttonText"
              :to="item.url"
              class="btn primary-btn-outline mt-5 stretched-link"
              :title="item.buttonTitle"
            >
              {{ item.buttonText }}
              <img
                v-if="item.buttonIconSrc"
                class="pl-2 news-img"
                :src="item.buttonIconSrc"
                :alt="item.buttonTitle"
              />
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import type { NewsWidget, TopNewsContent } from '~/types/types';

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

/* onMounted(() => {
  console.log("Widgets Loaded:", props.newsWidget.content);

  console.log("widget: " + props.topNewsContent);
}); */

</script>
