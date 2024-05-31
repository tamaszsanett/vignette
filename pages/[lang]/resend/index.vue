<template>
  <main class="container mx-auto px-4 lg:px-0 pt-6 mt-24 max-w-[1070px]">
    <template v-for="widget in widgets" :key="widget.widgetId">
      <div v-if="widget.widgetType === 'html'" class="my-4">
        <div
          v-html="widget.content"
          class="text-center max-w-[800px] mx-auto"
        ></div>
      </div>
    </template>
    <form
      class="flex flex-col gap-2 my-10 max-w-[650px] mx-auto"
      @submit.prevent="sendResendConfirmation"
    >
      <section class="flex flex-col gap-2">
        <label for="email" class="primary-label">{{
          $t("resend.email_label")
        }}</label>
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
            <span class="tooltiptext">{{
              $t("resend.mail_tooltip_text")
            }}</span>
          </button>
        </div>
        <div
          v-if="errors.email"
          class="my-2 w-full inline-flex flex-wrap gap-2"
        >
          <img
            src="/img/purchase/danger-icon.svg"
            :alt="`${errors.email}`"
            class="w-5 h-5"
            style="width: 20px; height: 20px"
          />
          <p class="error-message my-0">{{ errors.email }}</p>
        </div>
      </section>
      <section class="flex flex-col gap-2">
        <label for="reg_plate_num" class="primary-label">{{
          $t("resend.reg_plate_num")
        }}</label>
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
            <span class="tooltiptext">{{
              $t("resend.reg_num_tooltip_text")
            }}</span>
          </button>
        </div>
        <div
          v-if="errors.plateNumber"
          class="my-2 w-full inline-flex flex-wrap gap-2"
        >
          <img
            src="/img/purchase/danger-icon.svg"
            :alt="`${errors.plateNumber}`"
            class="w-5 h-5"
            style="width: 20px; height: 20px"
          />
          <p class="error-message my-0">{{ errors.plateNumber }}</p>
        </div>
      </section>
      <section class="card flex items-center gap-2">
        <Checkbox inputId="terms" v-model="terms" :binary="true" />
        <label
          for="terms"
          class="primary-label text-sm"
          v-html="$t('resend.checkbox_label')"
        ></label>
      </section>
      <div v-if="errors.terms" class="my-2 w-full inline-flex flex-wrap gap-2">
        <img
          src="/img/purchase/danger-icon.svg"
          :alt="`${errors.terms}`"
          class="w-5 h-5"
          style="width: 20px; height: 20px"
        />
        <p class="error-message my-0">{{ errors.terms }}</p>
      </div>
      <Button type="submit" class="btn primary-btn w-auto mx-auto mt-4" :disabled="loading" :class="{ 'btn-disabled': loading }">
        <span v-if="!loading">{{ $t("resend.resend_btn_title") }}</span>
        <span class="h-5 w-5" v-else>
          <svg
            class="animate-spin h-5 w-5 mr-3 border-4 border-t-transparent border-green-500 rounded-full"
            viewBox="0 0 24 24"
          ></svg>
        </span>
      </Button>

      <Dialog
        v-model:visible="dialogVisible"
        modal
        dismissableMask
        @hide="dialogSuccess ? resetForm() : (dialogVisible = false)"
        :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
        class="max-w-sm w-full top-40 absolute rounded-md text-center"
      >
        <template #header>
          <h2
            class="inline-flex items-center gap-2 pb-2 border-b w-full my-0 text-xl justify-center"
          >
            {{
              dialogSuccess
                ? $t("resend.dialog.success_title")
                : $t("resend.dialog.failed_title")
            }}
          </h2>
        </template>
        <div class="w-full">
          <div v-if="dialogSuccess">
            <img
              src="/img/icons/modal_success.svg"
              :alt="t('resend.dialog.success_title')"
              class="w-24 h-24 mx-auto"
            />
          </div>
          <div v-if="!dialogSuccess">
            <img
              src="/img/icons/modal_error.svg"
              :alt="t('resend.dialog.failed_title')"
              class="w-24 h-24 mx-auto"
            />
          </div>
          <p v-html="dialogMessage"></p>
          <p v-if="!dialogSuccess" class="text-lg text-red">
            <strong>
              {{ $t("resend.dialog.failed_error") }}
            </strong>
          </p>
        </div>
        <template #footer class="bg-red-500">
          <div v-if="dialogSuccess" class="border-t pt-5 w-full">
            <Button
              class="btn btn-green btn-sm mx-auto"
              label="Close"
              @click="dialogSuccess ? resetForm() : (dialogVisible = false)"
            />
          </div>
          <div v-if="!dialogSuccess" class="border-t pt-5 w-full">
            <Button
              class="btn btn-error btn-sm mx-auto"
              label="Close"
              @click="dialogSuccess ? resetForm() : (dialogVisible = false)"
            />
          </div>
        </template>
      </Dialog>
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
import Dialog from "primevue/dialog";
import type { ApiResponse, ApiError, FormErrors } from "~/types/resend";

const currentLanguage = ref(locale);

watch(
  () => route.params.lang,
  (newLang) => {
    currentLanguage.value = Array.isArray(newLang)
      ? newLang[0]
      : newLang || "en";
  },
  { immediate: true }
);

const email = ref("");
const reg_plate_num = ref("");
const terms = ref(false);
const loading = ref(false);

const errors = ref<FormErrors>({
  email: "",
  plateNumber: "",
  terms: "",
  apiError: "",
});

// States for dialog visibility and messages
const dialogVisible = ref(false);
const dialogMessage = ref("");
const dialogSuccess = ref(false);

const validateInputs = () => {
  errors.value.email = "";
  errors.value.plateNumber = "";
  errors.value.terms = "";
  if (!email.value) {
    errors.value.email = t("resend.error_email_required");
  }
  if (!reg_plate_num.value) {
    errors.value.plateNumber = t("resend.error_plate_required");
  }
  if (!terms.value) {
    errors.value.terms = t("resend.error_terms_required");
  }
  return (
    !errors.value.email && !errors.value.plateNumber && !errors.value.terms
  );
};

const sendResendConfirmation = async () => {
  if (!validateInputs()) return;
  loading.value = true; // Start loading
  try {
    const response = await $fetch<ApiResponse>(
      "https://test-gw.voxpay.hu/Webshop.Vignette/ResendConfirmation",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.value,
          plateNumber: reg_plate_num.value,
          culturekey: locale.value,
        }),
      }
    );

    dialogVisible.value = true; // Show dialog
    if (response.isSuccess) {
      dialogMessage.value = t("resend.dialog.success_desc");
      dialogSuccess.value = true;
    } else {
      dialogMessage.value = t("resend.dialog.failed_desc");
      dialogSuccess.value = false;
    }

    if (!response.isSuccess) {
      throw new Error(response.error.message || "Unknown error");
    }

    console.log("Confirmation resent successfully!");
  } catch (error) {
    dialogVisible.value = true;
    dialogSuccess.value = false;
    /* const typedError = error as ApiError;
    errors.value.apiError = typedError.message; */
    dialogMessage.value = t("resend.dialog.failed_desc");
  } finally {
    loading.value = false; // Stop loading
  }
};

const resetForm = () => {
  email.value = "";
  reg_plate_num.value = "";
  terms.value = false;
  dialogVisible.value = false; // Close dialog
};

const showSearch = computed(() => {
  return !!route.params.slug;
});

// import useMeta from Composition API
const pageUri = computed(() => {
  const slug = "resend" || "";
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
