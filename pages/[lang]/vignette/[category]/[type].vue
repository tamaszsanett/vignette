<template>
  <main class="container mx-auto px-4 lg:px-0 mt-24 purchase-step-2">
    <header class="flex justify-center py-5">
      <img class="w-full hidden sm:block" :src="`/img/purchase/desktop/${$t('type.image.desktop_path')}`"
        alt="autópálya-matrica" />
      <img class="w-full block sm:hidden" :src="`/img/purchase/mobile/${$t('type.image.mobile_path')}`"
        alt="autópálya-matrica" />
    </header>
    <section class="max-w-[800px] mx-auto">
      <h1 class="purchase-h1">
        <img class="w-[45px]" :src="'/img/purchase/' + category + '.svg'"
          :alt="category + ' ' + $t('type.image.alt_vignette')" />
        <div class="flex items-center space-x-2">
          <span>{{ vignetteCategory }} -</span>
          <span v-if="durationType === 'DAY'">{{ $t("type.title.daily") }} ({{ $t("type.title.one_day") }}) {{
            $t("type.title.after_title") }}</span>
          <span v-if="durationType === 'WEEK'">{{ $t("type.title.weekly") }} ({{ $t("type.title.ten_days") }}) {{
            $t("type.title.after_title") }}</span>
          <span v-if="durationType === 'YEAR_11'">{{ $t("type.title.year_11") }} {{ $t("type.title.after_title")
            }}</span>
          <span v-if="durationType === 'YEAR'">{{ $t("type.title.annual") }} {{ $t("type.title.after_title") }}</span>
          <span v-if="durationType === 'MONTH'">{{ $t("type.title.monthly") }} {{ $t("type.title.after_title") }}</span>
        </div>
      </h1>
      <div class="mx-auto my-8" v-if="isRegionalVignette">
        <div class="card flex justify-center">
          <div class="grid grid-cols-2 gap-1 sm:gap-2 sm:gap-x-20">
            <div v-for="county of countyOptions" :key="category + county.key" class="flex items-center gap-x-2">
              <Checkbox :input-id="category + county.key" v-model="selectedCounties" name="counties" :value="category + county.key" />
              <label class="primary-label text-sm md:text-base" :for="category + county.key">{{ county.name }}</label>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full md:max-w-[350px] mx-auto mb-5" v-if="durationType === 'MONTH'">
        <label for="" class="primary-label">{{
          $t("type.number_of_month")
        }}</label>
        <div class="w-full flex gap-2">
          <InputText type="button" v-for="n in 5" :key="n" id="monthType" class="monthType" :value="n"
            :class="{ focus: numberOfVignettes === n }" @click="numberOfVignettes = n" />
        </div>
      </div>
    </section>
    <form class="pb-4 max-w-[800px] mx-auto" v-for="(item, i) in formData.multiples" :key="i">
      <div class="w-full">
        <div class="flex flex-col gap-4">
          <div class="relative" v-if="
            formData.multiples.length > 1 &&
            formData.multiples[i] != formData.multiples[0]
          ">
            <hr class="dashed-hr my-8" />
            <button @click.prevent="remove(i)" class="del absolute top-10 right-0 lg:top-4 lg:-right-10"></button>
          </div>
          <div v-if="item.formShowError" class="my-2 w-full inline-flex flex-wrap gap-2 text-center justify-center">
            <img src="/img/purchase/danger-icon.svg" alt="Hiba történt" class="w-5 h-5"
              style="width: 20px; height: 20px" />
            <p class="error-message my-0">{{ emptyMessage }}</p>
          </div>
          <div v-if="item.invalidPlate" class="my-2 w-full inline-flex flex-wrap gap-2 text-center justify-center">
            <img src="/img/purchase/danger-icon.svg" alt="Hiba történt" class="w-5 h-5"
              style="width: 20px; height: 20px" />
            <p class="error-message my-0">{{ item.invalidPlate }}</p>
          </div>
          <section v-if="isRegionalVignette">
            <div v-if="!isAtLeastOneCountySelected"
              class="my-2 w-full inline-flex flex-wrap gap-2 text-center justify-center">
              <img src="/img/purchase/danger-icon.svg" alt="Hiba történt" class="w-5 h-5"
                style="width: 20px; height: 20px" />
              <p class="error-message my-0">
                {{ errorCountiesMessage }}
              </p>
            </div>
          </section>
          <section class="card flex flex-col gap-2 w-full md:max-w-[350px] mx-auto">
            <label :for="'country_mark' + i" class="primary-label">{{
              $t("type.car_country")
            }}</label>
            <Dropdown :id="'country_mark-' + i" v-model="item.selectedCountry" :options="countryOptions" filter
              optionLabel="name" :placeholder="$t('type.select_country_placeholder')" class="w-full primary-select">
              <template #value="slotProps">
                <div v-if="slotProps.value" class="flex items-center">
                  <div :class="`mr-1 flag flag-${slotProps.value.countryCode.toLowerCase()}`">
                    {{ slotProps.value.countryCode }}
                    <span class="px-1">|</span>
                  </div>
                  <div>{{ slotProps.value.name }}</div>
                </div>
                <span v-else>
                  {{ slotProps.placeholder }}
                </span>
              </template>
              <template #option="slotProps">
                <div class="flex items-center">
                  <div :class="`mr-2 flag flag-${slotProps.option.countryCode.toLowerCase()}`">
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
                <div class="plate-num-before-non-eu" :class="{
                  'plate-num-before-eu':
                    item.selectedCountry && isEuCountry(item.selectedCountry),
                  'plate-num-before-non-eu':
                    item.selectedCountry &&
                    !isEuCountry(item.selectedCountry),
                }">
                  {{
                    item.selectedCountry
                      ? item.selectedCountry.countryCode
                      : "H"
                  }}
                </div>
              </InputGroupAddon>
              <InputText placeholder="e.g. ABC-123" :id="'licence_plate-' + i" v-model="item.plateNumber"
                class="primary-input group-input" />
            </InputGroup>
          </section>
          <section class="flex flex-col gap-2 w-full md:max-w-[350px] mx-auto">
            <label :for="'start_date-' + i" class="primary-label">{{
              $t("type.validity_period")
            }}</label>
            <div class="flex justify-center items-center space-x-4 calendar-wrapper">
              <div>
                <Calendar :id="'start_date-' + i" v-model="item.startDate" :min-date="minStartDate"
                  :max-date="maxEndDate" :disabled="isCalendarDisabled" :manualInput="false" dateFormat="yy-mm-dd" dataType="string" />
              </div>
              <div>
                <Calendar :id="'end_date-' + i" v-model="item.endDate" :disabled="true" :manualInput="false"
                  dateFormat="yy-mm-dd" />
              </div>
            </div>
          </section>
          <button v-if="lastAddedIndex === i" type="button" @click.prevent="addMore(i)"
            class="base-link cursor-pointer flex w-auto justify-center mx-auto my-4">
            {{ $t("type.add_another_widget") }}
          </button>
        </div>
        <PurchaseCalculator :title="`${$t('type.purchase_calculator.title')}`" :list="calculatedVignettes"
          bgClass="additional-styles" />
      </div>
    </form>
    <section class="flex items-center flex-wrap justify-center gap-4">
      <a class="btn-gray" href="/">{{ $t("type.back") }}</a>
      <Button class="btn btn-green cursor-pointer" @click.prevent="validate">
        <span v-if="!loading">{{ $t("type.next") }}</span>
        <span class="h-5 w-5" v-else>
          <svg class="animate-spin h-5 w-5 mr-3 border-4 border-t-transparent border-green-500 rounded-full"
            viewBox="0 0 24 24">
          </svg>
        </span>
      </Button>
    </section>

    <template v-for="widget in widgets" :key="widget.widgetId">
      <div v-if="widget.widgetType === 'menuwidget'" :class="{ 'top-menu': widget.section === 'top' }">
        <SharedMenuWidget :menu-widget="widget.content" />
      </div>
    </template>
  </main>
