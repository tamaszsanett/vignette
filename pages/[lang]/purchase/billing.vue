<template>
  <main class="container mx-auto px-4 lg:px-0 mt-24 purchase-step-3">
    <header class="flex justify-center py-5">
      <img
        class="w-full hidden sm:block"
        :src="`/img/purchase/desktop/${$t('type.image.desktop_billing')}`"
        :alt="category + ' ' + $t('type.image.alt_vignette')"
      />
      <img
        class="w-full block sm:hidden"
        :src="`/img/purchase/mobile/${$t('type.image.desktop_billing')}`"
        :alt="category + ' ' + $t('type.image.alt_vignette')"
      />
    </header>
    <section class="max-w-[800px] mx-auto">
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
        <section class="flex flex-col gap-2">
          <label for="email" class="primary-label">{{
            $t("billing.email")
          }}</label>
          <div class="relative flex gap-2 items-center">
            <InputText
              class="primary-input"
              id="email"
              type="email"
              v-model="orderData.value.userEmail"
              aria-describedby="email"
            />
            <div
              class="tooltip btn primary-btn tooltip-wrapper tooltip-responsive-fix"
            >
              ?
              <span class="tooltiptext">{{
                $t("billing.mail_tooltip_text")
              }}</span>
            </div>
          </div>
        </section>
        <section class="flex flex-col gap-2">
          <label for="PhoneNumberWrapper" class="primary-label">{{
            $t("billing.phone")
          }}</label>
          <div id="PhoneNumberWrapper" class="flex items-center gap-2 relative">
            <div class="card flex flex-col gap-2 flex-1">
              <Dropdown
                id="PhoneNumberPrefix"
                v-model="selectedCountryPhonePrefix"
                :options="numbers"
                :placeholder="selectedCountryPhonePrefix ?? '+36'"
                class="primary-select prefix-select"
              >
                <template #value="slotProps">
                  <div v-if="slotProps.value" class="flex items-center">
                    <div :class="`mr-2 flag flag-${slotProps.value}`">
                      <div>{{ slotProps.value }}</div>
                    </div>
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
            </div>
            <InputText
              type="tel"
              id="PhoneNumber"
              v-model="orderData.value.phoneNumber"
              aria-describedby="phone-number"
              class="primary-input"
            />
            <div
              class="tooltip btn primary-btn tooltip-wrapper tooltip-responsive-fix"
            >
              ?
              <span class="tooltiptext">{{
                $t("billing.phone_tooltip_text")
              }}</span>
            </div>
          </div>
        </section>
        <section class="card flex items-center gap-2">
          <Checkbox
            inputId="vatInvoice"
            v-model="vatInvoiceChecked"
            :binary="true"
          />
          <label for="vatInvoice" class="primary-label text-xl">
            {{ $t("billing.invoice_request_title") }}
          </label>
          <div class="tooltip btn primary-btn tooltip-wrapper">
            ?
            <span class="tooltiptext">{{
              $t("billing.request_title_tooltip_text")
            }}</span>
          </div>
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
              <label for="company" class="primary-label text-sm sm:text-base">
                {{ $t("billing.company") }}
              </label>
            </div>
            <div class="flex items-center gap-2">
              <RadioButton
                v-model="companyOrPrivatePerson"
                inputId="privatePerson"
                name="companyOrPrivatePerson"
                value="privatePerson"
                checked="true"
              />
              <label
                for="privatePerson"
                class="primary-label text-sm sm:text-base"
                >{{ $t("billing.private_person") }}</label
              >
            </div>
            <div
              class="tooltip btn primary-btn tooltip-wrapper"
            >
              ?
              <span class="tooltiptext">{{
                $t("billing.checkbox_tooltip_text")
              }}</span>
            </div>
          </div>
          <div class="w-full flex flex-col gap-4" v-if="vatInvoiceChecked && companyOrPrivatePerson === 'company' || vatInvoiceChecked && companyOrPrivatePerson === 'privatePerson'">
            <!-- Section visible only when 'privatePerson' is selected -->
            <section
              class="flex flex-col gap-2"
              v-if="companyOrPrivatePerson === 'privatePerson'"
            >
              <label for="name" class="primary-label">{{
                $t("billing.private_name")
              }}</label>
              <div class="relative flex items-center w-full gap-2">
                <InputText
                  class="primary-input"
                  id="name"
                  type="text"
                  v-model="orderData.value.invoiceName"
                  aria-describedby="name"
                />
                <div
                  class="tooltip btn primary-btn tooltip-wrapper tooltip-responsive-fix"
                >
                  ?
                  <span class="tooltiptext">{{
                    $t("billing.name_tooltip_text")
                  }}</span>
                </div>
              </div>
            </section>
            <!-- Section visible only when 'Company' is selected -->
            <section v-if="companyOrPrivatePerson === 'company'">
              <div class="flex flex-col gap-2">
                <label for="companyName" class="primary-label">{{
                  $t("billing.company_name")
                }}</label>
                <div class="relative flex items-center w-full gap-2">
                  <AutoComplete
                    class="w-full"
                    id="companyName"
                    v-model="orderData.value.companyName"
                    :suggestions="companyNameSuggestions"
                    @complete="fetchCompanyNameSuggestions"
                    @change="onCompanySelect"
                    field="companyName"
                    :placeholder="$t('billing.company_name_placeholder')"
                  />
                  <div
                    class="tooltip btn primary-btn tooltip-wrapper tooltip-responsive-fix"
                  >
                    ?
                    <span class="tooltiptext">{{
                      $t("billing.name_tooltip_text")
                    }}</span>
                  </div>
                </div>
              </div>
            </section>
            <section class="flex flex-col gap-2" v-if="companyOrPrivatePerson === 'company'">
              <label for="country" class="primary-label">{{
                $t("billing.country")
              }}</label>
              <div class="relative flex items-center w-full gap-2">
                <Dropdown
                  id="invoiceCountry"
                  v-model="orderData.value.invoiceCountry"
                  :options="invoiceCountries"
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
                <div
                  class="tooltip btn primary-btn tooltip-wrapper tooltip-responsive-fix"
                >
                  ?
                  <span class="tooltiptext">{{
                    $t("billing.country_tooltip_text")
                  }}</span>
                </div>
              </div>
            </section>
            <section class="flex flex-col gap-2" v-if="companyOrPrivatePerson === 'privatePerson'">
              <label for="country" class="primary-label">{{
                $t("billing.country")
              }}</label>
              <div class="relative flex items-center w-full gap-2">
                <Dropdown
                  id="invoiceCountry"
                  v-model="selectedCountry"
                  :options="invoiceCountries"
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
                <div
                  class="tooltip btn primary-btn tooltip-wrapper tooltip-responsive-fix"
                >
                  ?
                  <span class="tooltiptext">{{
                    $t("billing.country_tooltip_text")
                  }}</span>
                </div>
              </div>
            </section>
            <section
              class="flex flex-col gap-2"
              v-if="
                companyOrPrivatePerson === 'company' && 
                orderData.value.invoiceCountry === 'Magyarország | Hungary'
              ">
              <label for="tax_number" class="primary-label">{{
                $t("billing.tax_number")
              }}</label>
              <div class="relative flex items-center w-full gap-2">
                <InputMask
                  id="tax_number"
                  class="primary-input"
                  v-model="orderData.value.invoiceHUTaxNumber"
                  variant="filled"
                  mask="99999999-9-99"
                  placeholder=""
                />
                <div
                  class="tooltip btn primary-btn tooltip-wrapper tooltip-responsive-fix"
                >
                  ?
                  <span class="tooltiptext">{{
                    $t("billing.tax_number_tooltip_text")
                  }}</span>
                </div>
              </div>
            </section>
            <section class="flex flex-col gap-2">
              <label for="postalCode" class="primary-label">{{
                $t("billing.zip_code")
              }}</label>
              <div class="relative w-full flex gap-2 items-center">
                <AutoComplete
                  class="w-full"
                  id="postalCode"
                  v-model="orderData.value.invoicePostalCode"
                  :suggestions="postalCodeDataSuggestions"
                  @complete="fetchPostalCodeSuggestions"
                  @change="onPostalCodeSelection" field="label"
                  :placeholder="$t('billing.zip_code_placeholder')"
                />
                <div
                  class="tooltip btn primary-btn tooltip-wrapper tooltip-responsive-fix"
                >
                  ?
                  <span class="tooltiptext">{{
                    $t("billing.zip_code_tooltip_text")
                  }}</span>
                </div>
              </div>
            </section>
            <section class="flex flex-col gap-2">
              <label for="city" class="primary-label">{{
                $t("billing.city")
              }}</label>
              <div class="relative w-full flex gap-2 items-center">
                <InputText
                  class="primary-input"
                  id="city"
                  type="city"
                  v-model="orderData.value.invoiceCity"
                  aria-describedby="city"
                />
                <div
                  class="tooltip btn primary-btn tooltip-wrapper tooltip-responsive-fix"
                >
                  ?
                  <span class="tooltiptext">{{
                    $t("billing.city_tooltip_text")
                  }}</span>
                </div>
              </div>
            </section>
            <section class="flex flex-col gap-2">
              <label for="street" class="primary-label">{{
                $t("billing.address")
              }}</label>
              <div class="relative w-full flex gap-2 items-center">
                <InputText
                  class="primary-input"
                  id="street"
                  type="street"
                  v-model="orderData.value.invoiceStreetAddress"
                  aria-describedby="street"
                />
                <div
                  class="tooltip btn primary-btn tooltip-wrapper tooltip-responsive-fix"
                >
                  ?
                  <span class="tooltiptext">{{
                    $t("billing.address_tooltip_text")
                  }}</span>
                </div>
              </div>
            </section>
          </div>
        </section>
        <section class="flex items-center flex-wrap justify-center gap-4">
          <Button class="btn-gray" @click="goBack">{{
            $t("type.back")
          }}</Button>
          <Button class="btn btn-green cursor-pointer" @click="sendForm" :disabled="loading" :class="{ 'btn-disabled': loading }">
            <span v-if="!loading">{{ $t("type.next") }}</span>
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
import { phonePrefixes } from '@/data/phone_prefix';
const route = useRoute();
import { useRouter } from "nuxt/app";
const router = useRouter();
import { ref, computed, watch, reactive } from "vue";
import { useRoute } from "nuxt/app";
import { uuid } from "vue-uuid";
import invoiceCountries  from "~/data/invoice_countries";
import type { GetOrderResponse } from "~/types/types";
import type {
  InvoiceAddressData,
  InvoiceAddressResponse,
  AutoCompleteCompleteEvent,
PostalCodeResponse,
PostalCodeData,
Suggestion,
PostalCodeChangeEvent,
} from "~/types/purchaseTypes";
const { t, locale } = useI18n();

