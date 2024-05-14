<template>
  <main class="container mx-auto px-4 lg:px-0 mt-24 purchase-step-3">
    <header class="flex justify-center py-5">
      <img
        class="w-full hidden sm:block"
        :src="`/img/purchase/desktop/${$t('type.image.desktop_path')}`"
        alt="autópálya-matrica"
      />
      <img
        class="w-full block sm:hidden"
        :src="`/img/purchase/mobile/${$t('type.image.mobile_path')}`"
        alt="autópálya-matrica"
      />
    </header>
    <section class="max-w-[800px] mx-auto">
      <h1 class="purchase-h1">
        <img
          class="w-[45px]"
          :src="'/img/purchase/' + category + '.svg'"
          :alt="category + ' ' + $t('type.image.alt_vignette')"
        />
        <span class="ml-2">{{ $t("billing.title") }}</span>
      </h1>
    </section>
    <form class="pb-10 max-w-[450px] mx-auto">
      <div class="w-full mx-auto flex flex-col gap-4">
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
          <p class="error-message my-0" v-html="errorMessage"></p>
        </div>
        <section class="card flex flex-col gap-2">
          <label for="email" class="primary-label">{{
            $t("billing.email")
          }}</label>
          <InputText
            class="primary-input"
            id="email"
            type="email"
            v-model="orderData.value.userEmail"
            aria-describedby="email"
          />
        </section>
        <section class="flex flex-col gap-2">
          <label for="PhoneNumberWrapper" class="primary-label">{{
            $t("billing.phone")
          }}</label>
          <div id="PhoneNumberWrapper" class="flex items-center gap-2">
            <section class="card flex flex-col gap-2 flex-1">
              <Dropdown
                id="PhoneNumberPrefix"
                v-model="selectedCountryPhonePrefix"
                :options="numbers"
                :placeholder="numbers[0].number"
                class="primary-select prefix-select"
              >
                <template #value="slotProps">
                  <div v-if="slotProps.value" class="flex items-center">
                    <div :class="`mr-2 flag flag-${slotProps.value.code}`">
                      {{ slotProps.value.number }}
                    </div>
                  </div>
                  <span v-else>
                    {{ slotProps.placeholder }}
                  </span>
                </template>
                <template #option="slotProps">
                  <div class="flex items-center">
                    <div :class="`mr-2 flag flag-${slotProps.option.code}`">
                      {{ slotProps.option.code }} |
                    </div>
                    <div>{{ slotProps.option.number }}</div>
                  </div>
                </template>
              </Dropdown>
            </section>
            <InputText
              type="tel"
              id="PhoneNumber"
              v-model="orderData.value.phoneNumber"
              aria-describedby="phone-number"
              class="primary-input"
            />
            <button class="tooltip btn primary-btn tooltip-wrapper">
              ?
              <span class="tooltiptext">{{
                $t("billing.mail_tooltip_text")
              }}</span>
            </button>
          </div>
        </section>
        <section class="card flex items-center gap-2">
          <Checkbox
            id="vatInvoice"
            v-model="vatInvoiceChecked"
            :binary="true"
          />
          <label for="vatInvoice" class="primary-label text-xl">
            {{ $t("billing.invoice_request_title") }}
          </label>
        </section>
        <section class="w-full">
          <p class="text-xs m-0 font-bold">
            {{ $t("billing.request_after_text1") }}
          </p>
          <p class="text-xs m-0 font-bold">
            {{ $t("billing.request_after_text2") }}
          </p>
        </section>
        <section v-if="vatInvoiceChecked">
          <div class="flex items-center gap-4 justify-center mb-4">
            <div class="flex items-center gap-2">
              <RadioButton
                v-model="companyOrPrivatePerson"
                inputId="company"
                name="companyOrPrivatePerson"
                value="company"
              />
              <label for="company" class="primary-label"> {{ $t("billing.company") }} </label>
            </div>
            <div class="flex items-center gap-2">
              <RadioButton
                v-model="companyOrPrivatePerson"
                inputId="privatePerson"
                name="companyOrPrivatePerson"
                value="privatePerson"
                checked="true"
              />
              <label for="privatePerson" class="primary-label"
                >{{ $t("billing.private_person") }}</label
              >
            </div>
          </div>
          <div class="w-full flex flex-col gap-4">
            <!-- Section visible only when 'privatePerson' is selected -->
            <div v-if="companyOrPrivatePerson === 'privatePerson'">
              <section class="card flex items-center gap-2">
                <div class="flex flex-col w-full gap-2">
                  <label for="name" class="primary-label">{{ $t("billing.name") }}</label>
                  <InputText
                    class="primary-input"
                    id="name"
                    type="text"
                    v-model="orderData.value.invoiceName"
                    aria-describedby="name"
                  />
                </div>
                <button class="tooltip btn primary-btn tooltip-wrapper">
                  ?
                  <span class="tooltiptext">{{ $t("billing.name_tooltip_text") }}</span>
                </button>
              </section>
            </div>
            <!-- Section visible only when 'Company' is selected -->
            <section v-if="companyOrPrivatePerson === 'company'">
              <section class="card flex items-center gap-2">
                <div class="flex flex-col w-full gap-2">
                  <label for="companyName" class="primary-label"
                    >{{ $t("billing.company_name") }}</label
                  >
                  <InputText
                    class="primary-input"
                    id="companyName"
                    type="text"
                    v-model="orderData.value.invoiceName"
                    aria-describedby="name"
                  />
                </div>
                <button class="tooltip btn primary-btn tooltip-wrapper">
                  ?
                  <span class="tooltiptext">{{ $t("billing.name_tooltip_text") }}</span>
                </button>
              </section>
            </section>
            <section class="card flex flex-col gap-2">
              <label for="country" class="primary-label">{{ $t("billing.country") }}</label>
              <Dropdown
                id="invoiceCountry"
                v-model="selectedCountry"
                :options="countries"
                filter
                optionLabel="name"
                placeholder="Select a Country"
                class="w-full primary-select"
              >
                <template #value="slotProps">
                  <div v-if="slotProps.value" class="flex items-center">
                    <div>{{ slotProps.value }}</div>
                  </div>
                  <span v-else>
                    {{ slotProps.placeholder }}
                  </span>
                </template>
                <template #option="slotProps">
                  <div class="flex items-center">
                    <div>{{ slotProps.option }}</div>
                  </div>
                </template>
              </Dropdown>
            </section>
            <section
              v-if="
                companyOrPrivatePerson === 'company' &&
                orderData.value.invoiceCountry === 'Hungary'
              "
            >
              <section class="card flex flex-col gap-2">
                <label for="companyName" class="primary-label"
                  >{{ $t("billing.tax_number") }}</label
                >
                <InputMask
                  id="tax_number"
                  class="primary-input"
                  v-model="orderData.value.invoiceHUTaxNumber"
                  variant="filled"
                  mask="99999999-9-99"
                  placeholder=""
                />
              </section>
            </section>
            <section class="card flex flex-col gap-2">
              <label for="postalCode" class="primary-label">{{ $t("billing.zip_code") }}</label>
              <AutoComplete
                id="postalCode"
                v-model="orderData.value.invoicePostalCode"
                :suggestions="postalCodeItems"
                @complete="search"
              />
            </section>
            <section class="card flex flex-col gap-2">
              <label for="city" class="primary-label">{{ $t("billing.city") }}</label>
              <InputText
                class="primary-input"
                id="city"
                type="city"
                v-model="orderData.value.invoiceCity"
                aria-describedby="city"
              />
            </section>
            <section class="card flex flex-col gap-2">
              <label for="street" class="primary-label">{{ $t("billing.address") }}</label>
              <InputText
                class="primary-input"
                id="street"
                type="street"
                v-model="orderData.value.invoiceStreetAddress"
                aria-describedby="street"
              />
            </section>
          </div>
        </section>
        <section class="flex items-center flex-wrap justify-center gap-4">
          <a class="btn-gray" href="/">{{ $t("type.back") }}</a>
          <Button class="greenButton" @click="sendForm()">{{
            $t("type.next")
          }}</Button>
        </section>
      </div>
      <PurchaseBox />
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
const route = useRoute();
import { ref, computed } from "vue";
import { useRoute } from "nuxt/app";
import { uuid } from "vue-uuid";
import type { GetOrderRespose } from "~/types/types";
const category = route.params.category;
const { t, locale } = useI18n();

