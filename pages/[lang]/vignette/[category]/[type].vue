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
    <section class="max-w-[800px] mx-auto">
      <h1 class="purchase-h1">
        <img
          class="w-[45px]"
          :src="'/img/purchase/' + category + '.svg'"
          :alt="category + ' ' + $t('type.image.alt_vignette')"
        />
        <div class="flex items-center space-x-2">
          <span>{{ vignetteCategory }} -</span>
          <span v-if="durationType === 'DAY'"
            >{{ $t("type.title.daily") }} ({{ $t("type.title.one_day") }})
            {{ $t("type.title.after_title") }}</span
          >
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
        </div>
      </h1>
      <div class="mx-auto my-8" v-if="isRegionalVignette">
        <div class="card flex justify-center">
          <div class="grid grid-cols-2 gap-1 sm:gap-2 sm:gap-x-20">
            <div
              v-for="county of countyOptions"
              :key="category + county.key"
              class="flex items-center gap-x-2"
            >
              <Checkbox
                :input-id="category + county.key"
                v-model="selectedCounties"
                name="counties"
                :value="category + county.key"
              />
              <label
                class="primary-label text-sm md:text-base"
                :for="category + county.key"
                >{{ county.name }}</label
              >
            </div>
          </div>
        </div>
      </div>
      <section v-if="isRegionalVignette">
        <div
          v-if="errorCountiesMessage"
          class="my-2 w-full inline-flex flex-wrap gap-2 text-center justify-center"
        >
          <img
            src="/img/purchase/danger-icon.svg"
            alt="Hiba történt"
            class="w-5 h-5"
            style="width: 20px; height: 20px"
          />
          <p class="error-message my-0">
            {{ errorCountiesMessage }}
          </p>
        </div>
      </section>
      <div
        class="w-full md:max-w-[350px] mx-auto mb-5"
        v-if="durationType === 'MONTH'"
      >
        <label for="" class="primary-label">{{
          $t("type.number_of_month")
        }}</label>
        <div class="w-full flex gap-2">
          <InputText
            type="button"
            v-for="n in 5"
            :key="n"
            id="monthType"
            class="monthType"
            :value="n"
            :class="{ focus: numberOfVignettes === n }"
            @click="numberOfVignettes = n"
          />
        </div>
      </div>
    </section>
    <form
      class="pb-4 max-w-[800px] mx-auto"
      v-for="(item, i) in formData.multiples"
      :key="i"
    >
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
                    :class="`mr-1 flag flag-${slotProps.value.countryCode.toLowerCase()}`"
                  >
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
                <div
                  class="plate-num-before-non-eu"
                  :class="{
                    'plate-num-before-eu':
                      item.selectedCountry && isEuCountry(item.selectedCountry),
                    'plate-num-before-non-eu':
                      item.selectedCountry &&
                      !isEuCountry(item.selectedCountry),
                  }"
                >
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
                autocorrect="off" 
                autocapitalize="off"
                spellcheck="false"
              />
            </InputGroup>
          </section>
          <section class="flex flex-col gap-2 w-full md:max-w-[350px] mx-auto">
            <label :for="'start_date-' + i" class="primary-label">{{
              $t("type.validity_period")
            }}</label>
            <div
              class="flex justify-center items-center space-x-4 calendar-wrapper"
            >
              <div>
                <Calendar
                  :id="'start_date-' + i"
                  v-model="item.startDate"
                  :min-date="minStartDate"
                  :max-date="maxEndDate"
                  :disabled="isCalendarDisabled"
                  :manualInput="false"
                  dateFormat="yy-mm-dd"
                />
              </div>
              <div>
                <Calendar
                  :id="'end_date-' + i"
                  v-model="item.endDate"
                  :disabled="true"
                  :manualInput="false"
                  dateFormat="yy-mm-dd"
                />
              </div>
            </div>
          </section>
          <button
            v-if="lastAddedIndex === i && numberOfVignettes == 1"
            type="button"
            @click.prevent="addMore(i)"
            class="base-link cursor-pointer flex w-auto justify-center mx-auto my-4"
          >
            {{ $t("type.add_another_widget") }}
          </button>
        </div>
      </div>
    </form>
    <PurchaseCalculator
      :title="`${$t('type.purchase_calculator.title')}`"
      :list="calculatedVignettes"
      bgClass="additional-styles"
    />
    <section class="flex items-center flex-wrap justify-center gap-4">
      <Button class="btn-gray" @click="goBack">{{ $t("type.back") }}</Button>
      <Button class="btn btn-green cursor-pointer" @click.prevent="validate" :disabled="loading" :class="{ 'btn-disabled': loading }">
        <span v-if="!loading">{{ $t("type.next") }}</span>
        <span class="h-5 w-5" v-else>
          <svg
            class="animate-spin h-5 w-5 mr-3 border-4 border-t-transparent border-green-500 rounded-full"
            viewBox="0 0 24 24"
          ></svg>
        </span>
      </Button>
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
  <div style="margin-bottom: 100px"></div>
