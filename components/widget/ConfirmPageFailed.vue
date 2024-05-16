<template>
  <main class="container mx-auto px-4 lg:px-0 mt-48 under-payment">
    <form class="pb-10 max-w-[600px] mx-auto">
      <h1 class="purchase-h1">
        <span class="ml-2">{{ $t("confirm_failed.title") }}</span>
      </h1>
      <div class="w-full md:max-w-[600px] mx-auto flex flex-col gap-2">
        <Card class="mb-5 shadow-lg">
          <template #content>
            <div class="payment-progress">
              <div class="clear-both">
                <p>
                  {{ $t("confirm_failed.payment_result_desc") }}
                </p>
                <section class="w-full flex items-center flex-wrap justify-center gap-4">
                  <NuxtLink id="refreshbutton" to="/vignette/D1/1month/type?backtrid=" class="btn-green" type="submit">
                    <span>{{ $t("confirm_failed.reorder_btn_title") }}</span>
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
                  {{ $t("global.confirm_trid.trans_id") }}
                </div>
                <div class="float-left">
                  <p class="form-control-static">{{ purchaseData.value.trid }}</p>
                </div>
                <div class="control-label float-left px-2">{{ $t("global.confirm_trid.e_mail") }}</div>
                <div class="float-left px-2">
                  <p class="form-control-static">{{  purchaseData.value.userEmail }}</p>
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
                    <tr v-for="vignette in purchaseData.value.vignettes" class="failed-order">
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
                <p class="text-danger">
                  {{ $t("confirm_failed.card.important_text") }}
                </p>
                {{ $t("global.confirm_trid.card_time_text") }}
                <address class="mt-5">
                  {{ $t("global.contact_data.title") }}<br />
                  {{ $t("global.contact_data.phone") }}<br />
                  {{ $t("global.contact_data.email_title") }}
                  <a href="mailto: {{ $t('global.contact_data.mail').replace('[at]', '@'') }}">{{ $t("global.contact_data.mail").replace("[at]", "@") }}</a>
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

</script>