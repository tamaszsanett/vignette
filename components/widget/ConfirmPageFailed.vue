<template>
  <main class="container mx-auto px-4 lg:px-0 mt-48 under-payment">
    <form class="pb-10 max-w-[600px] mx-auto">
      <h1 class="purchase-h1">
        <span class="ml-2">Vignette purchase failed!</span>
      </h1>
      <div class="w-full md:max-w-[600px] mx-auto flex flex-col gap-2">
        <Card class="mb-5 shadow-lg">
          <template #content>
            <div class="payment-progress">
              <div class="w-full clear-both">
                <p class="error-message">
                  #1048: Purchase Failed: Canceled payment.
                </p>
              </div>
              <div class="clear-both">
                <p>
                  In the case of online bank card purchases, due to the strong
                  customer authentication introduced on January 1st, the rate of
                  unsuccessful payments increased in the initial period.
                </p>
                <section
                  class="w-full flex items-center flex-wrap justify-center gap-4"
                >
                  <NuxtLink
                    id="refreshbutton"
                    to="/vignette/D1/1month/type?backtrid="
                    class="btn-green"
                    type="submit"
                  >
                    <span>Reorder</span>
                  </NuxtLink>
                </section>
              </div>
            </div>
          </template>
        </Card>
        <Card class="mb-5 shadow-lg">
          <template #content>
            <div class="payment-progress">
              <div class="w-full clear-both">
                <div class="control-label float-left px-2">
                  Transaction identifier
                </div>
                <div class="float-left">
                  <p class="form-control-static">5534893208627661</p>
                </div>
                <div class="control-label float-left px-2">E-mail</div>
                <div class="float-left px-2">
                  <p class="form-control-static">zsanett.tamas87@gmail.com</p>
                </div>
              </div>
              <div class="design-table w-full clear-both pt-[2px]">
                <table
                  class="table table-condensed table-hover payment-progress-table"
                >
                  <tbody>
                    <tr>
                      <td><strong>License plate number</strong></td>
                      <td><strong>Validity period</strong></td>
                      <td><strong>Vignette number</strong></td>
                    </tr>
                    <tr class="failed-order">
                      <td>ABC123 &nbsp;&nbsp; ( RO )</td>
                      <td>2024.05.06. - 2024.06.06.</td>
                      <td class="text-info">
                        D1 - 1 month<br />
                        <strong class="uppercase">Unsuccessful</strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="clear-both">
                <p>
                  If you think that your payment was successful, but the sticker
                  validation failed, please contact us!
                </p>
                <section
                  class="flex items-center flex-wrap justify-center gap-4 my-5"
                >
                  <NuxtLink
                    id="refreshbutton"
                    to="/vignette/D1/1month/type?backtrid="
                    class="btn-green"
                    type="submit"
                  >
                    <span>Refresh</span>
                  </NuxtLink>
                </section>
                <p class="text-danger">
                  IMPORTANT: The fact that the financial performance has been
                  fulfilled does not automatically mean that you are entitled to
                  use the track! You can only drive onto the highway if you have
                  a successful vignette after paying received confirmation of
                  validation by e-mail, or in your browser.
                </p>
                <p>
                  <strong>Payment by bank card</strong> will take only a few
                  minutes.
                </p>
                <address class="mt-5">
                  Customer Service:<br />
                  Phone: (36-1) 225-7603<br />
                  E-mail:
                  <a class="base-link" href="mailto:support@hungary-vignette.eu"
                    >support@hungary-vignette.eu</a
                  >
                </address>
              </div>
            </div>
          </template>
        </Card>
      </div>
    </form>
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
import { ref, computed, onMounted } from "vue";
import { useAsyncData, useRoute, useSeoMeta } from "nuxt/app";
import Card from "primevue/card";

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

useSeoMeta({ title: response.value.title });

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
