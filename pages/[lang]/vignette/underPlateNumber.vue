<template>
  <main class="container mx-auto px-4 lg:px-0 mt-24 purchase-step-2">
    <header class="flex justify-center py-5">
      <img
        class="w-full hidden sm:block"
        src="/img/purchase/desktop/under-plate-number-line_en_EN.svg"
        alt="autópálya-matrica"
      />
      <img
        class="w-full block sm:hidden"
        src="/img/purchase/mobile/under-plate-number-line_en-EN.svg"
        alt="autópálya-matrica"
      />
    </header>
    <form class="pb-10 max-w-[800px] mx-auto">
      <h1 class="purchase-h1">
        <img
          class="w-[45px]"
          src="/img/purchase/D1.svg"
          alt="autópálya-matrica"
        />
        <span class="ml-2">D1 - Monthly national highway sticker</span>
      </h1>
      <section class="mx-auto my-8">
        <div class="card flex justify-center">
          <div class="grid grid-cols-2 gap-1 sm:gap-2 sm:gap-x-20">
            <div
              v-for="county of counties"
              :key="county.key"
              class="flex items-center gap-x-2"
            >
              <Checkbox
                :id="'county-' + county.key"
                v-model="selectedCounties"
                :inputId="'county-' + county.key"
                name="county"
                :value="county.name"
              />
              <label
                class="primary-label text-sm md:text-base"
                :for="'county-' + county.key"
                >{{ county.name }}</label
              >
            </div>
          </div>
        </div>
      </section>
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
      <div class="w-full">
        <div
          class="flex flex-col gap-4"
          v-for="(item, i) in formData.multiples"
          :key="i"
        >
          <div class="relative" v-if="formData.multiples.length > 1 && formData.multiples[i] != formData.multiples[0]">
            <hr class="dashed-hr my-8" />
            <button
              @click.prevent="remove(i)"
              class="del absolute top-4 -right-10"
            ></button>
          </div>
          <section class="card flex flex-col gap-2 w-full md:max-w-[350px] mx-auto">
            <label :for="'country_mark' + i" class="primary-label"
              >Nationality mark</label
            >
            <Dropdown
              :id="'country_mark-' + i"
              v-model="item.selectedCountry"
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
          <section class="flex flex-col gap-2 w-full md:max-w-[350px] mx-auto">
            <label :for="'licence_plate-' + i" class="primary-label"
              >License plate</label
            >
            <InputGroup class="relative">
              <InputGroupAddon>
                <div class="plate-num-before">H</div>
              </InputGroupAddon>
              <InputText
                placeholder="e.g. ABC-123"
                :id="'licence_plate-' + i"
                v-model="item.licensePlate"
                class="primary-input group-input"
              />
            </InputGroup>
          </section>
          <section class="flex flex-col gap-2 w-full md:max-w-[350px] mx-auto">
            <div
              class="flex justify-center items-center space-x-4 calendar-wrapper"
            >
              <div>
                <Calendar
                  :id="'start_date-' + i"
                  v-model="item.startDate"
                  :minDate="minDate"
                  :manualInput="false"
                />
              </div>
              <div>
                <Calendar
                  :id="'end_date-' + i"
                  v-model="item.endDate"
                  :disabled="true"
                  :manualInput="false"
                />
              </div>
            </div>
          </section>
        </div>
        <button type="button"
          @click.pervent="addMore"
          class="base-link cursor-pointer flex w-auto justify-center mx-auto my-8"
        >
          + add another vignette
        </button>
        <section class="flex items-center flex-wrap justify-center gap-4">
          <a class="btn-gray" href="/">Back</a>
          <NuxtLink
            to="/en/vignette/UnderInvoiceData"
            class="btn-green"
            type="submit"
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
import { ref, computed, onMounted, watch } from "vue";
import { useAsyncData, useRoute, useSeoMeta } from "nuxt/app";
import type { FormData } from '~/types/purchaseTypes.ts';

const DAYS_TO_ADD = 10;

const startDate = ref(new Date());
const endDate = ref<Date | null>(new Date(startDate.value.getTime() + DAYS_TO_ADD * 24 * 60 * 60 * 1000));
const minDate = ref(new Date());

const formData = ref({
  multiples: [
    {
      selectedCountry: undefined,
      licensePlate: "",
      startDate: startDate.value,
      endDate: endDate.value,
    }
  ] as FormData[],
});

const remove = (i: number) => {
  formData.value.multiples.splice(i, 1);
};

const addMore = () => {
  const today = new Date();
  formData.value.multiples.push({
    selectedCountry: undefined,
    licensePlate: "",
    startDate: today,
    endDate: new Date(today.getTime() + DAYS_TO_ADD * 24 * 60 * 60 * 1000),
  });
};

// API date
/* async function fetchExternalEndDate() {
  return { endDate: Date.parse('2024-05-30') };
} */

onMounted(async () => {
  /* const response = await fetchExternalEndDate(); */
  // Update endDate for the first element in formData.multiples
  if (formData.value.multiples.length > 0) {
    formData.value.multiples[0].endDate = new Date(startDate.value.getTime() + DAYS_TO_ADD * 24 * 60 * 60 * 1000 );
  }
});

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

const counties = ref([
  { name: "Bács-Kiskun county", key: "Bács-Kiskun" },
  { name: "Jász-Nagykun-Szolnok county", key: "Jász-Nagykun-Szolnok" },
  { name: "Baranya county", key: "Baranya" },
  { name: "Komárom-Esztergom county", key: "Komárom-Esztergom" },
  { name: "Békés county", key: "Békés" },
  { name: "Pest county", key: "Pest" },
  { name: "Borsod-Abaúj-Zemplén county", key: "Borsod-Abaúj-Zemplén" },
  { name: "Somogy county", key: "Somogy" },
  { name: "Csongrád county", key: "Csongrád" },
  { name: "Szabolcs-Szatmár-Bereg county", key: "Szabolcs-Szatmár-Bereg" },
  { name: "Fejér county", key: "Fejér" },
  { name: "Tolna county", key: "Tolna" },
  { name: "Győr-Moson-Sopron county", key: "Győr-Moson-Sopron" },
  { name: "Vas county", key: "Vas" },
  { name: "Hajdú-Bihar county", key: "Hajdú-Bihar" },
  { name: "Veszprém county", key: "Veszprém" },
  { name: "Heves county", key: "Heves" },
  { name: "Zala county", key: "Zala" },
]);

const selectedCounties = ref(["Baranya"]);

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