const categoryCookie = useCookie('category');
const durationTypeCookie = useCookie('durationType');

const category = ref(categoryCookie.value);
const vignetteCategory = ref(categoryCookie.value);
const durationType = ref(durationTypeCookie.value);

const orderId = useCookie("orderId", {
  watch: "shallow",
  priority: "high",
  maxAge: 2592000000,
});
const cartKey = useCookie("cartKey");

if (cartKey.value == null) {
  cartKey.value = uuid.v4();
}
//cartKey.value = "3fa85f64-5717-4562-b3fc-2c963f66afa8";
// Betöltjük a korábbi order adatait, ha van order-id-nk.


const config = useRuntimeConfig();
const commonApiEndpoint = config.public.apiEndpoint.webshopEndpoint+ "/GetOrder";

/* let orderData = {
  value: {
    needInvoice: false,
    userEmail: "",
    invoiceName: "", // ensure this property exists in the GetOrderResponse type
  },
} as GetOrderResponse; */

let orderData = reactive({
  value: {
    needInvoice: false,
    userEmail: "",
    invoiceName: "",
    invoiceCity: "",
    invoiceStreetAddress: "",
    invoiceCountry: "Magyarország | Hungary",
    invoicePostalCode: "",
    invoiceHUTaxNumber: "",
    // more
  },
} as GetOrderResponse);


