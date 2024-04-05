<template>
  <section class="widget">
    <div
      class="widget-content"
      :id="targetWidgetId"
      v-html="widgetContent"
    ></div>
  </section>
</template>

<script setup lang="ts">
import { useAsyncData } from "nuxt/app";
import { computed } from "vue";

interface Widget {
  widgetId: string;
  content: string; 
}

interface ApiResponse {
  value: {
    widgets: Widget[];
  };
}

const api =
  "https://test-core.voxpay.hu/CMS.Public.Gateway/api/GetWidgetsByPageUri";
const pageUri = "%2F&";
const lang = "en";
const targetWidgetId = "9ba6a26f-1e9f-4709-8a1e-508175074b51";

// UseAsyncData reactive update
const { data: widgetData } = useAsyncData(
  `widgetContent-${targetWidgetId}`,
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
