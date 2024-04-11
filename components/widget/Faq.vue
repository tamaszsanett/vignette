<template>
  <div v-if="accordionContent" class="widget">
    <AccordionComponent
      :mainTitle="accordionContent.mainTitle"
      :mainIconSrc="accordionContent.mainIconSrc"
      :mainIconAlt="accordionContent.mainIconAlt"
      :content="accordionContent.content"
      containerClass="max-w-[888px] mx-auto w-full"
      titleClass="gray-grad-bg"
      descClass="text-faq-title-gray"
      iconClass="orange-arrow"
    ></AccordionComponent>
  </div>
</template>

<script setup lang="ts">
import { useAsyncData } from "nuxt/app";
import { computed } from "vue";

interface AccordionItem {
  title: string;
  desc: string;
}

interface AccordionContent {
  mainIconSrc?: string;
  mainIconAlt?: string;
  mainTitle?: string;
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
const targetWidgetId = "33068e0f-cdf0-4911-b0b1-d9dd5139f13f";
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

      const parsedWidgetContent = JSON.parse(widget.content);

      return {
        mainIconSrc: parsedWidgetContent.mainIconSrc,
        mainIconAlt: parsedWidgetContent.mainIconAlt,
        mainTitle: parsedWidgetContent.mainTitle,
        content: parsedWidgetContent.items.map((item: AccordionItem) => ({
          title: item.title,
          desc: item.desc,
        })),
      };
    } catch (error) {
      console.error("API fetch error:", error);
      return null;
    }
  }
);

const accordionContent = computed(() => accordionData.value);
</script>
