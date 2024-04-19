<template>
  <main v-if="widgetsData" class="container mx-auto px-4 lg:px-0 pt-6 content-static">
    <div v-for="widget in widgetsData" :key="widget.widgetId">
      <div v-html="widget.content"></div>
    </div>
  </main>
  <div v-else-if="widgetsError">Error loading widget content.</div>
  <div v-else>Loading widget content...</div>
</template>
<script setup lang="ts">
import { useAsyncData, useRoute } from "nuxt/app";
import { computed, ref } from "vue";

interface Widget {
  widgetId: string;
  content: string;
}

interface ApiResponse {
  value: {
    widgets: Widget[];
  };
}

const route = useRoute();

const lang = computed(() => route.params.lang as string);
const pageUri = computed(() => route.params.slug as string);
const apiEndpoint = "https://test-core.voxpay.hu/CMS.Public.Gateway/api/GetWidgetsByPageUri";

// minden widget
const { data: widgetsData, error: widgetsError } = useAsyncData<Array<Widget>>(
  `widgetsData-${lang.value}-${pageUri.value}`,
  async () => {
    const url = `${apiEndpoint}?PageUri=%2F${pageUri.value}&Localization=${lang.value}`;
    const response = await $fetch<ApiResponse>(url);
      
    console.log(response);

    return response ? response.value.widgets : [];
  }
);


if (widgetsError.value) {
  console.error("Error fetching widgets data:", widgetsError.value);
}

//ID
const getWidgetContentById = (widgetId: string) => {
  return widgetsData.value?.find(widget => widget.widgetId === widgetId)?.content ?? 'Widget content not found.';
}
</script>