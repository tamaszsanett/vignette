<template>
  <div v-if="accordionContent" class="widget" id="topVignette">
    <AccordionComponent
      :content="accordionContent.content"
      containerClass="max-w-[1100px] mx-auto w-full"
      titleClass="bg-green-grad"
      descClass="text-white text-sm md:text-lg font-medium"
      iconClass="green-arrow"
      gridContentClass="grid sm:grid-cols-2 gap-2 sm:gap-4"
    ></AccordionComponent>
  </div>
</template>

<script setup lang="ts">
import { useAsyncData } from "nuxt/app";
import { computed } from "vue";

interface Button {
  title: string;
  iconSrc: string;
  iconAlt: string;
  url: string;
}

interface AccordionItem {
  preTitle?: string;
  secondaryIconSrc?: string;
  secondaryIconAlt?: string;
  title: string;
  desc?: string;
  buttons: Button[];
}

interface AccordionContent {
  content: AccordionItem[];
}

interface ApiResponse {
  value: {
    widgets: Array<{
      widgetId: string;
      content: string; 
    }>;
  };
}

const api = "https://test-core.voxpay.hu/CMS.Public.Gateway/api/GetWidgetsByPageUri";
const pageUri = "%2F&";
const lang = "en";
const targetWidgetId = "97ac617f-14c6-4e3a-8ae9-075ddf1f853c";
const uniqueKey = `accordionContent-${targetWidgetId}`;

// UseAsyncData reactive update
const { data: accordionData } = useAsyncData<AccordionContent | null>(
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

      const parsedContent = JSON.parse(widget.content);

      const vignetteTypes = parsedContent.vignetteTypes.map((item: AccordionItem) => ({
        preTitle: item.preTitle,
        secondaryIconSrc: item.secondaryIconSrc,
        secondaryIconAlt: item.secondaryIconAlt,
        title: item.title,
        buttons: item.buttons,
      }));

      return {
        content: vignetteTypes,
      };
    } catch (error) {
      console.error("API fetch error:", error);
      return null;
    }
  }
);

const accordionContent = computed(() => accordionData.value);
</script>