<template>
  <Accordion class="max-w-[1100px] mx-auto w-full" :activeIndex="0">
    <AccordionTab v-for="(item, index) in widget.vignetteTypes" :key="index">
      <template #header>
        <div
          class="bg-green-grad flex items-center justify-between w-full py-5 shadow-sm rounded-md"
        >
          <h1
           
            class="ml-3 md:ml-[6.5rem] text-white my-0 lg:text-7xl"
          >
            {{ item.preTitle }}
          </h1>
          <img
            v-if="item.iconSrc"
            class="ml-3 sm:ml-[6.5rem] h-[50px] w-[50px] hidden md:flex"
            :src="item.iconSrc"
            :alt="item.iconAlt"
          />
          <span
            v-if="item.title"
            class="text-white text-sm md:text-lg font-medium mx-4"
            >{{ item.title }}</span
          >
          <img
            v-if="item.secondaryIconSrc"
            class="mr-5 h-5 w-5 md:h-[50px] md:w-[50px] lg:h-[70px] lg:w-[93px] ml-auto"
            :src="item.secondaryIconSrc"
            :alt="item.secondaryIconAlt"
          />
          <div class="">
            <span
              class="green-arrow p-icon p-accordion-toggle-icon"
            ></span>
          </div>
        </div>
      </template>
      <div v-if="item.desc" class="m-0 px-4">
        <div v-html="item.desc"></div>
      </div>
      <div class="grid sm:grid-cols-2 gap-2 sm:gap-4">
        <NuxtLink v-for="(button, btnIndex) in item.buttons" :key="btnIndex" :to="button.url" class="btn primary-btn-outline min-h-14 pr-2" :title="button.title">
          <span class="w-full md:w-[60%] text-left">{{ button.title }}</span>
          <img v-if="button.iconSrc" class="read-img w-[20px] h-[20px]" :src="button.iconSrc" :alt="button.iconAlt"/>
        </NuxtLink>
      </div>
    </AccordionTab>
  </Accordion>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";

import type { VignetteAccordion } from "~/types/types";
const props = defineProps({
  widget: {
    type: Object as PropType<VignetteAccordion>,
    required: true,
  },
});

</script>
