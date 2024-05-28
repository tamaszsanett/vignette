<template>
  <main :class="['container mx-auto px-4 lg:px-0 pt-6 mt-24', pageClass]">
    <template v-for="widget in widgets" :key="widget.widgetId">
      <div v-if="widget.widgetType === 'html'" class="my-4">
        <div v-html="widget.content"></div>
      </div>
      <div v-if="widget.widgetType === 'vignetteaccordionwidget'">
        <WidgetVignetteAccordion :widget="widget.content" />
      </div>
      <div v-if="widget.widgetType === 'vignettepurchaseflowwidget'">
        <WidgetPurchaseFlow :widget="widget.content" />
      </div>
      <div v-if="widget.widgetType === 'faqwidget'">
        <WidgetFaq :widget="widget.content" :show-search="showSearch" />
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
const currentLanguage = ref("en");
watch(
  () => route.params.lang,
  (newLang) => {
    currentLanguage.value = Array.isArray(newLang)
      ? newLang[0]
      : newLang || "en";
  },
  { immediate: true }
);

const showSearch = computed(() => {
  return !!route.params.slug;
});

// import useMeta from Composition API

const pageUri = computed(() => {
  const slug = (route.params.slug as string) || "";
  return `${encodeURIComponent(slug)}`;
});

const parts = ref(route.params.slug || []);

const isHomePage = computed(() => {
  return (
    route.fullPath === `/${currentLanguage.value}` ||
    route.fullPath === `/${currentLanguage.value}/`
  );
});

const pageClass = computed(() => {
  if (isHomePage.value) {
    return `${currentLanguage.value}-is-home-page`;
  } else {
    if (parts.value[0] === "news" && parts.value.length === 1) {
      return `${currentLanguage.value}-is-news-page`;
    } else if (parts.value.length > 1) {
      return `${currentLanguage.value}-is-news global-is-news`;
    } else {
      return `${currentLanguage.value}-${parts.value[0]}-class`;
    }
  }
});

const apiEndpoint =
  "https://test-core.voxpay.hu/CMS.Public.Gateway/api/GetWidgetsByPageUri";
const url = `${apiEndpoint}?PageUri=%2F${pageUri.value.replaceAll(
  "%2C",
  "%2F"
)}&Localization=${currentLanguage.value}`;

const response = await $fetch<ApiResponse>(url);
useSeoMeta({
  title: response.value.title,
  ogTitle: response.value.title,
  description: response.value.metaDescription,
  ogDescription: response.value.metaDescription,
});

useHead({
  htmlAttrs: {
    lang: currentLanguage,
  },
  meta: [
    {
      name: "language",
      content: currentLanguage,
    },
  ],
  link: [
    { rel: "canonical", href: response.value.alternateLinks.en },
    {
      rel: "alternate",
      href: response.value.alternateLinks.en,
      hreflang: "en",
    },
    {
      rel: "alternate",
      href: response.value.alternateLinks.de,
      hreflang: "de-DE",
    },
    {
      rel: "alternate",
      href: response.value.alternateLinks.ro,
      hreflang: "ro-RO",
    },
    {
      rel: "alternate",
      href: response.value.alternateLinks.sk,
      hreflang: "sk-SK",
    },
  ],
});

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