</template>

<script setup lang="ts">
const { t, locale } = useI18n();
const route = useRoute();
import { useRouter } from "nuxt/app";
const router = useRouter();
import { ref, computed, onMounted, watch } from "vue";
import { useRoute } from "nuxt/app";
import { usePlateValidation } from "~/composables/usePlateValidation";
import { useVignetteInfo } from "~/composables/useVignetteInfo";
import type * as purchaseTypesTs from "~/types/purchaseTypes.ts";
import type { GetCartResponse, VignetteInfoResponse } from "~/types/types.ts";
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
const lastAddedIndex = ref(0);

let disableUpdate = ref(false);

// Load cart key from cookie
const cartKey = useCookie("cartKey");
const vignetteTypeFromCookie = useCookie("vignetteType");
const durationTypeCookie = useCookie("durationType");
const categoryCookie = useCookie("category");

const isEmptyCart = ref(true);

const isAtLeastOneCountySelected = computed(() => {
    return selectedCounties.value.length > 0;
  });
  
  const errorCountiesMessage = ref("");

//countries select
const countryOptions = computed(() => {
  return countries[locale.value] || [];
});

const updateMonthEndDate = async () => {
  formData.value.multiples.forEach(async (item, index) => {
    if (item.startDate !== null) {
      var response = await fetchEndDate(
        vignetteInfo.value?.value.vignetteType.vignetteCode ?? "",
        item.startDate.toISOString().substring(0, 10)
      );

      item.endDate = new Date(response == null ? "" : response.toString());
    }
  });
};
//counties select
const countyOptions = computed(() => {
  return counties[locale.value] || [];
});

const formData = ref({
  multiples: [] as purchaseTypesTs.FormData[],
});
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
    itemKey: uuid.v4(),
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
    0,
    numberOfVignettes.value,
    selectedCounties.value
  );

  formData.value.multiples.splice(index + 1, 0, newItem);
  lastAddedIndex.value = index + 1;
  disableUpdate.value = false;
};

const numberOfVignettes = ref(1); // Default to 1, modify as necessary

