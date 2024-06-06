import { ref, computed, watch } from "vue";
import { useAsyncData, useRoute } from "nuxt/app";
import type { ApiResponse, Widget } from "~/types/types";

export function useWidgets() {
  const route = useRoute();

  // Initialize the language with a default value
const { t, locale } = useI18n();
const currentLanguage = ref(locale);

  // Update currentLanguage 

  watch(() => route.params.lang, (newLang) => {
    currentLanguage.value = Array.isArray(newLang) ? newLang[0] : newLang || 'en';
  }, { immediate: true });

  return {
    currentLanguage,
  };
}