</template>

<script setup lang="ts">
const { t, locale } = useI18n();
const route = useRoute();
import { ref, computed, onMounted, watch } from "vue";
import { useRoute } from "nuxt/app";
import { usePlateValidation } from "~/composables/usePlateValidation";
import { useVignetteInfo } from "~/composables/useVignetteInfo";
import { useCountiesValidation } from "~/composables/useCountiesValidation";
import type * as purchaseTypesTs from "~/types/purchaseTypes.ts";
import type { VignetteInfoResponse } from "~/types/types.ts";
import countries from "~/data/countries";
import counties from "~/data/counties";
import { uuid } from "vue-uuid";
import { useUpdateCartItem } from "~/composables/useUpdateCartItem";
const selectedCounties = ref<string[]>([]);
const currentLanguage = ref(locale);
const category = route.params.category;

// Get vignette info
//vignette info
const vignetteInfo = ref<VignetteInfoResponse | null>(null);
const { fetchVignetteInfo } = useVignetteInfo();
vignetteInfo.value = await fetchVignetteInfo();

// Load cart key from cookie
const cartKey = useCookie('cartKey');
const categoryFromCookie = useCookie('vignetteType');

// if (cartKey.value == null || categoryFromCookie.value != vignetteInfo.value?.value.vignetteType.vignetteCode) {
//   cartKey.value = uuid.v4();
//   const orderId = useCookie('orderId');
//   orderId.value = null;
// }
// else {
//   // TODO: Get cart info from server
// }
cartKey.value = uuid.v4();
  const orderId = useCookie('orderId');
  orderId.value = null;