if (
  cartKey.value == null ||
  vignetteTypeFromCookie.value !=
    vignetteInfo.value?.value.vignetteType.vignetteCode
) {
  cartKey.value = uuid.v4();
  const orderId = useCookie("orderId");
  orderId.value = null;
  addMore(0);
  lastAddedIndex.value = 0;
} else {
  // get items from cart
  const cart = await $fetch<GetCartResponse>(
    `https://test-gw.voxpay.hu/Webshop.Common/GetCart?CartKey=${cartKey.value}&CultureKey=${currentLanguage.value}`
  );

  if (
    cart.error.code == "Webshop.CartNotExists" ||
    (cart.isSuccess && cart.value.status == "Prepared") ||
    cart.isFailure
  ) {
    cartKey.value = uuid.v4();
    const orderId = useCookie("orderId");
    orderId.value = null;
    addMore(0);
    lastAddedIndex.value = 0;
  } else {
    if (cart.value.cartItems) {
      if (cart.value.cartItems.length == 0) {
        addMore(0);
      }
      else  {
      var itemKeys = [] as string[];
      cart.value.cartItems.forEach((item, index) => {
        if (
          vignetteInfo.value?.value.vignetteType.durationType == "YEAR" ||
          vignetteInfo.value?.value.vignetteType.durationType == "DAY" ||
          vignetteInfo.value?.value.vignetteType.durationType == "WEEK"
        ) {
          const newItem = {
            selectedCountry: countryOptions.value.find(
              (country) => country.countryCode === item.properties.find((x) => x.key == "CountryCode")?.value ?? ""
            ),
            countryCode:
              item.properties.find((x) => x.key == "CountryCode")?.value ?? "",
            plateNumber:
              item.properties.find((x) => x.key == "PlateNumber")?.value ?? "",
            startDate: new Date(
              new Date(
                item.properties.find((x) => x.key == "ValidityStart")?.value ??
                  ""
              ).getTime() -
                new Date().getTimezoneOffset() * 60000
            ),
            endDate: new Date(
              new Date(
                item.properties.find((x) => x.key == "ValidityEnd")?.value ?? ""
              ).getTime() -
                new Date().getTimezoneOffset() * 60000
            ),
            formShowError: false,
            invalidPlate: "",
            itemKey: item.cartItemKey,
          };

          var today = new Date(((new Date())).getTime() - new Date().getTimezoneOffset() * 60000);
          if (newItem.startDate < today)
            {
              newItem.startDate = today;
            }

          formData.value.multiples.splice(index, 0, newItem);
          lastAddedIndex.value = index;
        } else if (
          vignetteInfo.value?.value.vignetteType.durationType == "MONTH"
        ) {
          itemKeys.push(item.cartItemKey.split("_")[0]);
        }
      });

      if (vignetteInfo.value?.value.vignetteType.durationType == "MONTH") {
        // HANDLE MONTHLY VIGNETTE LOAD
        var unique = itemKeys.filter(
          (value, index, array) => array.indexOf(value) === index
        );
        // single plate number = 1 or multiple month vignette for one vehicle
        if (unique.length == 1) {
          var item = cart.value.cartItems[0];
          var minDate = new Date("2040-01-01");
          var maxDate = new Date("2000-01-01");
          cart.value.cartItems.forEach((cartItem, index) => {
            var validityStart = new Date(
              cartItem.properties.find((x) => x.key == "ValidityStart")
                ?.value ?? ""
            );
            if (minDate > validityStart) {
              minDate = validityStart;
            }
            var validityEnd = new Date(
              cartItem.properties.find((x) => x.key == "ValidityEnd")?.value ??
                ""
            );
            if (maxDate > validityEnd) {
              maxDate = validityEnd;
            }
          });

          const newItem = {
            selectedCountry: countryOptions.value.find(
              (country) => country.countryCode === item.properties.find((x) => x.key == "CountryCode")?.value ?? ""
            ),
            countryCode:
              item.properties.find((x) => x.key == "CountryCode")?.value ?? "",
            plateNumber:
              item.properties.find((x) => x.key == "PlateNumber")?.value ?? "",
            startDate: new Date(
              minDate.getTime() - new Date().getTimezoneOffset() * 60000
            ),
            endDate: new Date(
              maxDate.getTime() - new Date().getTimezoneOffset() * 60000
            ),
            formShowError: false,
            invalidPlate: "",
            itemKey: item.cartItemKey.substring(0, item.cartItemKey.length - 2), // remove _[numberofmonth]
          };

          formData.value.multiples.splice(0, 0, newItem);
          lastAddedIndex.value = 0;

          numberOfVignettes.value = cart.value.cartItems.length;
        } else {
          // multiple plate number = 2 or more plate number with multiple months
          numberOfVignettes.value = cart.value.cartItems.length / unique.length;
          lastAddedIndex.value = -1;
          unique.forEach((item, index) => {
            // Get min start date
            var minDate = new Date("2040-01-01");
            var countryCode = "";
            var itemKey = "";
            var plateNumber = "";
            var selectedCountry;

            cart.value.cartItems.forEach((cartItem, index) => {
              itemKey = cartItem.cartItemKey.split("_")[0];
              if (itemKey == item) {
                plateNumber =
                  cartItem.properties.find((x) => x.key == "PlateNumber")
                    ?.value ?? "";
                countryCode =
                  cartItem.properties.find((x) => x.key == "CountryCode")
                    ?.value ?? "";
                var validityStart = new Date(
                  cartItem.properties.find((x) => x.key == "ValidityStart")
                    ?.value ?? ""
                );
                if (minDate > validityStart) {
                  minDate = validityStart;
                }
                selectedCountry = countryOptions.value.find(
                  (country) => country.countryCode === cartItem.properties.find((x) => x.key == "CountryCode")?.value ?? ""
                );
              }
            });
            const newItem = {
              selectedCountry: selectedCountry,
              countryCode: countryCode ?? "",
              plateNumber: plateNumber,
              startDate: minDate,
              endDate: new Date(),
              formShowError: false,
              invalidPlate: "",
              itemKey: item, // remove _[numberofmonth]
            };
            formData.value.multiples.splice(lastAddedIndex.value, 0, newItem);
            lastAddedIndex.value = lastAddedIndex.value + 1;
          });
        }
      }
      if (vignetteInfo.value?.value.vignetteType.durationType == "YEAR_11") {
        // HANDLE MONTHLY VIGNETTE LOAD
        var itemKeys = [] as string[];
        var months = [] as string[];

        cart.value.cartItems.forEach((item, index) => {
          itemKeys.push(item.cartItemKey.split("_")[0]);
          months.push(item.productCode);
        });

        var uniqueItemKeys = itemKeys.filter(
          (value, index, array) => array.indexOf(value) === index
        );
        var uniqueMonths = months.filter(
          (value, index, array) => array.indexOf(value) === index
        );

        selectedCounties.value = uniqueMonths;
        lastAddedIndex.value = -1;
        uniqueItemKeys.forEach((item, index) => {
          // Get min start date
          var minDate = new Date("2040-01-01");
          var countryCode = "";
          var plateNumber = "";
          var itemKey = "";
          var selectedCountry;

          cart.value.cartItems.forEach((cartItem, index) => {
            itemKey = cartItem.cartItemKey.split("_")[0];
            if (itemKey == item) {
              plateNumber =
                cartItem.properties.find((x) => x.key == "PlateNumber")
                  ?.value ?? "";
              countryCode =
                cartItem.properties.find((x) => x.key == "CountryCode")
                  ?.value ?? "";
              var validityStart = new Date(
                cartItem.properties.find((x) => x.key == "ValidityStart")
                  ?.value ?? ""
              );
              if (minDate > validityStart) {
                minDate = validityStart;
              }

              selectedCountry = countryOptions.value.find(
                (country) => country.countryCode === cartItem.properties.find((x) => x.key == "CountryCode")?.value ?? ""
              )
            }
          });
          const newItem = {
            selectedCountry: selectedCountry,
            countryCode: countryCode ?? "",
            plateNumber: plateNumber,
            startDate: minDate,
            endDate: new Date(),
            formShowError: false,
            invalidPlate: "",
            itemKey: item,
          };
          formData.value.multiples.splice(lastAddedIndex.value, 0, newItem);
          lastAddedIndex.value = lastAddedIndex.value + 1;
        });
      }
    }
    } else {
      lastAddedIndex.value = 0;
    }
  }
  isEmptyCart.value = false;
}

