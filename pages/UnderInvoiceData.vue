<template>
  <main class="container mx-auto px-4 lg:px-0 mt-24 purchase-step-3">
    <header class="flex justify-center py-5">
      <img
        class="w-full hidden sm:block"
        src="../public/img/purchase/under-invoice-data-line_hu-HU.svg"
        alt="autópálya-matrica"
      />
      <img
        class="w-full block sm:hidden"
        src="../public/img/purchase/under-invoice-data-line_hu-HU.svg"
        alt="autópálya-matrica"
      />
    </header>
    <form class="pb-10 max-w-[600px] mx-auto">
      <h1 class="purchase-h1">
        <img
          class="w-[45px]"
          src="../public/img/purchase/D1.svg"
          alt="autópálya-matrica"
        />
        <span class="ml-2">Számlázási adatok megadása</span>
      </h1>
      <div class="w-full mx-auto flex flex-col gap-4">
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
          </div>
          <div
            class="my-5 inline-flex flex-wrap gap-2 text-center justify-center"
          >
            <img
              src="../public/img/purchase/danger-icon.svg"
              alt="Hiba történt"
              class="w-5 h-5"
              i-amphtml-layout="fixed"
              style="width: 20px; height: 20px"
            />
            <p class="error-message my-0">
              A telefonszám és az emailcím megadása kitöltése kötelező!
            </p>
          </div>
          <div
            class="my-5 inline-flex flex-wrap gap-2 text-center justify-center"
          >
            <img
              src="../public/img/purchase/danger-icon.svg"
              alt="Hiba történt"
              class="w-5 h-5"
              i-amphtml-layout="fixed"
              style="width: 20px; height: 20px"
            />
            <p class="error-message my-0">
              A telefonszám megadása kitöltése kötelező!
            </p>
          </div>
        </section>
        <section class="card flex items-center gap-2">
          <Checkbox
            id="vatInvoice"
            v-model="vatInvoiceChecked"
            :binary="true"
          />
          <label for="vatInvoice" class="primary-label">
            I would like a VAT invoice
          </label>
        </section>
        <section v-if="vatInvoiceChecked">
          <div class="flex items-center gap-4 justify-center">
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
              />
              <label for="privatePerson" class="primary-label"
                >Private person</label
              >
            </div>
          </div>
          <div>
            <!-- Section visible only when 'privatePerson' is selected -->
            <div v-if="companyOrPrivatePerson === 'privatePerson'">
              <section class="card flex flex-col gap-2">
                <label for="name" class="primary-label">Name</label>
                <InputText
                  class="primary-input"
                  id="name"
                  type="text"
                  v-model="companyName"
                  aria-describedby="name"
                />
              </section>
            </div>
            <!-- Section visible only when 'Company' is selected -->
            <section v-if="companyOrPrivatePerson === 'company'">
              <section class="card flex flex-col gap-2">
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
              </section>
            </section>
            form jönide
          </div>
        </section>
        <section class="flex items-center flex-wrap justify-center gap-4">
          <a class="btn-gray" href="/">Vissza</a>
          <button class="btn-green" type="submit">Következő</button>
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
const emailValue = ref(null);
const phoneValue = ref(null);
const companyName = ref(null);
const companyOrPrivatePerson = ref("");

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
