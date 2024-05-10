<template>
    <main class="container mx-auto px-4 lg:px-0 mt-48 under-payment">
        <div v-if="purchaseData.value.purchaseStatus === 'VignetteOrdered'">
            <ConfirmPageSuccessful :purchaseData="purchaseData"></ConfirmPageSuccessful>
        </div>
        <div v-if="purchaseData.value.purchaseStatus === 'VignetteOrderFailed' || purchaseData.value.purchaseStatus === 'PaymentFailed'">
            <ConfirmPageFailed :purchaseData="purchaseData"></ConfirmPageFailed>
        </div>
        <div v-if="purchaseData.value.purchaseStatus === 'UnderPayment'">
            <ConfirmPageUnderPayment :purchaseData="purchaseData"></ConfirmPageUnderPayment>
        </div>


      <template v-for="widget in widgets" :key="widget.widgetId">
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
  import { ref, computed } from "vue";
  import { useRoute } from "nuxt/app";
  import Card from "primevue/card";
    import type { GetPurchaseResponse } from "~/types/types";
import ConfirmPageSuccessful from "~/components/widget/ConfirmPageSuccessful.vue";
import ConfirmPageFailed from "~/components/widget/ConfirmPageFailed.vue";
import ConfirmPageUnderPayment from "~/components/widget/ConfirmPageUnderPayment.vue";
  
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
  
  const pageUri = computed(() => {
    const slug = (route.params.slug as string) || "";
    return `${encodeURIComponent(slug)}`;
  });
  
  const apiEndpoint =
    "https://test-core.voxpay.hu/CMS.Public.Gateway/api/GetWidgetsByPageUri";
  const url = `${apiEndpoint}?PageUri=%2F${pageUri.value.replaceAll(
    "%2C",
    "%2F"
  )}&Localization=${currentLanguage.value}`;
  
  const response = await $fetch<ApiResponse>(url);
  
  useHead({ title: response.value.title });
  
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


  
/// ----------------- LOAD ORDER -----------------------

console.log(route.params.trid);

const commmonApiEndpoint = "https://test-gw.voxpay.hu/Webshop.Vignette/GetPurchase";

var purchaseData = await $fetch<GetPurchaseResponse>(`${commmonApiEndpoint}?Trid=${route.params.trid}`);

console.log(purchaseData);

/// ----------------- /LOAD ORDER -----------------------


  </script>
  