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
      <h1 class="purchase-h1">
        <template v-for="(image, index) in imageMapping">
          <img
            v-if="
              orderData.value.cartItems.find(
                (item) => item.productCode === image.code
              )
            "
            :key="index"
            class="w-[45px]"
            :src="image.src"
            :alt="image.code + ' ' + $t('type.image.alt_vignette')"
          />
        </template>
        <div v-if="orderData.value.cartItems.length > 0" class="flex items-center space-x-2">
          <span>
            {{ $t("vignette_type." + orderData.value.cartItems[0].productCode) }} -
            {{ $t("type.title.after_title") }}
          </span>
        </div>
      </h1>
      <div class="w-full md:max-w-[500px] mx-auto flex flex-col gap-2 mt-2">
        <div class="text-sm lg:text-lg">
          <div class="">
            <div>
              {{ $t("confirm.phone_number") }}
              <strong>{{
                orderData.value.phoneNumber
              }}</strong>
            </div>
          </div>
          <div class="" v-if="orderData.value.userEmail">
            <div>
              {{ $t("confirm.email_address") }}
              <strong>{{ orderData.value.userEmail }}</strong>
            </div>
          </div>
        </div>
        <hr class="dashed-hr" />
        <div
          class="text-sm lg:text-lg"
          v-for="item in orderData.value.cartItems"
        >
          <div class="flex items-center">
            <div class="half-width">
              {{ $t("confirm.vignette_info.vignette_type_title") }}
            </div>
            <div class="half-width">
              {{ $t("vignette_type." + item.productCode) }}
            </div>
          </div>
          <div class="flex items-center">
            <div class="half-width">
              {{ $t("confirm.vignette_info.plate_number") }}
            </div>
            <div class="half-width">
              {{
                item.properties.find((x) => x.key == "PlateNumber")?.value ?? ""
              }}
            </div>
          </div>
          <div class="flex items-center">
            <div class="half-width">
              {{ $t("confirm.vignette_info.car_country") }}
            </div>
            <div class="half-width">
              {{
                item.properties.find((x) => x.key == "CountryCode")?.value ?? ""
              }}
            </div>
          </div>
          <div class="flex items-center vignette-validity-start">
            <div class="half-width">
              {{ $t("confirm.vignette_info.validity_period") }}
            </div>
            <div class="half-width">
              {{
                item.properties
                  .find((x) => x.key == "ValidityStart")
                  ?.value.substring(0, 10) ?? ""
              }}
              -
              {{
                item.properties
                  .find((x) => x.key == "ValidityEnd")
                  ?.value.substring(0, 10) ?? ""
              }}
            </div>
          </div>
        </div>
        <hr class="dashed-hr" v-if="orderData.value.needInvoice" />
        <div v-if="orderData.value.needInvoice">
          <h2 class="v-shop-h2">{{ $t("confirm.billing_info.title") }}</h2>
          <div class="invoice-data text-sm lg:text-lg">
            <div class="flex items-center">
              <div class="half-width">
                {{ $t("confirm.billing_info.name_title") }}
              </div>
              <div class="half-width">{{ orderData.value.invoiceName }}</div>
            </div>
            <div class="flex items-center">
              <div class="half-width">
                {{ $t("confirm.billing_info.country") }}
              </div>
              <div class="half-width">{{ orderData.value.invoiceCountry }}</div>
            </div>
            <div class="flex items-center">
              <div class="half-width">
                {{ $t("confirm.billing_info.zip_code") }}
              </div>
              <div class="half-width">
                {{ orderData.value.invoicePostalCode }}
              </div>
            </div>
            <div class="flex items-center">
              <div class="half-width">
                {{ $t("confirm.billing_info.city") }}
              </div>
              <div class="half-width">{{ orderData.value.invoiceCity }}</div>
            </div>
            <div class="flex items-center">
              <div class="half-width">
                {{ $t("confirm.billing_info.address") }}
              </div>
              <div class="half-width">
                {{ orderData.value.invoiceStreetAddress }}
              </div>
            </div>
          </div>
        </div>
        <hr class="dashed-hr" />
        <div class="text-sm lg:text-lg w-full">
          <div class="flex items-center">
            <div class="half-width">{{ $t("confirm.price.price_title") }}</div>
            <div class="half-width">
              {{
                Intl.NumberFormat("de-DE", {
                  style: "currency",
                  currency: "EUR",
                }).format(sumVignettePrice)
              }}
            </div>
          </div>
          <div class="flex items-center">
            <div class="half-width">
              {{ $t("confirm.price.convenience_fee") }}
            </div>
            <div class="half-width">
              {{
                Intl.NumberFormat("de-DE", {
                  style: "currency",
                  currency: "EUR",
                }).format(sumConvenienceFee)
              }}
            </div>
          </div>
          <div class="flex items-center">
            <div class="half-width">{{ $t("confirm.price.total") }}</div>
            <div class="half-width">
              {{
                Intl.NumberFormat("de-DE", {
                  style: "currency",
                  currency: "EUR",
                }).format(sum)
              }}
            </div>
          </div>
        </div>
        <hr class="dashed-hr" />

        <div
          v-if="errorMessage"
          class="my-2 w-full inline-flex flex-wrap gap-2 text-center justify-center"
        >
          <img
            src="/img/purchase/danger-icon.svg"
            alt="Hiba történt"
            class="w-5 h-5"
            style="width: 20px; height: 20px"
          />
          <p class="error-message my-0">{{ errorMessage }}</p>
        </div>

        <h2 class="v-shop-h2">{{ $t("confirm.payment.title") }}</h2>
        <div class="payment-method">
          <div class="flex items-center gap-2">
            <RadioButton
              id="Payment_Barion"
              v-model="paymentMethod"
              inputId="Payment_Barion"
              name="PaymentMethod"
              value="Barion"
            />
            <label
              for="Payment_Barion"
              class="primary-label text-lg font-normal"
              >{{ $t("confirm.payment.card_type_label_barion") }}</label
            >
          </div>
          <Accordion :activeIndex="[0]" class="mt-4" v-if="paymentMethod">
            <AccordionTab
              header="Payment takes place through Barion’s secure payment page."
            >
              <p class="m-0">
                {{ $t("confirm.payment.barion_desc") }}
              </p>
            </AccordionTab>
          </Accordion>
        </div>
        <div class="payment-method">
          <section class="flex items-center gap-2">
            <Checkbox
              inputId="NewsletterSubscription"
              v-model="newsletterSubscription"
              :binary="true"
            />
            <label
              for="NewsletterSubscription"
              class="primary-label text-sm font-normal"
            >
              {{ $t("confirm.payment.subscribe_label") }}
            </label>
          </section>
        </div>
        <div class="info-warning mt-0">
          <section class="flex items-center gap-2">
            <Checkbox
              v-model="datasAreCorrect"
              inputId = "DatasAreCorrect"
              :binary="true"
            />
            <label
              for="DatasAreCorrect"
              class="primary-label text-white text-sm font-normal"
              v-html="$t('confirm.payment.terms_label')"
            >
            </label>
          </section>
        </div>
        <section class="flex items-center flex-wrap justify-center gap-4">
          <Button class="btn-gray" @click="goBack">{{ $t("type.back") }}</Button>
          <Button class="btn btn-green cursor-pointer" @click="sendForm">
            <span v-if="!loading">{{
              $t("confirm.payment.order_vignette_btn_title")
            }}</span>
            <span class="h-5 w-5" v-else>
              <svg
                class="animate-spin h-5 w-5 mr-3 border-4 border-t-transparent border-green-500 rounded-full"
                viewBox="0 0 24 24"
              ></svg>
            </span>
          </Button>
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
import { ref, computed } from "vue";
import type {
  GetOrderResponse,
  PurchaseVignettesAnonymWithOrderResponse,
} from "~/types/types";
const { t, locale } = useI18n();
const route = useRoute();
import { useRouter } from "nuxt/app";
const router = useRouter();

