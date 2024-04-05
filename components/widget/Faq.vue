<template>
  <AccordionComponent
    :content="accordionContent.content"
    :mainTitle="accordionContent.mainTitle"
    :mainIconSrc="accordionContent.mainIconSrc"
    :mainIconAlt="accordionContent.mainIconAlt"
    containerClass="max-w-[888px] mx-auto w-full"
    titleClass="gray-grad-bg"
    descClass="text-faq-title-gray"
    iconClass="orange-arrow"
  ></AccordionComponent>
</template>

<script setup lang="ts">
import { useAsyncData } from "nuxt/app";
import { computed } from "vue";

interface AccordionItem {
  title: string;
  desc: string;
}

interface AccordionContent {
  mainIconSrc: string;
  mainIconAlt: string;
  content: AccordionItem[];
}

interface ApiResponse {
  value: {
    widgets: AccordionContent[];
  };
}

const api = "https://test-core.voxpay.hu/CMS.Public.Gateway/api/GetWidgetsByPageUri";
const pageUri = "%2F&";
const lang = "en";
const targetWidgetId = "33068e0f-cdf0-4911-b0b1-d9dd5139f13f";

// UseAsyncData reactive update
const { data: accordionData } = useAsyncData<AccordionContent | null>(
  `accordionContent-${targetWidgetId}`,
  async () => {
    try {
      const url = `${api}?PageUri=${pageUri}&Localization=${lang}`;
      const response = await $fetch<ApiResponse>(url);
      // our widget 
      const widget = response.value.widgets.find(
        widget => widget.widgetId === targetWidgetId
      );

      if (!widget) {
        console.log("Widget not found");
        return null;
      }

      // 'content' record JSON string parse
      const parsedContent = JSON.parse(widget.content);

      console.log(parsedContent);

      // return a parse content
      return {
        mainIconSrc: parsedContent.items[0].iconSrc,
        mainIconAlt: parsedContent.items[0].iconAlt,
        content: parsedContent.items.map(item => ({
          title: item.title,
          desc: item.desc
        })),
        mainTitle: parsedContent.mainTitle
      };
    } catch (error) {
      console.error('API fetch error:', error);
      return null;
    }
  }
);

const accordionContent = computed(() => accordionData.value ? accordionData.value : {});
</script>
