<template>
    <section v-if="widgetContent" class="widget">
      <div :id="targetWidgetId" class="widget-content" v-html="widgetContent"></div>
    </section>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, watchEffect } from 'vue';
  import { useAsyncData } from "nuxt/app";
  
  interface Widget {
    widgetId: string;
    content: string;
  }
  
  interface ApiResponse {
    value: {
      widgets: Widget[];
    };
  }
  
  const api = "https://test-core.voxpay.hu/CMS.Public.Gateway/api/GetWidgetsByPageUri";
  const pageUri = "%2F&";
  const lang = "en";
  const targetWidgetId = "059e35a3-f03c-46e9-9e3c-f14150faf9d3";
  const uniqueKey = `widgetContent-${targetWidgetId}`;

// UseAsyncData reactive update
const { data: widgetData } = useAsyncData(
  uniqueKey,
  async () => {
    const url = `${api}?PageUri=${pageUri}Localization=${lang}`;

    //`$fetch` explicitly type
    const response = await $fetch<ApiResponse>(url);
    const widget = response.value.widgets.find(
      (widget) => widget.widgetId === targetWidgetId
    );
    return widget ? widget.content : null;
  }
);

const widgetContent = computed(() => widgetData.value);

  </script>
  