const goBack = () => {
  router.back();
};

const imageMapping = [
  { code: 'D124', src: '/img/purchase/D1.svg' },
  { code: 'D110', src: '/img/purchase/D1.svg' },
  { code: 'D130', src: '/img/purchase/D1.svg' },
  { code: 'D1365', src: '/img/purchase/D1.svg' },

  { code: 'D224', src: '/img/purchase/D2.svg' },
  { code: 'D210', src: '/img/purchase/D2.svg' },
  { code: 'D230', src: '/img/purchase/D2.svg' },
  { code: 'D2365', src: '/img/purchase/D2.svg' },
 
  { code: 'D1M24', src: '/img/purchase/D1M.svg' },
  { code: 'D1M10', src: '/img/purchase/D1M.svg' },
  { code: 'D1M30', src: '/img/purchase/D1M.svg' },

  { code: 'U24', src: '/img/purchase/U.svg' },
  { code: 'U10', src: '/img/purchase/U.svg' },
  { code: 'U30', src: '/img/purchase/U.svg' },
  { code: 'U365', src: '/img/purchase/U.svg' },
];


/// ----------------- LOAD LANGUAGE -----------------------

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
/// ----------------- / LOAD LANGUAGE -----------------------

/// ----------------- LOAD ORDER -----------------------

