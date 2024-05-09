<template>
  <main class="container mx-auto px-4 lg:px-0 mt-24 purchase-step-3">
    <header class="flex justify-center py-5">
      <img
        class="w-full hidden sm:block"
        src="/img/purchase/desktop/under-invoice-data-line_en_EN.svg"
        alt="autópálya-matrica"
      />
      <img
        class="w-full block sm:hidden"
        src="/img/purchase/mobile/under-invoice-data-line_en_EN.svg"
        alt="autópálya-matrica"
      />
    </header>
    <form class="pb-10 max-w-[450px] mx-auto">
      <h1 class="purchase-h1">
        <img
          class="w-[45px]"
          src="/img/purchase/D1.svg"
          alt="autópálya-matrica"
        />
        <span class="ml-2">Enter billing information</span>
      </h1>
      <div class="w-full mx-auto flex flex-col gap-4">
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
        <section class="card flex flex-col gap-2">
          <label for="email" class="primary-label">E-mail</label>
          <InputText
            class="primary-input"
            id="email"
            type="email"
            v-model="emailValue"
            aria-describedby="email"
          />
        </section>
        <section class="flex flex-col gap-2">
          <label for="PhoneNumberWrapper" class="primary-label"
            >Phone number</label
          >
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
                    <div
                      :class="`mr-2 flag flag-${slotProps.value.code.toLowerCase()}`"
                    >
                      {{ slotProps.value.number }}
                    </div>
                  </div>
                  <span v-else>
                    {{ slotProps.placeholder }}
                  </span>
                </template>
                <template #option="slotProps">
                  <div class="flex items-center">
                    <div
                      :class="`mr-2 flag flag-${slotProps.option.code.toLowerCase()}`"
                    >
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
              v-model="phoneValue"
              aria-describedby="phone-number"
              class="primary-input"
            />
            <button class="tooltip btn primary-btn tooltip-wrapper">
              ?
              <span class="tooltiptext"
                >We will send the sticker confirmation to this address</span
              >
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
            I would like a VAT invoice
          </label>
        </section>
        <section class="w-full">
          <p class="text-xs m-0 font-bold">
            We will not be able to issue an invoice afterwards.
          </p>
          <p class="text-base-orange text-xs m-0 font-bold">
            Without requesting a VAT invoice, only bank card payment is possible
            on our site
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
              <label for="company" class="primary-label">Company </label>
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
                >Private person</label
              >
            </div>
          </div>
          <div class="w-full flex flex-col gap-4">
            <!-- Section visible only when 'privatePerson' is selected -->
            <div v-if="companyOrPrivatePerson === 'privatePerson'">
              <section class="card flex items-center gap-2">
                <div class="flex flex-col w-full gap-2">
                  <label for="name" class="primary-label">Name</label>
                  <InputText
                    class="primary-input"
                    id="name"
                    type="text"
                    v-model="companyName"
                    aria-describedby="name"
                  />
                </div>
                <button class="tooltip btn primary-btn tooltip-wrapper">
                  ?
                  <span class="tooltiptext">Your name</span>
                </button>
              </section>
            </div>
            <!-- Section visible only when 'Company' is selected -->
            <section v-if="companyOrPrivatePerson === 'company'">
              <section class="card flex items-center gap-2">
                <div class="flex flex-col w-full gap-2">
                  <label for="companyName" class="primary-label"
                    >Company name</label
                  >
                  <InputText
                    class="primary-input"
                    id="companyName"
                    type="text"
                    v-model="emailValue"
                    aria-describedby="name"
                  />
                </div>
                <button class="tooltip btn primary-btn tooltip-wrapper">
                  ?
                  <span class="tooltiptext">Billing Name/Company Name</span>
                </button>
              </section>
            </section>
            <section class="card flex flex-col gap-2">
              <label for="country" class="primary-label">Country</label>
              <Dropdown
                id="country"
                v-model="selectedCountry"
                :options="countries"
                filter
                optionLabel="name"
                placeholder="Select a Country"
                class="w-full primary-select"
              >
                <template #value="slotProps">
                  <div v-if="slotProps.value" class="flex items-center">
                    <div
                      :class="`mr-2 flag flag-${slotProps.value.code.toLowerCase()}`"
                    >
                      {{ slotProps.value.code }} |
                    </div>
                    <div>{{ slotProps.value.name }}</div>
                  </div>
                  <span v-else>
                    {{ slotProps.placeholder }}
                  </span>
                </template>
                <template #option="slotProps">
                  <div class="flex items-center">
                    <div
                      :class="`mr-2 flag flag-${slotProps.option.code.toLowerCase()}`"
                    >
                      {{ slotProps.option.code }} |
                    </div>
                    <div>{{ slotProps.option.name }}</div>
                  </div>
                </template>
              </Dropdown>
            </section>
            <section
              v-if="
                companyOrPrivatePerson === 'company' &&
                selectedCountry?.code === 'HU'
              "
            >
              <section class="card flex flex-col gap-2">
                <label for="companyName" class="primary-label"
                  >Tax Number</label
                >
                <InputMask
                  id="tax_number"
                  class="primary-input"
                  v-model="inputMaskValue"
                  variant="filled"
                  mask="99999999-9-99"
                  placeholder=""
                />
              </section>
            </section>
            <section class="card flex flex-col gap-2">
              <label for="postalCode" class="primary-label">Postal code</label>
              <AutoComplete
                id="postalCode"
                v-model="postalCodeValue"
                :suggestions="postalCodeItems"
                @complete="search"
              />
            </section>
            <section class="card flex flex-col gap-2">
              <label for="city" class="primary-label">City</label>
              <InputText
                class="primary-input"
                id="city"
                type="city"
                v-model="cityValue"
                aria-describedby="city"
              />
            </section>
            <section class="card flex flex-col gap-2">
              <label for="street" class="primary-label">Street</label>
              <InputText
                class="primary-input"
                id="street"
                type="street"
                v-model="cityValue"
                aria-describedby="street"
              />
            </section>
          </div>
        </section>
        <section class="flex items-center flex-wrap justify-center gap-4">
          <a class="btn-gray" href="/">Back</a>
          <NuxtLink to="/en/purchase/confirm" class="btn-green" type="submit"
            >Next</NuxtLink
          >
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
import { ref, computed } from "vue";
import { useRoute } from "nuxt/app";

const vatInvoiceChecked = ref(false);
const cityValue = ref(null);
const emailValue = ref(null);
const phoneValue = ref(null);
const companyName = ref(null);
const companyOrPrivatePerson = ref("privatePerson");
const inputMaskValue = ref("");

const selectedCountryPhonePrefix = ref();
const numbers = ref([
  { number: "+36", code: "HU" },
  { number: "+42", code: "SK" },
  { number: "+49", code: "DE" },
  { number: "+380", code: "UK" },
]);

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

const selectedCountry = ref();
const countries = ref([
  { name: "Hungary", code: "HU" },
  { name: "Slovakia", code: "SK" },
  { name: "Germany", code: "DE" },
  { name: "Ukrain", code: "UK" },
  { name: "Slovenia", code: "SLO" },
  { name: "Australia", code: "AU" },
  { name: "Brazil", code: "BR" },
  { name: "China", code: "CN" },
  { name: "Egypt", code: "EG" },
  { name: "France", code: "FR" },
  { name: "Germany", code: "DE" },
  { name: "India", code: "IN" },
  { name: "Japan", code: "JP" },
  { name: "Spain", code: "ES" },
  { name: "United States", code: "US" },
]);

const postalCodeValue = ref("");
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
</script>
