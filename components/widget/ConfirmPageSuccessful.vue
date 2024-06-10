<template>
  <main class="container mx-auto px-2 lg:px-0 mt-32 lg:mt-40 sucessful-payment">
    <form class="pb-10 max-w-[600px] mx-auto">
      <h1 class="purchase-h1">
        <span class="ml-2">{{ $t("confirm_successful.title") }}</span>
      </h1>
      <div class="w-full md:max-w-[600px] mx-auto flex flex-col gap-2">
        <Card class="mb-5 shadow-lg bg-white text-base-black">
          <template #content>
            <div class="payment-progress">
              <div class="w-full">
                <div class="float-left pr-2">
                  {{ $t("global.confirm_trid.trans_id") }}:
                </div>
                <div class="float-left">
                  {{ purchaseData.value.trid }}
                </div>
                <div class="clear-both lg:hidden"></div>
                <div class="float-left pr-2"><span class="hidden lg:inline-block lg:px-2">|</span>{{
                  $t("global.confirm_trid.e_mail") }}:</div>
                <div class="float-left">
                  {{ purchaseData.value.userEmail }}
                </div>
              </div>
              <div class="design-table w-full clear-both pt-[2px]" v-if="!loading">
                <table class="table table-condensed table-hover payment-progress-table">
                  <tbody>
                    <tr class="bg-base-gray">
                      <td><strong>{{ $t("global.confirm_trid.table_plate_num_title") }}</strong></td>
                      <td><strong>{{ $t("global.confirm_trid.table_validity_period_title") }}</strong></td>
                      <td><strong>{{ $t("global.confirm_trid.table_vignette_num_title") }}</strong></td>
                    </tr>
                    <tr v-for="vignette in sortedVignettes" :key="vignette.nmfrVignetteNumber" class="success-order">
                      <td>({{ vignette.countryCode }}) {{ vignette.plateNumber }}</td>
                      <td>{{ vignette.validFrom?.substring(0, 10).replaceAll("-", ".") }} - {{
                        vignette.validTo?.substring(0, 10).replaceAll("-", ".") }}</td>
                      <td class="text-info">
                        {{ $t("vignette_type." + vignette.vignetteType) }}<br />
                        <strong class="uppercase">{{ vignette.status }}</strong><br />
                        <strong>{{ vignette.nmfrVignetteNumber }}</strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div v-if="loading" class="w-50 clear-both text-center my-2">
                <ProgressSpinner></ProgressSpinner>
              </div>
              <div class="clear-both">
                <section class="flex items-center flex-wrap my-5 gap-4 w-full">
                  <Button id="downloadOrder" v-on:click="downloadSummary()" class="btn-green" style="max-width: 250px">
                    <span>{{ $t("confirm_successful.card.download_order_btn_title") }}</span>
                  </Button>
                </section>
                <p>{{ $t("confirm_successful.card.ty_text") }}</p>
                <p class="my-0" v-html="t('confirm_successful.card.info_text')"></p>
                <p class="text-danger my-0">
                  {{ $t("confirm_successful.card.spam_text") }}
                </p>
                <address class="mt-5">
                  {{ $t("global.contact_data.title") }}<br />
                  {{ $t("global.contact_data.phone") }}<br />
                  {{ $t("global.contact_data.email_title") }}
                  <strong>{{ $t("global.contact_data.mail").replace("[at]", "@") }}</strong>
                </address>
              </div>
            </div>
          </template>
        </Card>
      </div>
    </form>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { GetPurchaseResponse } from "~/types/types";
import Card from "primevue/card";
const { t, locale } = useI18n();
const { gtag } = useGtag();
var route = useRoute();

const cartKey = useCookie("cartKey");
const orderId = useCookie("orderId");
const vignetteTypeFromCookie = useCookie("vignetteType");
const durationTypeCookie = useCookie("durationType");
const categoryCookie = useCookie("category");

const loading = ref(true);

cartKey.value = null;
orderId.value = null;
vignetteTypeFromCookie.value = null;
durationTypeCookie.value = null;
categoryCookie.value = null;

const props = defineProps({
  purchaseData: {
    type: Object as PropType<GetPurchaseResponse>,
    required: true,
  },
});

var isDirty = false;

const sortedVignettes = computed(() => {
  return [...props.purchaseData.value.vignettes].sort((a, b) => {
    const plateNumberA = a.plateNumber ?? "";
    const plateNumberB = b.plateNumber ?? "";
    const validFromA = new Date(a.validFrom).getTime();
    const validFromB = new Date(b.validFrom).getTime();

    // first order by plate number 
    if (plateNumberA < plateNumberB) return -1;
    if (plateNumberA > plateNumberB) return 1;
    // if the plate numbers are the same, sort by the start of validity
    return validFromA - validFromB;
  });
});

function downloadSummary() {
  navigateTo("/" + route.params.lang + "/purchase/orderdetails/" + props.purchaseData.value.trid + ".pdf", { open: { target: "_blank" } });
}

onNuxtReady(() => {
  window.addEventListener("beforeunload", function (event) {
    if (!isDirty) {
      event.preventDefault();
      event.returnValue = "Are you sure to leave site?";
    }
  });

  SendEventsToGA4( props.purchaseData.value.trid, props.purchaseData.value.totalMargin);

});

function SendEventsToGA4(trid : number, totalMargin: number) {
  const originalLocale = locale.value;
  locale.value = 'en';
  let currency = 'HUF';
  const parsedMargin = parseInt(totalMargin.toString());
  const vignettes = [];
  let index = 0;

  for (let i = 0; i < props.purchaseData.value.vignettes.length; i++) {

    let item = {
      item_id: props.purchaseData.value.vignettes[i].vignetteType,
      item_name: t(`vignette_type.${props.purchaseData.value.vignettes[i].vignetteType}`, {}, 'en'),
      item_brand: "Vignette",
      item_category: t(`category.${props.purchaseData.value.vignettes[i].vignetteType}`, {}, 'en'),
      item_category2: t(`vignette_type.${props.purchaseData.value.vignettes[i].vignetteType}`, {}, 'en'),
      price: props.purchaseData.value.vignettes[i].amount,
      quantity: 1
    };

    vignettes.push(item);
    index++;
  }

  //success oldal
  gtag("event", "purchase", {
    transaction_id: trid,
    value: parsedMargin,
    currency: currency,
    items: vignettes
  });

  // rendszám megaádsa
  gtag("event", "add_to_cart", {
    currency: currency,
    value: parsedMargin,
    items: vignettes
  });

  gtag("event", "add_payment_info", {
    currency: currency,
    value: parsedMargin,
    items: vignettes
  });

  // confirm oldalra:
  gtag("event", "view_cart", {
    currency: currency,
    value: parsedMargin,
    items: vignettes
  });

  /// matrica típus
  gtag("event", "view_item", {
    currency: currency,
    value: parsedMargin,
    items: vignettes
  });


  gtag("event", "begin_checkout", {
    currency: currency,
    value: parsedMargin,
    items: vignettes
  });

setTimeout(() => {
  isDirty = true;
  loading.value = false;
}, 1000);

locale.value = originalLocale;
}

</script>
