<template>
  <main class="container mx-auto px-4 lg:px-0 mt-24 purchase-step-4">
    <header class="flex justify-center py-5">
      <img
        class="w-full hidden sm:block"
        src="/img/purchase/desktop/under-confirm-line_en-EN.svg"
        alt="autópálya-matrica"
      />
      <img
        class="w-full block sm:hidden"
        src="/img/purchase/mobile/under-confirm-line_en-EN.svg"
        alt="autópálya-matrica"
      />
    </header>
    <form class="pb-10 max-w-[600px] mx-auto">
      <h1 class="purchase-h1 mb-2">
        <img
          class="w-[45px]"
          src="/img/purchase/D1.svg"
          alt="autópálya-matrica"
        />
        <span class="ml-2">Check the entered data</span>
      </h1>
      <div
        class="my-2 w-full inline-flex flex-wrap gap-2 text-center justify-center"
      >
        <img
          src="/img/purchase/danger-icon.svg"
          alt="Hiba történt"
          class="w-5 h-5"
          style="width: 20px; height: 20px"
        />
        <p class="error-message my-0">An error message will appear here</p>
      </div>
      <div class="w-full md:max-w-[500px] mx-auto flex flex-col gap-2 mt-2">
        <div class="text-sm lg:text-lg">
          <div class="">
            <div>
              Phone number:
              <a class="base-link" href="tel:36|06205032515">36|06205032515</a>
            </div>
          </div>
          <div class="">
            <div>
              E-mail address:
              <a class="base-link" href="mailto:zsanett.tamas87@gmail.com"
                >zsanett.tamas87@gmail.com</a
              >
            </div>
          </div>
        </div>
        <hr class="dashed-hr" />
        <div class="text-sm lg:text-lg">
          <div class="flex items-center">
            <div class="half-width">Vignette type</div>
            <div class="half-width">D1 - 1 havi</div>
          </div>
          <div class="flex items-center">
            <div class="half-width">Plate number:</div>
            <div class="half-width">ABC123</div>
          </div>
          <div class="flex items-center">
            <div class="half-width">Nationality mark</div>
            <div class="half-width">H | Magyarország (Hungary)</div>
          </div>
          <div class="flex items-center vignette-validity-start">
            <div class="half-width">Validity interval</div>
            <div class="half-width">2024-05-06 - 2024-06-06</div>
          </div>
        </div>
        <hr class="dashed-hr" />
        <div>
          <h2 class="v-shop-h2">Billing information</h2>
          <div class="invoice-data text-sm lg:text-lg">
            <div class="flex items-center">
              <div class="half-width">Name / Company name:</div>
              <div class="half-width">AS 24 Hungaria</div>
            </div>
            <div class="flex items-center">
              <div class="half-width">Country:</div>
              <div class="half-width">Magyarország | Hungary</div>
            </div>
            <div class="flex items-center">
              <div class="half-width">Zip code</div>
              <div class="half-width">1173</div>
            </div>
            <div class="flex items-center">
              <div class="half-width">City</div>
              <div class="half-width">Budapest</div>
            </div>
            <div class="flex items-center">
              <div class="half-width">Address (street, number)</div>
              <div class="half-width">
                Pesti út 44, D.ép. 2.em. 6. 6-os kcs. (40-50.)
              </div>
            </div>
          </div>
        </div>
        <hr class="dashed-hr" />
        <div class="text-sm lg:text-lg w-full">
          <div class="flex items-center">
            <div class="half-width">Vignette price</div>
            <div class="half-width">10 360 Ft</div>
          </div>
          <div class="flex items-center">
            <div class="half-width">Convenience fee</div>
            <div class="half-width">640 Ft</div>
          </div>
          <div class="flex items-center">
            <div class="half-width">Total</div>
            <div class="half-width">11 000 Ft</div>
          </div>
        </div>
        <hr class="dashed-hr" />
        <h2 class="v-shop-h2">Choice of payment method</h2>
        <div class="payment-method">
          <div class="flex items-center gap-2">
            <RadioButton
              id="Payment_OnlineTransfer"
              v-model="paymentOnlineTransfer"
              inputId="Payment_OnlineTransfer"
              name="paymentOnlineTransfer"
              value="paymentOnlineTransfer"
            />
            <label
              for="Payment_OnlineTransfer"
              class="primary-label text-lg font-normal"
              >Bank card - Barion</label
            >
          </div>
          <Accordion
            :activeIndex="[0]"
            class="mt-4"
            v-if="paymentOnlineTransfer"
          >
            <AccordionTab
              header="Payment takes place through Barion’s secure payment page."
            >
              <p class="m-0">
                Instead of entering the bank card data on the Barion payment
                interface, you can also choose the Barion wallet, Apple Pay or
                Google Pay payment option.
              </p>
            </AccordionTab>
          </Accordion>
        </div>
        <div class="payment-method">
          <section class="flex items-center gap-2">
            <Checkbox
              id="NewsletterSubscription"
              v-model="newsletterSubscription"
              :binary="true"
            />
            <label
              for="NewsletterSubscription"
              class="primary-label text-sm font-normal"
            >
              Subscribe vignette newsletter!
            </label>
          </section>
        </div>
        <div class="info-warning mt-0">
          <section class="flex items-center gap-2">
            <Checkbox
              id="DatasAreCorrect"
              v-model="datasAreCorrect"
              :binary="true"
            />
            <label
              for="DatasAreCorrect"
              class="primary-label text-white text-sm font-normal"
            >
              I state that I have read and accepted the
              <a
                class="whiteLink"
                href="https://www.new.hungary-vignette.eu/gtcc"
                target="_blank"
                >General Terms and Conditions of Contract</a
              >
              as well as the
              <a
                class="whiteLink"
                target="_blank"
                href="https://www.new.hungary-vignette.eu/privacy"
                >Privacy Statement</a
              >
              and I consent to the data management contained therein. I accept
              the terms and conditions of use.
            </label>
          </section>
        </div>
        <section class="flex items-center flex-wrap justify-center gap-4">
          <a class="btn-gray" href="/">Back</a>
          <NuxtLink to="/en/purchase/paymentUnderPayment" class="btn-green" type="submit"
            >Order vignette</NuxtLink
          >
        </section>
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
const paymentOnlineTransfer = ref("");
const newsletterSubscription = ref(false);
const datasAreCorrect = ref(false);

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