// Trigger category type change
categoryFromCookie.value = vignetteInfo.value?.value.vignetteType.vignetteCode;

const numberOfVignettes = ref(1); // Default to 1, modify as necessary
// TODO: From cart
const isEuCountry = (country: any) => ["A", "B", "BG", "CY", "CZ", "D", "DK", "E", "EST", "FIN", "F", "GR", "HR", "H", "IRL", "I", "LT", "L", "LV", "M", "NA", "PL", "P", "RO", "S", "SLO", "SK"].includes(country.countryCode);

const { validateCounties, errorCountiesMessage, isAtLeastOneCountySelected } = useCountiesValidation(selectedCounties);

validateCounties();

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
      selectedCountry: countryOptions.value.find(
        (country) => country.countryCode === "H"
      ),
      countryCode: "H",
      plateNumber: "",
      startDate: new Date(),
      endDate: null,
      formShowError: false,
      invalidPlate: "",
      itemKey: uuid.v4()
    } as purchaseTypesTs.FormData,
  ],
});

const { validateAllPlates } = usePlateValidation("https://test-gw.voxpay.hu/Webshop.Vignette/ValidatePlateNumber");

const emptyMessage = ref("");

const handleInputValidation = (index: number) => {
  const item = formData.value.multiples[index];
  if (item){
  if (item.plateNumber.trim() === "") {
    item.formShowError = true; // Show error if input is empty
    emptyMessage.value = t("type.empty_plate");
  } else {
    item.formShowError = false; // Hide error if input is not empty
  }
}
};

// -------------------------------------- WATCH INPUT CHANGES -------------------------------------------

watch( // Watch PlateNumber changes
  () => formData.value.multiples.map((item) => item.selectedCountry),
  (newValues) => {
    newValues.forEach((_, index) => {
      formData.value.multiples[index].countryCode = _?.countryCode ?? "";
      if (formData.value.multiples[index].selectedCountry?.countryCode != newValues[index]?.countryCode)
      {
        console.log("countryCode");
        updateCartItem(index);
      }
    });
  },
  { deep: true }
);

watch( // Watch PlateNumber changes
  () => formData.value.multiples.map((item) => item.plateNumber),
  (oldValues, newValues) => {
    newValues.forEach((_, index) => {
      if (oldValues.length == newValues.length && oldValues[index] != newValues[index])
      {
        handleInputValidation(index);
        updateCartItem(index);
      }
    });
  },
  { deep: true }
);

watch( // Watch ValidityStart changes
  () => formData.value.multiples.map((item) => item.startDate),
  (oldValues, newValues) => {
    newValues.forEach(async (_, index) => {
      if (oldValues.length == newValues.length && oldValues[index] != newValues[index]) {
        await calculateEndDate(index);
        updateCartItem(index);
      }
    });
  },
  { deep: true }
);

