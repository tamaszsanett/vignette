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
      <img class="w-[45px]" :src="'/img/purchase/' + category + '.svg'" />
      <div class="flex space-x-2">
          <span v-if="durationType === 'DAY'">{{ vignetteCategory }} - {{ $t("type.title.daily") }} ({{ $t("type.title.one_day") }}) {{
            $t("type.title.after_title") }}</span>
          <span v-if="durationType === 'WEEK'">{{ vignetteCategory }} - {{ $t("type.title.weekly") }} ({{ $t("type.title.ten_days") }}) {{
            $t("type.title.after_title") }}</span>
          <span v-if="durationType === 'YEAR_11'">{{ vignetteCategory }} - {{ $t("type.title.year_11") }} {{ $t("type.title.after_title")
            }}</span>
          <span v-if="durationType === 'YEAR'">{{ vignetteCategory }} - {{ $t("type.title.annual") }} {{ $t("type.title.after_title") }}</span>
          <span v-if="durationType === 'MONTH'">{{ vignetteCategory }} - {{ $t("type.title.monthly") }} {{ $t("type.title.after_title") }}</span>
        </div>
      </h1> 
      <div class="w-full md:max-w-[500px] mx-auto flex flex-col gap-2 mt-2">
        <div class="text-sm lg:text-lg">
          <div class="" v-if="orderData.value.phoneNumber">
            <div>
              {{ $t("confirm.phone_number") }}
              <strong class="text-orange">{{
                (orderData.value.phonePrefix ?? "+36") + "" + orderData.value.phoneNumber
              }}</strong>
            </div>
          </div>
          <div v-if="orderData.value.userEmail">
            <div>
              {{ $t("confirm.email_address") }}
              <strong class="text-orange">{{ orderData.value.userEmail }}</strong>
            </div>
          </div>
        </div>
        <hr class="dashed-hr" />
        <div
          class="text-sm lg:text-lg"
          v-for="item in sortedCartItems"
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
            <div class="flex items-center" v-if="orderData.value.invoiceHUTaxNumber">
              <div class="half-width">
                {{ $t("billing.tax_number") }}
              </div>
              <div class="half-width">{{ orderData.value.invoiceHUTaxNumber }}</div>
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
          <Button class="btn btn-green cursor-pointer" @click="sendForm" :disabled="loading" :class="{ 'btn-disabled': loading }">
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
  <Dialog
        v-model:visible="generalError"
        modal
        dismissableMask
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
        class="max-w-sm w-full top-40 absolute rounded-md"
      >
        <template #header>
          <div class="inline-flex items-center gap-2 pb-2 border-b w-full">
            <span class="font-bold whitespace-nowrap">{{t('Error')}}</span>
          </div>
        </template>
        <div >
          {{ generalErrorMsg }}
        </div>
        <template #footer>
          <div class="border-t pt-5 w-full">
            <Button
              class="btn primary-btn btn-sm mx-auto"
              :label="t('Restart purchase')"
              icon="pi pi-refresh"
              @click="goHome()"
              autofocus
            />
          </div>
        </template>
      </Dialog>
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

const categoryCookie = useCookie('category');
const durationTypeCookie = useCookie('durationType');

const category = ref(categoryCookie.value);
const vignetteCategory = ref(categoryCookie.value);
const durationType = ref(durationTypeCookie.value);


/// ----------------- sort cartItems -----------------------

const sortedCartItems = computed(() => {
  return [...orderData.value.cartItems].sort((a, b) => {
    const plateNumberA = a.properties.find((x) => x.key == "PlateNumber")?.value ?? "";
    const plateNumberB = b.properties.find((x) => x.key == "PlateNumber")?.value ?? "";
    const validityStartA = new Date(a.properties.find((x) => x.key == "ValidityStart")?.value ?? "").getTime();
    const validityStartB = new Date(b.properties.find((x) => x.key == "ValidityStart")?.value ?? "").getTime();

    // first order by plate number 
    if (plateNumberA < plateNumberB) return -1;
    if (plateNumberA > plateNumberB) return 1;
    // if the plate numbers are the same, sort by the start of validity
    return validityStartA - validityStartB;
  });
});

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
const generalError = ref(false);
const generalErrorMsg = ref("");

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
    errorMessage.value = "Acceptance of GTCC and Privacy Statement is mandatory!";
    loading.value = false;
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
      console.log(errors);
      
    } else {
      errorMessage.value = response.error.message;
      if (response.error.message == "Transaction is already in progress!")
      {
        generalError.value = true;
        generalErrorMsg.value = t("Transaction is already in progress!");
        errorMessage.value = "";
      }
      else {
        generalError.value = false;
        generalErrorMsg.value = "";
      }

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

function goHome() {
  console.log("goHome");
  const cartKey = useCookie("cartKey");
  const vignetteTypeFromCookie = useCookie("vignetteType");
  const durationTypeCookie = useCookie("durationType");
  const categoryCookie = useCookie("category");
  const orderId = useCookie("orderId");

  if (cartKey)
    cartKey.value = null;
  if (vignetteTypeFromCookie)
    vignetteTypeFromCookie.value = null;
  if (durationTypeCookie)
    durationTypeCookie.value = null;
  if (categoryCookie)
  categoryCookie.value = null;
  if (orderId)
    orderId.value = null;

  if (currentLanguage)
    navigateTo("/"+currentLanguage.value);
  else
    navigateTo("/");
}

/// ----------------- /ROUTING -----------------------
</script>