const orderId = useCookie("orderId", {
  watch: "shallow",
  priority: "high",
  maxAge: 2592000000,
});
const cartKey = useCookie("cartKey");

if (cartKey.value == null) {
  cartKey.value = uuid.v4();
}
cartKey.value = "3fa85f64-5717-4562-b3fc-2c963f66afa8";
// Betöltjük a korábbi order adatait, ha van order-id-nk.

const commmonApiEndpoint = "https://test-gw.voxpay.hu/Webshop.Common/GetOrder";

var orderData = {
  value: {
    needInvoice: false,
    userEmail: "",
  },
} as GetOrderRespose;
if (orderId.value != null) {
  orderData = await $fetch<GetOrderRespose>(
    `${commmonApiEndpoint}?OrderId=${orderId.value}`
  );
}

const vatInvoiceChecked = ref(
  orderData == null ? false : orderData.value?.needInvoice
);
const cityValue = ref(null);
const emailValue = ref(null);
const phoneValue = ref(null);
const companyName = ref(null);
const companyOrPrivatePerson = ref(
  orderData == null
    ? ""
    : orderData.value?.invoiceHUTaxNumber == null
    ? "privatePerson"
    : "company"
);
const inputMaskValue = ref("");
const errorMessage = ref("");

const selectedCountryPhonePrefix = ref();
const numbers = ref([
  { number: "+36", code: "HU" },
  { number: "+42", code: "SK" },
  { number: "+49", code: "DE" },
  { number: "+380", code: "UK" },
]);

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

