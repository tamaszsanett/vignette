<template>
  <h1 v-if="widget.pageTitle" class="text-center">{{ widget.pageTitle }}</h1>
  <h2 v-if="widget.mainTitle" class="text-center">{{ widget.mainTitle }}</h2>

  <div class="text-center mb-4" v-if="showSearch === true">
    <IconField iconPosition="left" class="w-full max-w-[400px] mx-auto">
      <InputIcon class="pi pi-search"> </InputIcon>
      <InputText v-model="searchQuery" placeholder="Search" class="primary-input" style="padding-left: 2rem;" />
    </IconField>
  </div>
  <Accordion class="max-w-[888px] mx-auto w-full" :activeIndex="0">
    <AccordionTab v-for="(item, index) in filteredItems" :key="index">
      <template #header>
        <div
          class="gray-grad-bg flex items-center justify-between w-full py-5 shadow-sm rounded-md"
        >
          <img
            v-if="item.iconSrc"
            class="ml-3 sm:ml-[6.5rem] h-[50px] w-[50px] hidden md:flex"
            :src="item.iconSrc"
            :alt="item.iconAlt"
          />
          <span
            v-if="item.title"
            class="font-bold text-lg md:text-xl mx-4 text-base-orange w-100"
            >{{ item.title }}</span
          >
          <div class="">
            <span
              class="p-icon p-accordion-toggle-icon orange-arrow"
            ></span>
          </div>
        </div>
      </template>
      <div v-if="item.desc" class="m-0 px-4">
        <div v-html="item.desc"></div>
      </div>
    </AccordionTab>
  </Accordion>
</template>

<script lang="ts" setup>
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";

import type { MainAccordion} from "~/types/types";

const props = defineProps({
  widget: {
    type: Object as PropType<MainAccordion>,
    required: true,
    default: () => ({ mainTitle: '', content: { items: [] } })
  },
  showSearch: {
    type: Boolean,
    default: false
  },
});

const searchQuery = ref("");

const filteredItems = computed(() =>
  props.widget.items.filter(item =>
    item.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
);
</script>