const vatInvoiceChecked = ref(
  orderData == null ? false : orderData.value?.needInvoice
);

const companyOrPrivatePerson = ref("");

watch(companyOrPrivatePerson, (newVal, oldVal) => {
if (newVal == "privatePerson")
{
  orderData.value.invoiceHUTaxNumber = "";
}
});

 watch(vatInvoiceChecked, (newVal, oldVal) => {
  if (!newVal) {
    orderData.value.needInvoice = false;
    orderData.value.invoiceName = "";
    orderData.value.invoiceCity = "";
    orderData.value.invoiceStreetAddress = "";
    orderData.value.invoiceCountry = "Magyarország | Hungary";
    orderData.value.invoicePostalCode = "";
    orderData.value.invoiceHUTaxNumber = "";
    orderData.value.invoiceCity = "";
    companyOrPrivatePerson.value = "";
    orderData.value.companyName = "";
    selectedCountry.value = "Magyarország | Hungary ";
  }
});

/* const companyOrPrivatePerson = ref(
  orderData == null
    ? ""
    : orderData.value?.invoiceHUTaxNumber == null
    ? "privatePerson"
    : "company"
);
 */

/* if (orderId.value != null) {
  orderData = await $fetch<GetOrderResponse>(
    `${commonApiEndpoint}?OrderId=${orderId.value}`
  );
} */