watch(numberOfVignettes, (newValue, oldValue) => {
  console.log(oldValue + "::" + newValue);
  if (newValue !== oldValue) {
      updateMonthEndDate();
      if (newValue > oldValue) {
        // add to cart
        formData.value.multiples.forEach(async (item, index) => {
          useAddAnotherVignetteToCart(
            currentLanguage.value,
            item.itemKey,
            "EUR",
            vignetteInfo.value?.value.vignetteType.vignetteCode ?? "",
            vignetteInfo.value?.value.vignetteType.durationType ?? "",
            item.countryCode,
            item.plateNumber,
            item.startDate,
            item.endDate,
            vignetteInfo.value?.value.vignetteType.amount ?? 0,
            vignetteInfo.value?.value.vignetteType.transactionFee ?? 0,
            oldValue, newValue, selectedCounties.value
          );
        });
      }
      else if (oldValue > newValue) {
        // remove from cart
      }
  }
});

watch(selectedCounties, (newItems, oldItems) => {
  let removeable = oldItems.filter(x => !newItems.includes(x))[0];
  let newbie = newItems.filter(x => !oldItems.includes(x))[0];

  console.log(newbie);
  if (newbie) {
    formData.value.multiples.forEach(async (item, index) => {
      useAddAnotherVignetteToCart(
        currentLanguage.value,
        item.itemKey,
        "EUR",
        vignetteInfo.value?.value.vignetteType.vignetteCode ?? "",
        vignetteInfo.value?.value.vignetteType.durationType ?? "",
        item.countryCode,
        item.plateNumber,
        item.startDate,
        item.endDate,
        vignetteInfo.value?.value.vignetteType.amount ?? 0,
        vignetteInfo.value?.value.vignetteType.transactionFee ?? 0,
        0, numberOfVignettes.value, [newbie]
      );
    });
  }
  else if (removeable) {
    formData.value.multiples.forEach(async (item, index) => {
      useRemoveVignetteFromCart(
        item.itemKey,
        vignetteInfo.value?.value.vignetteType.durationType ?? "",
        numberOfVignettes.value,
        [removeable]
      )
    })
  }
})

// ------------------------------- ADD/REMOVE/MODIFY vignette blocks ----------------------------------------
const lastAddedIndex = ref(0);

let disableUpdate = ref(false);

const addMore = (index: number) => {
  disableUpdate.value = true;
  const newItem = {
    selectedCountry: countryOptions.value.find(
      (country) => country.countryCode === "H"
    ),
    countryCode: "H",
    plateNumber: "",
    startDate: new Date(),
    endDate: new Date(),
    formShowError: false,
    invalidPlate: "",
    itemKey: uuid.v4()
  };

  useAddAnotherVignetteToCart(
    currentLanguage.value,
    newItem.itemKey,
    "EUR",
    vignetteInfo.value?.value.vignetteType.vignetteCode ?? "",
    vignetteInfo.value?.value.vignetteType.durationType ?? "",
    newItem.countryCode,
    newItem.plateNumber,
    newItem.startDate,
    newItem.endDate,
    vignetteInfo.value?.value.vignetteType.amount ?? 0,
    vignetteInfo.value?.value.vignetteType.transactionFee ?? 0,
    0, numberOfVignettes.value, selectedCounties.value
  );

  formData.value.multiples.splice(index + 1, 0, newItem);
  lastAddedIndex.value = index + 1;
  disableUpdate.value = false;
};

const remove = (index: number) => {
  useRemoveVignetteFromCart(
    formData.value.multiples[index].itemKey,
    vignetteInfo.value?.value.vignetteType.durationType ?? "",
    numberOfVignettes.value,
    selectedCounties.value
  );

  formData.value.multiples.splice(index, 1);
  if (formData.value.multiples.length - 1 >= index) {
    lastAddedIndex.value = formData.value.multiples.length - 1; // Update to the new last index
  } else {
    lastAddedIndex.value = Math.max(0, formData.value.multiples.length - 1); // Reset to the last or 0
  }
};

const loading = ref(false);


const validate = async () => {
  loading.value = true;
  var hasErrors = await validateAllPlates(formData.value.multiples, t);
  console.log(hasErrors);
  if (!hasErrors) {
    navigateTo("/"+currentLanguage.value + "/purchase/billing");
  }
  loading.value = false;
};

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

