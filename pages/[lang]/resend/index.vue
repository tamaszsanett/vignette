<template>
  <main class="container mx-auto px-4 lg:px-0 pt-6 mt-24 max-w-[1070px]">
    <h1 class="text-center">{{ $t("resend.title") }}</h1>
    <div class="text-center max-w-[800px] mx-auto">
      <p v-html="$t('resend.desc')"></p>
      <p class="pt-4">
        {{ $t("resend.important_text") }}
      </p>
    </div>

    <form class="flex flex-col gap-2 my-10 max-w-[650px] mx-auto">
      <section class="flex flex-col gap-2">
        <label for="email" class="primary-label">{{ $t("resend.email_label") }} </label>
        <div class="relative flex gap-2 items-center">
          <InputText
            class="primary-input"
            id="email"
            type="email"
            v-model="email"
            aria-describedby="email"
          />
          <button
            type="button"
            class="tooltip btn primary-btn tooltip-wrapper tooltip-responsive-fix"
          >
            ?
            <span class="tooltiptext">
              {{ $t("resend.mail_tooltip_text") }}
            </span>
          </button>
        </div>
      </section>
      <section class="flex flex-col gap-2">
        <label for="reg_plate_num" class="primary-label"
          >{{ $t("resend.reg_plate_num") }}</label
        >
        <div class="relative flex gap-2 items-center">
          <InputText
            class="primary-input"
            id="reg_plate_num"
            type="text"
            v-model="reg_plate_num"
            autocorrect="off" 
            autocapitalize="off"
            spellcheck="false"
            placeholder="e.g. ABC-123"
          />
          <button
            type="button"
            class="tooltip btn primary-btn tooltip-wrapper tooltip-responsive-fix"
          >
            ?
            <span class="tooltiptext"
              >{{ $t("resend.reg_num_tooltip_text") }}</span
            >
          </button>
        </div>
      </section>
      <section class="card flex items-center gap-2">
        <Checkbox inputId="terms" v-model="terms" :binary="true" />
        <label
          for="terms"
          class="primary-label text-sm"
          v-html="$t('resend.checkbox_label')"
        >
        </label>
      </section>
      <Button class="btn primary-btn w-auto mx-auto mt-4"
        >{{ $t("resend.resend_btn_title") }}</Button
      >
    </form>
    <template v-for="widget in widgets" :key="widget.widgetId">
      <div v-if="widget.widgetType === 'footerwidget'">
        <SharedFooterWidget
          :footer-widget="widget"
          :footer-widget-content="widget.content"
          :class="{
            'bottom-section': widget.section === 'main',
            hidden: widget.section !== 'main',
          }"
        />
      </div>
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
import { useRouter } from "nuxt/app";
const router = useRouter();
import { ref, computed, watch } from "vue";
import { useAsyncData, useRoute } from "nuxt/app";
import Button from "primevue/button";

const email = ref(null);
const reg_plate_num = ref(null);
const terms = ref(false);

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

const showSearch = computed(() => {
  return !!route.params.slug;
});

// import useMeta from Composition API

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
useSeoMeta({
  title: response.value.title,
  ogTitle: response.value.title,
  description: response.value.metaDescription,
  ogDescription: response.value.metaDescription,
});

useHead({
  htmlAttrs: {
    lang: currentLanguage,
  },
  meta: [
    {
      name: "language",
      content: currentLanguage,
    },
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
</script>