// Trigger category type change
vignetteTypeFromCookie.value =
  vignetteInfo.value?.value.vignetteType.vignetteCode;
durationTypeCookie.value = vignetteInfo.value?.value.vignetteType.durationType;
categoryCookie.value = vignetteInfo.value?.value.vignetteType.category;

const isEuCountry = (country: any) =>
  [
    "A",
    "B",
    "BG",
    "CY",
    "CZ",
    "D",
    "DK",
    "E",
    "EST",
    "FIN",
    "F",
    "GR",
    "HR",
    "H",
    "IRL",
    "I",
    "LT",
    "L",
    "LV",
    "M",
    "NA",
    "PL",
    "P",
    "RO",
    "S",
    "SLO",
    "SK",
  ].includes(country.countryCode);

const { validateAllPlates } = usePlateValidation(
  "https://test-gw.voxpay.hu/Webshop.Vignette/ValidatePlateNumber"
);

const emptyMessage = ref("");

const handleInputValidation = (index: number) => {
  const item = formData.value.multiples[index];
  if (item) {
    if (item.plateNumber.trim() === "") {
      item.formShowError = true; // Show error if input is empty
      emptyMessage.value = t("type.empty_plate");
    } else {
      item.formShowError = false; // Hide error if input is not empty
    }
  }
};

