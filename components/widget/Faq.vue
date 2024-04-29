<template>
  <h2 v-if="widget.pageTitle">{{ widget.pageTitle }}</h2>
  <h2 v-if="widget.mainTitle">{{ widget.mainTitle }}</h2>
  <Accordion class="max-w-[888px] mx-auto w-full" :activeIndex="0">
    <AccordionTab v-for="(item, index) in widget.items" :key="index">
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
            class="font-bold text-lg md:text-xl mx-4 text-base-orange"
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
import { defineProps } from "vue";
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";

import type { MainAccordion} from "~/types/types";

const props = defineProps({
  widget: {
    type: Object as PropType<MainAccordion>,
    required: true,
    default: () => ({ mainTitle: '', content: { items: [] } })
  },
});

/* onMounted(() => {
  console.log("Widget Data:", props.widget);
}); */
</script>
