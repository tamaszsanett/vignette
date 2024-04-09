<template>
    <main class="container mx-auto px-4 lg:px-0 pt-6 content-static">
      <article v-if="widgetData">
        <div
          :id="targetWidgetId"
          class="widget-content"
          v-html="widgetContent"
        ></div>
      </article>
      <p v-else>Loading...</p>
    </main>
</template>
<script setup lang="ts">
import { useAsyncData, useRoute } from "nuxt/app";
import { computed } from "vue";

const route = useRoute();

// url lang
const lang = computed(() => route.params.lang || "en");
const apiEndpoint = "https://test-core.voxpay.hu/CMS.Public.Gateway/api/GetWidgetsByPageUri";

// A pageUri most dinamikusan változik a nyelvtől függően
const pageUri = computed(() => lang.value === "hu" ? "%2F___&" : "%2Ftransfer-of-highway-vignette&");
const targetWidgetId = "07c72ea4-b135-4ca7-9108-8dc4c327e464";
const uniqueKey = `pageData-${targetWidgetId}-${lang.value}`;

interface Widget {
  widgetId: string;
  content: string;
}

interface ApiResponse {
  value: {
    widgets: Widget[];
  };
}

const { data: widgetData, error: widgetError } = useAsyncData(
  uniqueKey,
  async () => {
    const url = `${apiEndpoint}?PageUri=${pageUri.value}Localization=${lang.value}`;
    const response = await $fetch<ApiResponse>(url);
  
    const widget = response.value.widgets.find(widget => widget.widgetId === targetWidgetId);
   
    console.log(widgetData)

    return widget ? widget.content : null;
  }

);

if (widgetError.value) {
  console.error("Error fetching widget data:", widgetError.value);
}

const widgetContent = computed(() => widgetData.value);

</script>