// -------------------------------------- WATCH INPUT CHANGES -------------------------------------------

watch(
  // Watch PlateNumber changes
  () => formData.value.multiples.map((item) => item.selectedCountry),
  (newValues, oldValues) => {
    newValues.forEach((_, index) => {
      if (
        oldValues.length == newValues.length &&
        oldValues[index] != newValues[index]
      ) {
        console.log( newValues[index]?.countryCode);
        formData.value.multiples[index].countryCode = newValues[index]?.countryCode ?? "H";
        updateCartItem(index);
      }
    });
  },
  { deep: true }
);

watch(
  // Watch PlateNumber changes
  () => formData.value.multiples.map((item) => item.plateNumber),
  (newValues, oldValues) => {
    newValues.forEach((_, index) => {
      if (
        oldValues.length == newValues.length &&
        oldValues[index] != newValues[index]
      ) {
        handleInputValidation(index);
        updateCartItem(index);
      }
    });
  },
  { deep: true }
);

watch(
  // Watch ValidityStart changes
  () => formData.value.multiples.map((item) => item.startDate),
  (oldValues, newValues) => {
    newValues.forEach(async (_, index) => {
      if (
        oldValues.length == newValues.length &&
        oldValues[index] != newValues[index]
      ) {
        await calculateEndDate(index);
        updateCartItem(index);
      }
    });
  },
  { deep: true }
);

watch(numberOfVignettes, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    updateMonthEndDate();
    if (newValue > oldValue) {

      //console.log(formData.value.multiples.length);
      let ton = formData.value.multiples.length;
      console.log(ton);
      for (var i = ton-1; i > 0; i--)
      {
        console.log("remove: "+i);
          remove(i);
      };
      // add to cart
      useAddAnotherVignetteToCart(
          currentLanguage.value,
          formData.value.multiples[0].itemKey,
          "EUR",
          vignetteInfo.value?.value.vignetteType.vignetteCode ?? "",
          vignetteInfo.value?.value.vignetteType.durationType ?? "",
          formData.value.multiples[0].countryCode,
          formData.value.multiples[0].plateNumber,
          formData.value.multiples[0].startDate,
          formData.value.multiples[0].endDate,
          vignetteInfo.value?.value.vignetteType.amount ?? 0,
          vignetteInfo.value?.value.vignetteType.transactionFee ?? 0,
          oldValue,
          newValue,
          selectedCounties.value
        );
    } else if (oldValue > newValue) {
      formData.value.multiples.forEach(async (item, index) => {
        useRemoveVignetteFromCartByMoth(item.itemKey, newValue, oldValue);
      });
    }
  }
});

watch(selectedCounties, (newItems, oldItems) => {
  let removeable = oldItems.filter((x) => !newItems.includes(x))[0];
  let newbie = newItems.filter((x) => !oldItems.includes(x))[0];

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
        0,
        numberOfVignettes.value,
        [newbie]
      );
    });
  } else if (removeable) {
    formData.value.multiples.forEach(async (item, index) => {
      useRemoveVignetteFromCart(
        item.itemKey,
        vignetteInfo.value?.value.vignetteType.durationType ?? "",
        numberOfVignettes.value,
        [removeable]
      );
    });
  }
});

// ------------------------------- ADD/REMOVE/MODIFY vignette blocks ----------------------------------------
const remove = (index: number) => {
  console.log(index);
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

  if (vignetteInfo.value?.value.vignetteType.durationType == "YEAR_11")
  {
    if (!isAtLeastOneCountySelected.value) {
      // If no county is selected, set the error message
      errorCountiesMessage.value = t("type.is_at_least_one_county_selected");
      hasErrors = true;
    }
    else {
      errorCountiesMessage.value = "";
    }
  }

  if (!hasErrors) {
    navigateTo("/" + currentLanguage.value + "/purchase/billing");
  }
  loading.value = false;
};

