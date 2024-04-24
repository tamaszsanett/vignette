<template>
  <main class="container mx-auto px-4 lg:px-0 pt-6 mt-24">
    <template v-for="widget in widgets" :key="widget.widgetId">
      <div v-if="widget.widgetType === 'html'" class="my-4">
        <div v-html="widget.content"></div>
      </div>
      <div v-if="widget.widgetType === 'vignetteaccordionwidget'">
        <WidgetVignetteAccordion :widget-data="widget.content" />
      </div>
      <div v-if="widget.widgetType === 'vignettepurchaseflowwidget'">
        <WidgetPurchaseFlow :widget-data="widget.content" />
      </div>
      <div v-if="widget.widgetType === 'faqwidget'">
        <WidgetFaq :widget-data="widget.content" />
      </div>
      <div v-if="widget.widgetType === 'vignettenewswidget'">
        <WidgetNews :widget-data="widget.content" />
      </div>
      <div v-if="widget.widgetType === 'footerwidget'">
        <SharedFooterWidget
          :footer-widget="widget" :footer-widget-content="widget.content"
          :class="{ 'bottom-section': widget.section === 'main', 'hidden': widget.section !== 'main' }"
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

<script setup>
import { useWidgets } from "~/composables/useWidgets";
const { widgets, error, isLoading } = useWidgets();
console.log(widgets);
if (error.value) {
  console.error("Error loading widgets:", error.value);
}
</script>
