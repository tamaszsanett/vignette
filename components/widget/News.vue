<template>
  <section v-if="topNewsItems" class="my-16 lg:my-28">
    <h2 v-if="mainTitle">{{ mainTitle }}</h2>
    <div
      class="grid sm:grid-cols-2 md:grid-cols-3 content-center gap-8 xl:gap-10"
    >
      <div
        v-for="item in topNewsItems"
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
                class="pl-2 read-img"
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
import { computed } from "vue";
import { useAsyncData } from "nuxt/app";

interface TopNewsItem {
  id: string;
  src?: string;
  alt?: string;
  title: string;
  desc: string;
  buttonText?: string;
  buttonIconSrc?: string;
  url: string;
}

interface TopNews {
  mainTitle: string;
  items: TopNewsItem[]
}

interface ApiResponse {
  value: {
    widgets: {
      widgetId: string;
      widgetType: string;
      content: string;
    }[];
  };
}

const api =
  "https://test-core.voxpay.hu/CMS.Public.Gateway/api/GetWidgetsByPageUri";
const pageUri = "%2F&";
const lang = "en";
const targetWidgetId = "e4dea5f4-63cd-444a-890a-b1cff3523599";
const uniqueKey = `topNewsItemsData-${targetWidgetId}`;

const { data: topNewsData } = useAsyncData<TopNews | null>(
  uniqueKey,
  async () => {
    try {
      const url = `${api}?PageUri=${pageUri}Localization=${lang}`;
      const response = await $fetch<ApiResponse>(url);
      const widget = response.value.widgets.find(
        (widget) => widget.widgetId === targetWidgetId
      );

      if (!widget) {
        console.log("Widget not found");
        return null;
      }

      // parse the content string into an object
      const parsedContent = JSON.parse(widget.content);
      return {
        mainTitle: parsedContent.topNews.mainTitle,
        items: parsedContent.topNews.items
      };

    } catch (error) {
      console.error("API fetch error:", error);
      return null;
    }
  }
);

const topNewsItems = computed(() => topNewsData.value?.items || []);
const mainTitle = computed(() => topNewsData.value?.mainTitle || '');
</script>