const orderId = useCookie("orderId", {
  watch: "shallow",
  priority: "high",
  maxAge: 2592000000,
});
const paymentMethod = ref("Barion");
const newsletterSubscription = ref(false);
const datasAreCorrect = ref(false);

const errorMessage = ref("");

const commmonApiEndpoint = "https://test-gw.voxpay.hu/Webshop.Common/GetOrder";

var orderData = await $fetch<GetOrderResponse>(
  `${commmonApiEndpoint}?OrderId=${orderId.value}`
);

const sum = ref(0.0);
const sumConvenienceFee = ref(0.0);
const sumVignettePrice = ref(0.0);

for (var i = 0; i < orderData.value.cartItems.length; i++) {
  var item = orderData.value.cartItems[i];

  sum.value += item.grossUnitPrice;

  let vignettePrice = parseFloat(
    item.properties.find((x) => x.key == "VignettePrice")?.value ?? ""
  );
  let transactionFee = parseFloat(
    item.properties.find((x) => x.key == "TransactionFee")?.value ?? ""
  );

  sumVignettePrice.value += vignettePrice;
  sumConvenienceFee.value += transactionFee;
}

/// ----------------- /LOAD ORDER -----------------------

/// ----------------- SUBMIT ORDER -----------------------

const loading = ref(false);

async function sendForm() {
  loading.value = true;

  if (!datasAreCorrect.value) {
    errorMessage.value = "GTCC required!!!";
    return;
  }

  const submitOrderEndpoint =
    "https://test-gw.voxpay.hu/Webshop.Vignette/PurchaseVignettesAnonymWithOrder";
  const response = await $fetch<PurchaseVignettesAnonymWithOrderResponse>(
    submitOrderEndpoint,
    {
      method: "POST",
      body: {
        orderId: orderId.value,
        paymentMode: paymentMethod.value,
        subscribeNewsletter: newsletterSubscription.value,
        participatePrizeGame: false,
        isFleet: false,
        forGift: false,
        currency: "EUR",
        sourceShop: "hungary-vignette.eu/" + currentLanguage.value,
        sourcePlatform: "web",
        sourceForm: "Standard",
        redirectURL:
          "https://new-hungary-vignette.voxpay.hu/" +
          currentLanguage.value +
          "/purchase/status/" +
          orderData.value.trid,
        cultureKey: currentLanguage.value,
      },
    }
  );

  if (!response.isSuccess) {
    errorMessage.value = "";

    if (
      response.error.code ==
      "https://tools.ietf.org/html/rfc9110#section-15.5.1"
    ) {
      var errors = JSON.parse(response.error.message);

      if (errors.UserEmail != null) {
        errorMessage.value += errors.UserEmail[0] + "<br />";
      }
      if (errors.PhoneNumber != null) {
        errorMessage.value += errors.PhoneNumber[0] + "<br />";
      }
      if (errors.InvoiceName != null) {
        errorMessage.value += errors.InvoiceName[0] + "<br />";
      }
      if (errors.InvoiceHUTaxNumber != null) {
        errorMessage.value += errors.InvoiceHUTaxNumber[0] + "<br />";
      }
      if (errors.InvoiceHUGroupTaxNumber != null) {
        errorMessage.value += errors.InvoiceHUGroupTaxNumber[0] + "<br />";
      }
      if (errors.InvoiceEUTaxNumber != null) {
        errorMessage.value += errors.InvoiceEUTaxNumber[0] + "<br />";
      }
      if (errors.InvoiceCountry != null) {
        errorMessage.value += errors.InvoiceCountry[0] + "<br />";
      }
      if (errors.InvoicePostalCode != null) {
        errorMessage.value += errors.InvoicePostalCode[0] + "<br />";
      }
      if (errors.InvoiceCity != null) {
        errorMessage.value += errors.InvoiceCity[0] + "<br />";
      }
      if (errors.InvoiceStreetAddress != null) {
        errorMessage.value += errors.InvoiceStreetAddress[0] + "<br />";
      }
      if (errors.InvoicePostalCode != null) {
        errorMessage.value += errors.InvoicePostalCode[0] + "<br />";
      }
      if (errors.NeedInvoice != null) {
        errorMessage.value += errors.NeedInvoice[0] + "<br />";
      }
    } else {
      errorMessage.value = response.error.message;
    }
  } else {
    navigateTo(response.value.redirectUrl, { external: true });
  }
  loading.value = false;
}

/// ----------------- / SUBMIT ORDER -----------------------

/// ----------------- ROUTING -----------------------

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

/// ----------------- /ROUTING -----------------------
</script>