if (orderId.value != null) {
  const fetchedData = await $fetch<GetOrderResponse>(
    `${commonApiEndpoint}?OrderId=${orderId.value}`
  );
  Object.assign(orderData.value, fetchedData.value);
  vatInvoiceChecked.value = fetchedData.value.needInvoice;
  companyOrPrivatePerson.value = fetchedData.value.invoiceHUTaxNumber == null ? "privatePerson" : "company";
  orderData.value.companyName = orderData.value.invoiceName;
}

// -------------------------------------- AutoCompletes -------------------------------------------


const companyNameSuggestions = ref<InvoiceAddressData[]>([]);

const fetchCompanyNameSuggestions = async (
  event: AutoCompleteCompleteEvent
) => {
  const query = event.query;

  if (!query || query.length < 2) return;

  const companyNamesEndpoint = config.public.apiEndpoint.webshopEndpoint+ `/ListInvoiceAddressesByNamePart?InvoiceName=${query}`;
  try {
    const response = await fetch(companyNamesEndpoint);
    const data = (await response.json()) as InvoiceAddressResponse;

    if (data.isSuccess) {
      companyNameSuggestions.value = data.value.invoiceAddressData;
      orderData.value.invoiceName = query;
    } else {
      console.error("Error fetching company names:", data.error);
    }
  } catch (error) {
    console.error("Network error:", error);
  }
};

const onCompanySelect = (event: { value: InvoiceAddressData }) => {
  if (event.value.companyName != null) {
    const selectedCompany = event.value;
    orderData.value.invoiceName = selectedCompany.companyName;
    orderData.value.invoiceCity = selectedCompany.invoiceCity;
    orderData.value.invoiceStreetAddress = selectedCompany.invoiceStreetAddress;
    orderData.value.invoiceHUTaxNumber = selectedCompany.invoiceHUTaxNumber;
    orderData.value.invoiceCountry = "Magyarország | Hungary";
    selectedCountry.value = "Magyarország | Hungary";
    orderData.value.invoicePostalCode = selectedCompany.invoicePostalCode;
  }
};

