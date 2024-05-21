<template>
  <main class="container mx-auto px-2 lg:px-0 mt-48 failed-payment">
    <form class="pb-10 max-w-[600px] mx-auto">
      <h1 class="purchase-h1">
        <span class="ml-2">{{ $t("confirm_failed.title") }}</span>
      </h1>
      <div class="w-full md:max-w-[600px] mx-auto flex flex-col gap-2">
        <Card class="mb-5 shadow-lg">
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
                <div class="float-left pr-2"><span class="hidden lg:inline-block lg:px-2">|</span>{{ $t("global.confirm_trid.e_mail") }}:</div>
                <div class="float-left">
                  {{ purchaseData.value.userEmail }}
                </div>
              </div>
              <div class="design-table w-full clear-both pt-[2px]">
                <table class="table table-condensed table-hover payment-progress-table">
                  <tbody>
                    <tr>
                      <td><strong>{{ $t("global.confirm_trid.table_plate_num_title") }}</strong></td>
                      <td><strong>{{ $t("global.confirm_trid.table_validity_period_title") }}</strong></td>
                      <td><strong>{{ $t("global.confirm_trid.table_vignette_num_title") }}</strong></td>
                    </tr>
                    <tr v-for="vignette in sortedVignettes" :key="vignette.nmfrVignetteNumber" class="failed-order">
                      <td>({{ vignette.countryCode }}) {{ vignette.plateNumber }}</td>
                      <td>{{ vignette.validFrom.substring(0, 10).replaceAll("-", ".") }} - {{ vignette.validTo?.substring(0, 10).replaceAll("-", ".") }}</td>
                      <td class="text-info">
                        {{ $t("vignette_type."+ vignette.vignetteType) }}<br />
                        <strong class="uppercase">{{ vignette.status }}</strong><br />
                        <strong>{{ vignette.nmfrVignetteNumber }}</strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="clear-both">
                <p>
                  {{ $t("confirm_failed.card.contact_us_text") }}
                </p>
                <p class="text-danger" v-html="t('confirm_failed.card.important_text')"></p>
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
import type { GetPurchaseResponse } from "~/types/types";
import Card from "primevue/card";
const { t, locale } = useI18n();

const props = defineProps({
  purchaseData: {
    type: Object as PropType<GetPurchaseResponse>,
    required: true,
  },
});

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
</script>