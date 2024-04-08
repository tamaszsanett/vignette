<template>
  <div v-if="accordionContent" class="widget">
    <AccordionComponent
      :content="accordionContent.content"
      containerClass="max-w-[1100px] mx-auto w-full"
      titleClass="bg-green-grad"
      descClass="text-white text-sm md:text-lg font-medium"
      iconClass="green-arrow"
      gridContentClass="grid sm:grid-cols-2 gap-2 sm:gap-4"
    ></AccordionComponent>
  </div>
</template>

<script setup lang="ts">
const accordionContent = ref({
  widgetID: "1",
  widgetType: "VignetteAccordion",
  mainIconSrc: "/Content/new-site-content/!_icon.svg",
  mainIconAlt: "/Content/new-site-content/!_icon.svg",
  content: [
    {
      preTitle: "D1",
      secondaryIconSrc: "/Content/new-site-content/d1_icon_light.svg",
      secondaryIconAlt: "asdf",
      title: "When should the highway sticker be purchased?",
      buttons: [
        {
          title: "Daily e-vignette -  18,29 €",
          iconSrc: "/Content/cart.svg",
          iconAlt: "icon alt",
          url: "vignette/D1/1day/type",
        },
        {
          title: "Daily e-vignette -  18,29 €",
          iconSrc: "/Content/cart.svg",
          iconAlt: "icon alt",
          url: "vignette/D1/1day/type",
        },
        {
          title: "Daily e-vignette -  18,29 €",
          iconSrc: "/Content/cart.svg",
          iconAlt: "icon alt",
          url: "vignette/D1/1day/type",
        },
      ],
    },
    {
      preTitle: "D2",
      secondaryIconSrc: "/Content/new-site-content/d1_icon_light.svg",
      secondaryIconAlt: "asdf",
      title: "When should the highway sticker be purchased?",
      buttons: [
        {
          title: "Daily e-vignette -  18,29 €",
          iconSrc: "/Content/cart.svg",
          iconAlt: "icon alt",
          url: "vignette/D1/1day/type",
        },
      ],
    },
    {
      preTitle: "D1m",
      secondaryIconSrc: "/Content/new-site-content/d1_icon_light.svg",
      secondaryIconAlt: "asdf",
      title: "When should the highway sticker be purchased?",
      buttons: [
        {
          title: "Daily e-vignette -  18,29 €",
          iconSrc: "/Content/cart.svg",
          iconAlt: "icon alt",
          url: "vignette/D1/1day/type",
        },
        {
          title: "Daily e-vignette -  18,29 €",
          iconSrc: "/Content/cart.svg",
          iconAlt: "icon alt",
          url: "vignette/D1/1day/type",
        },
      ],
    },
    {
      preTitle: "U",
      secondaryIconSrc: "/Content/new-site-content/d1_icon_light.svg",
      secondaryIconAlt: "asdf",
      title: "When should the highway sticker be purchased?",
      buttons: [
        {
          title: "Daily e-vignette -  18,29 €",
          iconSrc: "/Content/cart.svg",
          iconAlt: "icon alt",
          url: "vignette/D1/1day/type",
        },
        {
          title: "Daily e-vignette -  18,29 €",
          iconSrc: "/Content/cart.svg",
          iconAlt: "icon alt",
          url: "vignette/D1/1day/type",
        },
        {
          title: "Daily e-vignette -  18,29 €",
          iconSrc: "/Content/cart.svg",
          iconAlt: "icon alt",
          url: "vignette/D1/1day/type",
        },
        {
          title: "Daily e-vignette -  18,29 €",
          iconSrc: "/Content/cart.svg",
          iconAlt: "icon alt",
          url: "vignette/D1/1day/type",
        },
      ],
    },
  ],
});

/* import { useAsyncData } from "nuxt/app";
import { computed } from "vue";

interface Button {
  title: string;
  iconSrc: string;
  iconAlt: string;
  url: string;
}

interface AccordionItem {
  preTitle: string;
  secondaryIconSrc: string;
  secondaryIconAlt: string;
  title: string;
  buttons: Button[];
}

interface AccordionContent {
  widgetID: string;
  widgetType: string;
  mainTitle: string;
  mainIconSrc: string;
  mainIconAlt: string;
  content: AccordionItem[];
}

interface ApiResponse {
  value: {
    widgets: AccordionContent[];
  };
}

const api =
  "https://test-core.voxpay.hu/CMS.Public.Gateway/api/GetWidgetsByPageUri";
const pageUri = "%2F&";
const lang = "en";
const targetWidgetId = "5706c8ae-36b2-493c-bbba-8410ffb2ea5a";

// UseAsyncData reactive update
const { data: widgetData } = useAsyncData(
  "`widgetContent-${targetWidgetId}`",
  async () => {
    const url = `${api}?PageUri=${pageUri}Localization=${lang}`;
    // `$fetch` explicit type
    const response = await $fetch<ApiResponse>(url);
    const widget = response.value.widgets.find(
      (widget) => widget.widgetId === targetWidgetId
    );

    return widget ? widget.content : null;
  }
);

const widgetContent = computed(() => widgetData.value); */
</script>
