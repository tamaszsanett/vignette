<template>
  <main class="container mx-auto px-4 lg:px-0 mt-24 purchase-step-2">
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
    <form
      class="pb-4 max-w-[800px] mx-auto"
      v-for="(item, i) in formData.multiples"
      :key="i"
    >
      <h1 class="purchase-h1">
        <img
          class="w-[45px]"
          :src="'/img/purchase/' + category + '.svg'"
          :alt="category + ' ' + $t('type.image.alt_vignette')"
        />
        <div class="flex items-center space-x-2">
          <span>{{ vignetteCategory }} -</span>
          <span v-if="durationType === 'WEEK'"
            >{{ $t("type.title.weekly") }} ({{ $t("type.title.ten_days") }})
            {{ $t("type.title.after_title") }}</span
          >
          <span v-if="durationType === 'YEAR_11'"
            >{{ $t("type.title.year_11") }}
            {{ $t("type.title.after_title") }}</span
          >
          <span v-if="durationType === 'YEAR'"
            >{{ $t("type.title.annual") }}
            {{ $t("type.title.after_title") }}</span
          >
          <span v-if="durationType === 'MONTH'"
            >{{ $t("type.title.monthly") }}
            {{ $t("type.title.after_title") }}</span
          >
          <!-- more condition here -->
        </div>
      </h1>
      <div
        v-if="item.formShowError"
        class="my-2 w-full inline-flex flex-wrap gap-2 text-center justify-center"
      >
        <img
          src="/img/purchase/danger-icon.svg"
          alt="Hiba történt"
          class="w-5 h-5"
          style="width: 20px; height: 20px"
        />
        <p class="error-message my-0">{{ emptyMessage }}</p>
      </div>
      <div
        v-if="item.invalidPlate"
        class="my-2 w-full inline-flex flex-wrap gap-2 text-center justify-center"
      >
        <img
          src="/img/purchase/danger-icon.svg"
          alt="Hiba történt"
          class="w-5 h-5"
          style="width: 20px; height: 20px"
        />
        <p class="error-message my-0">{{ item.invalidPlate }}</p>
      </div>
      <section class="mx-auto my-8" v-if="isRegionalVignette">
        <div class="card flex justify-center">
          <div class="grid grid-cols-2 gap-1 sm:gap-2 sm:gap-x-20">
            <div
              v-for="county of countyOptions"
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
      <div class="w-full">
        <div class="flex flex-col gap-4">
          <div
            class="relative"
            v-if="
              formData.multiples.length > 1 &&
              formData.multiples[i] != formData.multiples[0]
            "
          >
            <hr class="dashed-hr my-8" />
            <button
              @click.prevent="remove(i)"
              class="del absolute top-10 right-0 lg:top-4 lg:-right-10"
            ></button>
          </div>
          <section
            class="card flex flex-col gap-2 w-full md:max-w-[350px] mx-auto"
          >
            <label :for="'country_mark' + i" class="primary-label">{{
              $t("type.car_country")
            }}</label>
            <Dropdown
              :id="'country_mark-' + i"
              v-model="item.selectedCountry"
              :options="countryOptions"
              filter
              optionLabel="name"
              :placeholder="$t('type.select_country_placeholder')"
              class="w-full primary-select"
            >
              <template #value="slotProps">
                <div v-if="slotProps.value" class="flex items-center">
                  <div
                    :class="`mr-2 flag flag-${slotProps.value.countryCode.toLowerCase()}`"
                  >
                    {{ slotProps.value.countryCode }} |
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
                    :class="`mr-2 flag flag-${slotProps.option.countryCode.toLowerCase()}`"
                  >
                    {{ slotProps.option.countryCode }} |
                  </div>
                  <div>{{ slotProps.option.name }}</div>
                </div>
              </template>
            </Dropdown>
          </section>
          <section class="flex flex-col gap-2 w-full md:max-w-[350px] mx-auto">
            <label :for="'licence_plate-' + i" class="primary-label">{{
              $t("type.licence_plate_number")
            }}</label>
            <InputGroup class="relative">
              <InputGroupAddon>
                <div class="plate-num-before">
                  {{
                    item.selectedCountry
                      ? item.selectedCountry.countryCode
                      : "H"
                  }}
                </div>
              </InputGroupAddon>
              <InputText
                placeholder="e.g. ABC-123"
                :id="'licence_plate-' + i"
                v-model="item.plateNumber"
                class="primary-input group-input"
              />
            </InputGroup>
          </section>
          <section
            class="flex flex-col gap-2 w-full md:max-w-[350px] mx-auto"
            v-if="isCalendarVisible"
          >
            <label :for="'start_date-' + i" class="primary-label">{{
              $t("type.validity_period")
            }}</label>
            <div
              class="flex justify-center items-center space-x-4 calendar-wrapper"
            >
              <div>
                <Calendar
                  :id="'start_date-' + i"
                  v-model="startDate"
                  :min-date="minStartDate"
                  :manualInput="false"
                  dateFormat="yy-mm-dd"
                />
              </div>
              <div>
                <Calendar
                  :id="'end_date-' + i"
                  v-model="endDate"
                  :max-date="maxEndDate"
                  :disabled="true"
                  :manualInput="false"
                  dateFormat="yy-mm-dd"
                />
              </div>
            </div>
          </section>
          <section
            class="w-full md:max-w-[350px] mx-auto"
            v-if="durationType === 'MONTH'"
          >
            <label :for="'start_date-' + i" class="primary-label">{{
              $t("type.number_of_month")
            }}</label>
            <div class="w-full flex gap-2">
              <InputText
                type="button"
                class="monthType focus"
                id="monthType"
                data-days="30"
                data-id="monthType_1"
                value="1"
              />
              <InputText
                type="button"
                class="monthType"
                id="monthType"
                data-days="30"
                data-id="monthType_2"
                value="2"
              />
              <InputText
                type="button"
                class="monthType"
                id="monthType"
                data-days="30"
                data-id="monthType_3"
                value="3"
              />
              <InputText
                type="button"
                class="monthType"
                id="monthType"
                data-days="30"
                data-id="monthType_4"
                value="4"
              />
              <InputText
                type="button"
                class="monthType"
                id="monthType"
                data-days="30"
                data-id="monthType_5"
                value="5"
              />
            </div>
          </section>
          <button
            type="button"
            @click.pervent="addMore"
            class="base-link cursor-pointer flex w-auto justify-center mx-auto my-4"
          >
            {{ $t("type.add_another_widget") }}
          </button>
        </div>
        <PurchaseBox />
      </div>
    </form>
    <section class="flex items-center flex-wrap justify-center gap-4">
      <a class="btn-gray" href="/">{{ $t("type.back") }}</a>
      <button class="btn btn-green cursor-pointer" @click.prevent="validate">
        {{ $t("type.next") }}
      </button>
    </section>
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
const { t, locale } = useI18n();
const route = useRoute();
import { ref, computed, onMounted, watch } from "vue";
import { useAsyncData, useRoute } from "nuxt/app";
import { usePlateValidation } from "~/composables/usePlateValidation";
import { useVignetteInfo } from "~/composables/useVignetteInfo";
import { useVignetteEndDate } from "~/composables/useVignetteEndDate";
import type { FormData, Countries, Counties } from "~/types/purchaseTypes.ts";
import type { VignetteInfoResponse } from "~/types/types.ts";
import countries from "~/data/countries";
import counties from "~/data/counties";
const selectedCounties = ref(["Baranya"]);
const currentLanguage = ref(locale);
const category = route.params.category;