const countries = ref([
  "Hungary",
  "Slovakia",
  "Germany",
  "Ukrain",
  "Slovenia",
  "Australia",
  "Brazil",
  "China",
  "Egypt",
  "France",
  "Germany",
  "India",
  "Japan",
  "Spain",
  "United States",
]);

const selectedCountry = ref(orderData.value?.invoiceCountry);
const postalCodeItems = ref<string[]>([]);

const search = (event: { query: string }) => {
  postalCodeItems.value = [...Array(10).keys()].map(
    (item) => `${event.query}-${item}`
  );
};

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

async function sendForm() {
  const createOrderEndpoint =
    "https://test-gw.voxpay.hu/Webshop.Common/CreateOrder";
  const response = await $fetch<GetOrderRespose>(createOrderEndpoint, {
    method: "POST",
    body: {
      orderId: orderId.value,
      cartKey: cartKey.value,
      sessionId: "string",
      clientId: "string",
      userEmail: orderData.value.userEmail,
      phoneNumber: orderData.value.phoneNumber,
      invoiceName: orderData.value.invoiceName,
      invoiceHuTaxNumber:
        orderData.value.invoiceHUTaxNumber == ""
          ? null
          : orderData.value.invoiceHUTaxNumber,
      invoiceHuGroupTaxNumber:
        orderData.value.invoiceHUGroupTaxNumber == ""
          ? null
          : orderData.value.invoiceHUGroupTaxNumber,
      invoiceEuTaxNumber:
        orderData.value.invoiceEUTaxNumber == ""
          ? null
          : orderData.value.invoiceEUTaxNumber,
      invoiceCountry: selectedCountry.value,
      invoicePostalCode: orderData.value.invoicePostalCode,
      invoiceCity: orderData.value.invoiceCity,
      invoiceStreetAddress: orderData.value.invoiceStreetAddress,
      needInvoice: vatInvoiceChecked.value,
    },
  });

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
    window.scrollTo(0, 0);
  } else {
    orderId.value = response.value.orderId;
    console.log(response);

    navigateTo("/" + currentLanguage.value + "/purchase/confirm");
  }
}
</script>
