<template>
  <h2 v-if="mainTitle">{{ mainTitle }}</h2>
  <Accordion :class="containerClass" :activeIndex="0">
    <AccordionTab v-for="item in content" :key="item.title">
      <template #header>
        <div
          :class="titleClass"
          class="flex items-center justify-between w-full py-5 shadow-sm rounded-md"
        >
          <h1 v-if="item.preTitle" class="ml-3 md:ml-[6.5rem] text-white my-0">
            {{ item.preTitle }}
          </h1>
          <img
            v-if="mainIconSrc"
            class="ml-3 sm:ml-[6.5rem] h-[50px] w-[50px] hidden md:flex"
            :src="mainIconSrc"
            :alt="mainIconAlt"
          />
          <span
            v-if="item.title"
            :class="descClass"
            class="font-bold text-base md:text-xl mx-4"
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
              :class="iconClass"
              class="p-icon p-accordion-toggle-icon"
            ></span>
          </div>
        </div>
      </template>
      <div v-if="item.desc" class="m-0 px-4">
        <div v-html="item.desc"></div>
      </div>
      <div v-if="gridContentClass" :class="gridContentClass">
        <NuxtLink
          v-for="button in item.buttons"
          :key="button.url"
          :to="button.url"
          class="btn primary-btn-outline"
          :title="button.title"
        >
          {{ button.title }}
          <img
            v-if="button.iconSrc"
            class="pl-2 read-img"
            :src="button.iconSrc"
            :alt="button.title"
          />
        </NuxtLink>
      </div>
    </AccordionTab>
  </Accordion>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";

interface Button {
  title: string;
  url: string;
  iconSrc?: string;
  iconAlt?: string;
}

interface ContentItem {
  preTitle?: string;
  title: string;
  desc?: string; 
  secondaryIconSrc?: string;
  secondaryIconAlt?: string;
  buttons: Button[];
}

interface AccordionComponent {
  mainTitle?: string;
  mainIconSrc?: string;
  mainIconAlt?: string;
  containerClass?: string;
  gridContentClass?: string;
  descClass?: string;
  titleClass?: string;
  iconClass?: string;
  content: ContentItem[];
}

defineProps<AccordionComponent>();
</script>
