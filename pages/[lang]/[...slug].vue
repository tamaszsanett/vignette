<template>
  <main class="container mx-auto px-4 lg:px-0 pt-6 mt-24">
    <template v-for="widget in widgets" :key="widget.widgetId">
      <div v-if="widget.widgetType === 'html'" class="my-4">
        <div v-html="widget.content"></div>
      </div>
      <div v-if="widget.widgetType === 'vignetteaccordionwidget'">
        <WidgetVignetteAccordion :widget="widget.content" />
      </div>
      <div v-if="widget.widgetType === 'vignettepurchaseflowwidget'">
        <WidgetPurchaseFlow :widget-data="widget.content" />
      </div>
      <div v-if="widget.widgetType === 'faqwidget'">
        <WidgetFaq :widget="widget.content" />
      </div>
      <div v-if="widget.widgetType === 'vignettenewswidget'">
        <WidgetNews :news-widget="widget" :top-news-content="widget.content" />
      </div>
      <div v-if="widget.widgetType === 'purchasepricewidget'">
        <WidgetPurchasePrice :widget="widget.content" />
      </div>
      <div v-if="widget.widgetType === 'footerwidget'">
        <SharedFooterWidget
          :footer-widget="widget"
          :footer-widget-content="widget.content"
          :class="{
            'bottom-section': widget.section === 'main',
            hidden: widget.section !== 'main',
          }"
        />
      </div>
      <div
        v-if="widget.widgetType === 'menuwidget'"
        :class="{ 'top-menu': widget.section === 'top' }"
      >
        <SharedMenuWidget :menu-widget="widget.content" />
      </div>
    </template>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useAsyncData, useRoute } from "nuxt/app";

  const route = useRoute();
  const currentLanguage = ref('en');
  watch(() => route.params.lang, (newLang) => {
    currentLanguage.value = Array.isArray(newLang) ? newLang[0] : newLang || 'en';
  }, { immediate: true });

  const pageUri = computed(() => {
    const slug = (route.params.slug as string) || "";
    return `${encodeURIComponent(slug)}`;
  });

  const apiEndpoint = "https://test-core.voxpay.hu/CMS.Public.Gateway/api/GetWidgetsByPageUri";
  const url = `${apiEndpoint}?PageUri=%2F${pageUri.value.replaceAll("%2C", "%2F")}&Localization=${currentLanguage.value}`;

  const response = (await $fetch<ApiResponse>(url));
  useSeoMeta({
    title: response.value.title,
    ogTitle: response.value.title,
    description: response.value.metaDescription,
    ogDescription: response.value.metaDescription,
  })


  const widgets = response.value.widgets.map((widget) => {
          if (widget.widgetType === "html") {
            return widget;
          } else {
            return {
              ...widget,
              content: JSON.parse(widget.content),
            };
          }
        });

</script>