//countries select
const countryOptions = computed(() => {
  return countries[locale.value] || [];
});

//counties select
const countyOptions = computed(() => {
  return counties[locale.value] || [];
});

const formData = ref({
  multiples: [
    {
      selectedCountry: undefined,
      countryCode: "",
      plateNumber: "",
      startDate: new Date(),
      endDate: null,
      formShowError: false,
      invalidPlate: "",
    } as FormData,
  ],
});

const { validateAllPlates } = usePlateValidation(
  "https://test-gw.voxpay.hu/Webshop.Vignette/ValidatePlateNumber"
);

const emptyMessage = ref("");

const handleInputValidation = (index: number) => {
  const item = formData.value.multiples[index];
  if (item.plateNumber.trim() === "") {
    item.formShowError = true; // Show error if input is empty
    emptyMessage.value = t("type.empty_plate");
  } else {
    item.formShowError = false; // Hide error if input is not empty
  }
};

watch(
  () => formData.value.multiples.map((item) => item.plateNumber),
  (newValues) => {
    newValues.forEach((_, index) => handleInputValidation(index));
  },
  { deep: true }
);

// Monitor changes in formData to dynamically update the form state
/* watch(
  formData,
  () => {
    disabled.value = formData.value.multiples.some(
      (item) => !item.selectedCountry || item.plateNumber.trim() === ""
    );
  },
  { deep: true }
); */