const updateMonthEndDate = async () => {
  formData.value.multiples.forEach(async (item, index) => {
    console.log(formData.value.multiples);
    if (item.startDate !== null) {
      var response = await fetchEndDate(
        vignetteInfo.value?.value.vignetteType.vignetteCode ?? "",
        item.startDate.toISOString(),
        numberOfVignettes.value
      );

      item.endDate = new Date(response == null ? "" : response.toString());
    }
  });
};


//
onMounted(async () => {
  try {
    const info = await fetchVignetteInfo();
    if (info) vignetteInfo.value = info;
    if (vignetteInfo.value) {
      var endDate = await fetchEndDate(
        vignetteInfo.value.value.vignetteType.vignetteCode,
        new Date().toISOString().split("T")[0],
        1
      );
      formData.value.multiples[0].endDate = new Date(endDate == null ? "" : endDate.toString());

      useAddAnotherVignetteToCart(
        currentLanguage.value,
        formData.value.multiples[0].itemKey, "EUR",
        vignetteInfo.value?.value.vignetteType.vignetteCode ?? "",
        vignetteInfo.value?.value.vignetteType.durationType ?? "",
        formData.value.multiples[0].countryCode,
        formData.value.multiples[0].plateNumber,
        formData.value.multiples[0].startDate,
        formData.value.multiples[0].endDate,
        vignetteInfo.value?.value.vignetteType.amount ?? 0,
        vignetteInfo.value?.value.vignetteType.transactionFee ?? 0,
        0, numberOfVignettes.value, selectedCounties.value
      );

    }

  } catch (error) {
    console.error("Failed to load vignette info:", error);
  }
});

const calculatedVignettes = computed(() => {
  return vignetteInfo.value
    ? [
      {
        category: vignetteInfo.value.value.vignetteType.category,
        durationType: vignetteInfo.value.value.vignetteType.durationType,
        price: `${(
          (vignetteInfo.value.value.vignetteType.amount +
            vignetteInfo.value.value.vignetteType.transactionFee) *
          numberOfVignettes.value
        ).toString()} Ft`,
      },
    ]
    : [];
});

const isCalendarDisabled = computed(() => {
  return !(
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

formData.value.multiples.forEach(async (item, index) => {

  if (item.startDate !== null) {
    var response = await fetchEndDate(
      vignetteInfo.value?.value.vignetteType.vignetteCode ?? "",
      item.startDate.toISOString().split('T')[0],
      numberOfVignettes.value
    );
    item.endDate = new Date(response == null ? "" : response.toString());
  }
});

async function fetchEndDate(vignetteCode: string, validityStart: string, numberOfVignettes: number) {
  const requestBody = {
    vignetteCode,
    validityStart,
    numberOfVignettes
  };

  const apiEndpoint = 'https://test-gw.voxpay.hu/Webshop.Vignette/CountEndDate';
  try {
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data: EndDateResponse = await response.json();
    if (data.isSuccess && data.value.endDate) {
      return data.value.endDate.split('T')[0];
    }
    else {
      return "";
    }
  } catch (error) {
    console.error("Failed to fetch end date:", error);
    return null; // or handle errors as appropriate for your application context
  }
}

interface EndDateResponse {
  value: {
    endDate: string;
  };
  isSuccess: boolean;
  error: {
    code: string;
    message: string;
  };
  isFailure: boolean;
}


async function calculateEndDate(index: number): Promise<void> {
  var item = formData.value.multiples[index];

  if (item.startDate !== null) {
    var response = await fetchEndDate(
      vignetteInfo.value?.value.vignetteType.vignetteCode ?? "",
      item.startDate.toLocaleDateString("hu-HU").split('T')[0],
      numberOfVignettes.value
    );

    item.endDate = new Date(response == null ? "" : response.toString());
  }
}

function updateCartItem(index: number) {
  var item = formData.value.multiples[index];
  useUpdateCartItem(
    item.itemKey,
    item.countryCode,
    vignetteInfo.value?.value.vignetteType.durationType ?? "",
    item.plateNumber.toUpperCase(),
    item.startDate,
    item.endDate,
    vignetteInfo.value?.value.vignetteType.amount ?? 0,
    vignetteInfo.value?.value.vignetteType.transactionFee ?? 0,
    numberOfVignettes.value,
    selectedCounties.value
  );
}
</script>
