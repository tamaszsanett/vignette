<template>
  <h2>{{ mainTitle }}</h2>
  <Accordion :class="containerClass">
    <AccordionTab v-for="item in content" :key="item.title" open="false">
      <template #header>
        <div
          :class="titleClass"
          class="flex items-center w-full py-5 shadow-sm"
        >
          <div class="vignette-title-text">{{ item.preTitle }}</div>
          <img v-if="mainIcon"
            class="ml-[6.5rem] h-[50px] w-[50px] hidden md:flex"
            :src="mainIcon"
          />
          <span
            :class="descClass"
            class="font-bold text-base md:text-xl mx-4"
            >{{ item.title }}</span
          >
          <div class="ml-auto">
            <span
              :class="iconClass"
              class="p-icon p-accordion-toggle-icon"
            ></span>
          </div>
        </div>
      </template>
      <p class="m-0 px-4">
        <strong>{{ item.desc }}</strong>
      </p>
    </AccordionTab>
  </Accordion>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";

interface AccordionComponent {
  mainTitle: string;
  mainIcon?: string;
  containerClass?: string;
  descClass?: string;
  titleClass?: string;
  iconClass?: string;
  content: Array<{
    preTitle: string;
    title: string;
    desc: string;
  }>;
}

const props = defineProps<AccordionComponent>();
</script>