const goBack = () => {
  router.back();
};

const minStartDate = computed(() => {
  return vignetteInfo.value
    ? new Date(vignetteInfo.value.value.vignetteType.validityStartMin)
    : new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000);
});
const maxEndDate = computed(() => {
  return vignetteInfo.value
    ? new Date(vignetteInfo.value.value.vignetteType.validityStartMax)
    : new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000);
});

//
onMounted(async () => {
  try {
    if (vignetteInfo.value) {
      var endDate = await fetchEndDate(
        vignetteInfo.value.value.vignetteType.vignetteCode,
        new Date(
          (formData.value.multiples[0].startDate ?? new Date()).getTime() -
            new Date().getTimezoneOffset() * 60000
        )
          .toISOString()
          .split("T")[0]
      );
      formData.value.multiples[0].endDate = new Date(
        endDate == null ? "" : endDate.toString()
      );
      if (isEmptyCart.value) {
        useAddAnotherVignetteToCart(
          currentLanguage.value,
          formData.value.multiples[0].itemKey,
          "EUR",
          vignetteInfo.value?.value.vignetteType.vignetteCode ?? "",
          vignetteInfo.value?.value.vignetteType.durationType ?? "",
          formData.value.multiples[0].countryCode,
          formData.value.multiples[0].plateNumber,
          formData.value.multiples[0].startDate,
          formData.value.multiples[0].endDate,
          vignetteInfo.value?.value.vignetteType.amount ?? 0,
          vignetteInfo.value?.value.vignetteType.transactionFee ?? 0,
          0,
          numberOfVignettes.value,
          selectedCounties.value
        );
      }
    }
  } catch (error) {
    console.error("Failed to load vignette info:", error);
  }
});

const calculatedVignettes = computed(() => {
  var type = vignetteInfo.value?.value.vignetteType.durationType;
  if (type == "YEAR_11") {
    if (selectedCounties.value.length == 0) {
      return [];
    } else {
      var items = [];
      selectedCounties.value.forEach((item, index) => {
        items.push({
          category: vignetteInfo.value?.value.vignetteType.category,
          durationType: t("vignette_type." + item),
          numberOfMonths: numberOfVignettes.value,
          price: `${(
            (vignetteInfo.value?.value.vignetteType.amount ?? 0) *
            numberOfVignettes.value *
            formData.value.multiples.length
          ).toFixed(2)} €`,
        });
      });

      return items;
    }
  } else {
    return vignetteInfo.value
      ? [
          {
            category: vignetteInfo.value.value.vignetteType.category,
            durationType: t(
              "vignette_type." +
                numberOfVignettes.value +
                vignetteInfo.value.value.vignetteType.durationType.toLowerCase()
            ),
            numberOfMonths: numberOfVignettes.value,
            price: `${(
              vignetteInfo.value.value.vignetteType.amount *
              numberOfVignettes.value *
              formData.value.multiples.length
            ).toFixed(2)} €`,
          },
        ]
      : [];
  }
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
      item.startDate.toISOString().split("T")[0]
    );
    item.endDate = new Date(response == null ? "" : response.toString());
  }
});

async function fetchEndDate(vignetteCode: string, validityStart: string) {
  const requestBody = {
    vignetteCode,
    validityStart,
    numberOfVignettes: numberOfVignettes.value,
  };
  const apiEndpoint = "https://test-gw.voxpay.hu/Webshop.Vignette/CountEndDate";
  try {
    const response = await fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data: EndDateResponse = await response.json();
    if (data.isSuccess && data.value.endDate) {
      return data.value.endDate.split("T")[0];
    } else {
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
      item.startDate.toLocaleDateString("hu-HU").split("T")[0]
    );

    item.endDate = new Date(response == null ? "" : response.toString());
  }
}

function updateCartItem(index: number) {
  var item = formData.value.multiples[index];
  console.log(item);
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
