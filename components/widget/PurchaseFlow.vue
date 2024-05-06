<template>
  <section v-if="items.length">
    <h2 v-if="mainTitle" class="h2 mb-0 text-center">{{ mainTitle }}</h2>
    <div class="w-full">
      <div class="w-full">
        <section
          class="w-full mb-5 flex flex-wrap justify-center gap-8 md:gap-y-24 md:gap-x-8 lg:gap-x-24 2xl:gap-x-52 relative"
        >
          <img
            :src="mainSvgSrc"
            class="absolute md:top-[12.5rem] lg:top-[10.5rem] 2xl:top-52 h-auto max-w-[1090px] hidden md:block w-[85%] xl:w-[90%] 2xl:w-full"
            :alt="mainSvgAlt"
          />

          <div class="flow-card">
            <img :src="items[0].stepIcon" :alt="items[0].stepIconAlt" />
            <p class="flow-card-body">{{ items[0].description }}</p>
          </div>
          <div class="flow-card md:-order-1 md:w-[40%] md:flex-col-reverse relative md:left-[3.5rem] lg:left-[6.5rem] xl:left-[5.5rem] 2xl:left-[7rem] md:top-12">
            <img :src="items[1].stepIcon" :alt="items[1].stepIconAlt" />
            <p class="flow-card-body">{{ items[1].description }}</p>
          </div>
          <div class="flow-card">
            <img :src="items[2].stepIcon" :alt="items[2].stepIconAlt" />
            <p class="flow-card-body">{{ items[2].description }}</p>
          </div>
          <div class="flow-card md:-order-1 md:w-[40%] md:flex-col-reverse relative md:right-[3.5rem] lg:right-[6.5rem] xl:right-[5.5rem] 2xl:right-[7rem] md:top-12">
            <img :src="items[3].stepIcon" :alt="items[3].stepIconAlt" />
            <p class="flow-card-body">{{ items[3].description }}</p>
          </div>
          <div class="flow-card">
            <img :src="items[4].stepIcon" :alt="items[4].stepIconAlt" />
            <p class="flow-card-body">{{ items[4].description }}</p>
          </div>
        </section>
      </div>
      <NuxtLink
        :to="{path: '/', hash: '#' + buttonUrl}"
        class="btn primary-btn w-fit mx-auto"
        :title="buttonText"
      >
        <span>{{ buttonText }}</span>
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useAsyncData } from "nuxt/app";

interface Step {
  stepIcon: string;
  stepIconAlt: string;
  description: string;
}

interface FlowContent {
  mainTitle: string;
  mainSvgSrc: string;
  mainSvgAlt: string;
  buttonText: string;
  buttonUrl: string;
  items: Step[];
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
const targetWidgetId = "f5ac56f0-d668-4b2e-bf2e-df88237a2edf";
const uniqueKey = `data-${targetWidgetId}`;

const { data: flowData } = useAsyncData<FlowContent | null>(
  uniqueKey,
  async (): Promise<FlowContent | null> => {
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

      const parsedContent = JSON.parse(widget.content);
      
      return {
        mainTitle: parsedContent.mainTitle,
        mainSvgSrc: parsedContent.mainSvgSrc,
        mainSvgAlt: parsedContent.mainSvgAlt,
        buttonText: parsedContent.buttonText,
        buttonUrl: parsedContent.buttonUrl,
        items: parsedContent.steps,
      } as FlowContent;
    } catch (error) {
      console.error("API fetch error:", error);
      return null;
    }
  }
);

const items = computed(() => flowData.value?.items || []);
const mainTitle = computed(() => flowData.value?.mainTitle || "");
const mainSvgSrc = computed(() => flowData.value?.mainSvgSrc || "");
const mainSvgAlt = computed(() => flowData.value?.mainSvgAlt || "");
const buttonText = computed(() => flowData.value?.buttonText || "");
const buttonUrl = computed(() => flowData.value?.buttonUrl || "");
</script>
