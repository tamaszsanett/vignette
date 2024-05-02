<template>
  <main class="container mx-auto px-4 lg:px-0 mt-24 purchase-step-2">
    <header class="flex justify-center py-5">
      <img
        class="w-full hidden sm:block"
        src="../public/img/purchase/under-plate-number-line_hu-HU.svg"
        alt="autópálya-matrica"
      />
      <img
        class="w-full block sm:hidden"
        src="../public/img/purchase/under-plate-number-line_hu-HU_mobile.svg"
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
        <span class="ml-2">D1 - Havi országos autópálya-matrica</span>
      </h1>
      <div class="w-full md:max-w-[350px] mx-auto flex flex-col gap-4">
        <section class="card flex flex-col gap-2">
          <label for="country_mark" class="primary-label"
            >Nationality mark</label
          >
          <Dropdown
            id="country_mark"
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
        <section class="flex flex-col gap-2">
          <label for="country_mark" class="primary-label">License plate</label>
          <InputGroup class="relative">
            <InputGroupAddon>
              <div class="plate-num-before">H</div>
            </InputGroupAddon>
            <InputText
              placeholder="e.g. ABC-123"
              id="country_mark"
              class="primary-input group-input"
            />
          </InputGroup>
        </section>
        <section class="flex flex-col gap-2">
          <div
            class="flex justify-center items-center space-x-4 calendar-wrapper"
          >
            <div>
              <Calendar
                v-model="startDate"
                :minDate="minDate"
                :manualInput="false"
              />
            </div>
            <div>
              <Calendar
                v-model="endDate"
                :disabled="true"
                :manualInput="false"
              />
            </div>
          </div>
        </section>
        <div
          @click.prevent="toggleAdditionalContent"
          class="base-link cursor-pointer flex justify-center"
        >
          + további matrica felvétele
        </div>

        <div v-if="showAdditionalContent" class="relative">
          további matrica majd ide
          <button
            @click="hideAdditionalContent"
            class="del absolute top-0 -right-10"
          ></button>
        </div>
        <section class="flex items-center flex-wrap justify-center gap-4">
          <a class="btn-gray" href="/">Vissza</a>
          <NuxtLink to="/UnderInvoiceData" class="btn-green" type="submit">Következő</NuxtLink>
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
import { ref, computed, onMounted } from "vue";
import { useAsyncData, useRoute, useSeoMeta } from "nuxt/app";

const showAdditionalContent = ref(false);

const toggleAdditionalContent = () => {
  showAdditionalContent.value = !showAdditionalContent.value;
};

const hideAdditionalContent = () => {
  showAdditionalContent.value = false;
};

// Dátum típusok kezelése a ref-ben
const startDate = ref(new Date());
const endDate = ref<Date | null>(null);
const minDate = ref(new Date());

// Külső forrásból származó dátum lekérése
async function fetchExternalEndDate() {
  return { endDate: "2024-05-10" };
}

onMounted(async () => {
  const response = await fetchExternalEndDate();
  endDate.value = new Date(response.endDate);
});

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
