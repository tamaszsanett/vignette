<template>
    <main class="container mx-auto px-4 lg:px-0 mt-48 under-payment">
      <form class="pb-10 max-w-[600px] mx-auto">
        <h1 class="purchase-h1">
          <span class="ml-2">Transaction being processed </span>
        </h1>
        <div class="w-full md:max-w-[600px] mx-auto flex flex-col gap-2">
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
                      <tr>
                        <td>ABC123 &nbsp;&nbsp; ( RO )</td>
                        <td>2024.05.06. - 2024.06.06.</td>
                        <td class="text-info">
                          D1 - 1 month<br />
                          <strong class="uppercase">IN PROGRESS</strong>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="clear-both">
                  <p>
                    To review the result, please refresh the page in some seconds!
                  </p>
                  <section
                    class="flex items-center flex-wrap justify-center gap-4"
                  >
                    <NuxtLink
                      id="refreshbutton"
                      to="Vignette/Confirm?trid=&send=true&__RequestVerificationToken=&PaymentMethod=Payment_TwoStepsBankcardBarion&DatasAreCorrect=true"
                      class="btn-green"
                      type="submit"
                    >
                      <span>Refresh</span>
                      <span id="refreshcounter"> (0)</span>
                    </NuxtLink>
                  </section>
                  <p class="text-info">
                    Please check your mailbox. <br />We will send you confirmation
                    of the successful purchase and the validation of the sticker!
                  </p>
                  <p>
                    <strong>Payment by bank card</strong> will take only a few
                    minutes.
                  </p>
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
  