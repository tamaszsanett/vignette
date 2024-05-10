<template>
  <main class="container mx-auto px-4 lg:px-0 mt-48 under-payment">
    <form class="pb-10 max-w-[600px] mx-auto">
      <h1 class="purchase-h1">
        <span class="ml-2">Successful vignette orders</span>
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
                  <p class="form-control-static">{{ purchaseData.value.trid }}</p>
                </div>
                <div class="control-label float-left px-2">E-mail</div>
                <div class="float-left px-2">
                  <p class="form-control-static">TODO: From API</p>
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
                    <tr v-for="vignette in purchaseData.value.vignettes" class="success-order">
                      <td>{{ vignette.plateNumber }} &nbsp;&nbsp; ( {{ vignette.countryCode  }} )</td>
                      <td>{{ vignette.validFrom.substring(0,10).replaceAll("-", ".") }} - TODO: from API</td>
                      <td class="text-info">
                        TODO: {{ vignette.vignetteType }}<br />
                        <strong class="uppercase">{{ vignette.status }}</strong><br />
                        <strong>{{ vignette.nmfrVignetteNumber }}</strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="clear-both">
                <section class="flex items-center flex-wrap my-5 gap-4 w-full">
                  <NuxtLink
                    id="downloadOrder"
                    to="#"
                    class="btn-green"
                    type="submit"
                    style="max-width: 250px"
                  >
                    <span>Download order summary</span>
                  </NuxtLink>
                </section>
                <p>Thank you for your purchase!</p>
                <p class="my-0">
                  We will send you the purchase receipt by e-mail.
                </p>
                <p class="text-danger my-0">
                  ATTENTION: if you can't find the notification letter, look for
                  it in the SPAM folder of your account.
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
  </main>
</template>

<script setup lang="ts">
import type { GetPurchaseResponse } from "~/types/types";
import Card from "primevue/card";

const props = defineProps({
  purchaseData: {
    type: Object as PropType<GetPurchaseResponse>,
    required: true,
  },
});

</script>