const postalCodeDataSuggestions = ref<Suggestion[]>([]);

// Fetch postalcode data
async function fetchPostalCodeSuggestions(event: PostalCodeChangeEvent) {
  const query = event.query;
  if (!query) {
    console.error("No query provided for postal code suggestions.");
    return;
  }

  const endpoint = config.public.apiEndpoint.webshopEndpoint+ `/ListCityByPostalCodePart?InvoicePostalCode=${query}`;
  try {
    const response = await fetch(endpoint);
    const data = (await response.json()) as PostalCodeResponse;

    if (data.isSuccess && data.value.postalCodeData) {
      postalCodeDataSuggestions.value = data.value.postalCodeData.map((item: PostalCodeData) => ({
        label: `${item.postalCode} ${item.city}`,
        value: item.postalCode,
        city: item.city
      }));
    } else {
      console.error('Error fetching postalcode data:', data.error.message);
    }
  } catch (error) {
    console.error('Network error:', error);
  }
}

const onPostalCodeSelection = (event: { value: Suggestion }) => {
  if (!event.value || typeof event.value !== 'object' || !event.value.value || !event.value.city) {
   return;
  }
  
  orderData.value.invoicePostalCode = event.value.value; // Update the postalcode
  orderData.value.invoiceCity = event.value.city; // Update the city
}

// -------------------------------------- AutoCompletes END -------------------------------------------




const errorMessage = ref("");

const selectedCountryPhonePrefix = ref(orderData.value?.phonePrefix);
const numbers = ref(phonePrefixes);


const currentLanguage = ref(locale);
watch(
  () => route.params.lang,
  (newLang) => {
    currentLanguage.value = Array.isArray(newLang)
      ? newLang[0]
      : newLang || "en";
  },
  { immediate: true }
);

const selectedCountry = ref(orderData.value?.invoiceCountry);

const pageUri = computed(() => {
  const slug = (route.params.slug as string) || "";
  return `${encodeURIComponent(slug)}`;
});

const apiEndpoint =
config.public.apiEndpoint.widgets;
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

const loading = ref(false);

/* const validatePostalCode = (country: string, postalCode: string): boolean => {
  if (country === "Magyarország | Hungary" && postalCode.length !== 4) {
    console.log("HUNGARY");
    return false;
  }
  if (country !== "Magyarország | Hungary" && postalCode.length === 0) {
    console.log("Another COUNTRY");
    return false;
  }
  return true;
}; */

async function sendForm() {

  if (vatInvoiceChecked.value && companyOrPrivatePerson.value == "") {
    errorMessage.value = t("billing.billing_type_required");
    return;
  }

/*   if (!validatePostalCode(selectedCountry.value, orderData.value.invoicePostalCode)) {
    errorMessage.value = t("billing.invalid_postal_code");
    return;
  } */

  loading.value = true;

  const createOrderEndpoint =
  config.public.apiEndpoint.webshopEndpoint+ "/CreateOrder";
  const response = await $fetch<GetOrderResponse>(createOrderEndpoint, {
    method: "POST",
    body: {
      orderId: orderId.value,
      cartKey: cartKey.value,
      sessionId: "string",
      clientId: "string",
      userEmail: orderData.value.userEmail,
      phonePrefix: selectedCountryPhonePrefix.value,
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
      errorMessage.value = response.error.message.replaceAll(";","<br />").replaceAll("|","<br />");

      if (errorMessage.value == "Cart not exists!")
      {
        cartKey.value = null;
        orderId.value = null;
        goBack();
      }
    }
    window.scrollTo(0, 0);
  } else {
    orderId.value = response.value.orderId;
    navigateTo("/" + currentLanguage.value + "/purchase/confirm");
  }
  loading.value = false;
}

const goBack = () => {
  router.back();
};

onMounted(() => {
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({'site_lang': currentLanguage.value});
})
</script>
