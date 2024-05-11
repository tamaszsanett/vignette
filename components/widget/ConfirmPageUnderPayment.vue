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
                   <tr v-for="vignette in purchaseData.value.vignettes">
                      <td>({{ vignette.countryCode  }}) {{ vignette.plateNumber }}</td>
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
                <p>
                  To review the result, please refresh the page in some seconds!
                </p>
                <section
                  class="flex items-center flex-wrap justify-center gap-4"
                >
                  <Button
                    id="refreshbutton"
                    @click="reloadPage()"
                    class="btn-green"
                    type="submit"
                  >
                    <span>Refresh &nbsp;</span>
                    <span id="refreshcounter"> ({{ timerCount }})</span>
              </Button>
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

function reloadPage() {
  window.location.reload();
}
</script>

<script lang="ts">

    export default {

        data() {
            return {
                timerCount: 5
            }
        },

        watch: {

            timerCount: {
                handler(value) {

                    if (value > 0) {
                        setTimeout(() => {
                            this.timerCount--;
                        }, 1000);
                    }
                    else if (value == 0) {
                      window.location.reload();
                    }

                },
                immediate: true // This ensures the watcher is triggered upon creation
            }

        }
    }

</script>