const addMore = () => {
  formData.value.multiples.push({
    selectedCountry: undefined,
    countryCode: "",
    plateNumber: "",
    startDate: new Date(),
    endDate: new Date(),
    formShowError: false,
    invalidPlate: "",
  });
};

const remove = (index: number) => {
  formData.value.multiples.splice(index, 1);
};

const validate = async () => {
  await validateAllPlates(formData.value.multiples, t);
};

watch(
  () => formData.value.multiples,
  (newValues) => {
    newValues.forEach((item, index) => {
      if (
        item.selectedCountry &&
        item.selectedCountry.countryCode !==
          formData.value.multiples[index].countryCode
      ) {
        formData.value.multiples[index].countryCode = item.selectedCountry.countryCode;
      }
    });
  },
  { deep: true }
);
//plate validation end

//vignette info
const vignetteInfo = ref<VignetteInfoResponse | null>(null);

const { endDate, fetchEndDate } = useVignetteEndDate();

const startDate = ref(new Date());

const numberOfVignettes = ref(1); // Default to 1, modify as necessary
const minStartDate = computed(() => {
  return vignetteInfo.value
    ? new Date(vignetteInfo.value.value.vignetteType.validityStartMin)
    : new Date();
});
const maxEndDate = computed(() => {
  return vignetteInfo.value
    ? new Date(vignetteInfo.value.value.vignetteType.validityStartMax)
    : new Date();
});

// Watch for changes in startDate or numberOfVignettes and update the end date
watch(
  [startDate, numberOfVignettes],
  async () => {
    if (vignetteInfo.value) {
      await fetchEndDate(
        vignetteInfo.value.value.vignetteType.vignetteCode,
        startDate.value,
        numberOfVignettes.value
      );
    }
  },
  { immediate: true }
);

const { fetchVignetteInfo } = useVignetteInfo();

vignetteInfo.value = await fetchVignetteInfo();

await fetchEndDate(
  vignetteInfo.value.value.vignetteType.vignetteCode,
  startDate.value,
  numberOfVignettes.value
);

const isCalendarVisible = computed(() => {
  return (
    vignetteInfo.value?.value.vignetteType.validityStartAcceptable ?? false
  );
});

const isRegionalVignette = computed(
  () => vignetteInfo.value?.value.vignetteType.durationType === "YEAR_11"
);
const vignetteCategory = computed(
  () => vignetteInfo.value?.value.vignetteType.category || ""
);
const durationType = computed(
  () => vignetteInfo.value?.value.vignetteType.durationType || ""
);

const pageUri = computed(() => {
  return `${encodeURIComponent(
    "/vignette/" + route.params.category + "/" + route.params.type
  )}`;
});

//widgetdata loading
const apiEndpoint =
  "https://test-core.voxpay.hu/CMS.Public.Gateway/api/GetWidgetsByPageUri";
const url = `${apiEndpoint}?PageUri=${pageUri.value.replaceAll(
  "%2C",
  "%2F"
)}&Localization=${currentLanguage.value}`;

const response = await $fetch<ApiResponse>(url);

useHead({
  title: response.value.title,
  htmlAttrs: {
    lang: currentLanguage,
  },
  meta: [
    { name: "language", content: currentLanguage },
    { name: "og:title", content: response.value.title },
    { name: "description", content: response.value.metaDescription },
    { name: "og:description", content: response.value.metaDescription },
  ],
  link: [
    { rel: "canonical", href: response.value.alternateLinks.en },
    {
      rel: "alternate",
      href: response.value.alternateLinks.en,
      hreflang: "en",
    },
    {
      rel: "alternate",
      href: response.value.alternateLinks.de,
      hreflang: "de-DE",
    },
    {
      rel: "alternate",
      href: response.value.alternateLinks.ro,
      hreflang: "ro-RO",
    },
    {
      rel: "alternate",
      href: response.value.alternateLinks.sk,
      hreflang: "sk-SK",
    },
  ],
});

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

watch(
  () => route.params.lang,
  (newLang) => {
    currentLanguage.value = Array.isArray(newLang)
      ? newLang[0]
      : newLang || "en";
  },
  { immediate: true }
);
</script>
