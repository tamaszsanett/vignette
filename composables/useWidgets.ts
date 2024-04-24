import { ref, computed, watch } from "vue";
import { useAsyncData, useRoute } from "nuxt/app";
import type { ApiResponse, Widget } from "~/types/types";

export function useWidgets() {
  const route = useRoute();

  // Initialize the language with a default value
  const currentLanguage = ref('en');

  // Update currentLanguage 
  watch(() => route.params.lang, (newLang) => {
    currentLanguage.value = newLang || 'en';
  }, { immediate: true });

  const pageUri = computed(() => {
    const slug = (route.params.slug as string) || "";
    return `${encodeURIComponent(slug)}`;
  });

  const apiEndpoint = "https://test-core.voxpay.hu/CMS.Public.Gateway/api/GetWidgetsByPageUri";

    const { data: widgetsData, error: widgetsError } = useAsyncData<Array<Widget>>(
      `widgetsData-${currentLanguage.value}-${pageUri.value}`,
      async () => {
        const url = `${apiEndpoint}?PageUri=%2F${pageUri.value}&Localization=${currentLanguage.value}`;
        const response = await $fetch<ApiResponse>(url);
        console.log(response);
        return response
          ? response.value.widgets.map((widget) => {
              if (widget.widgetType === "html") {
                return widget;
              } else {
                return {
                  ...widget,
                  content: JSON.parse(widget.content),
                };
              }
            })
          : [];
      }
    );

  return {
    widgets: widgetsData,
    isLoading: ref(!widgetsData.value && !widgetsError.value),
    error: widgetsError,
    currentLanguage,
    pageUri // Properly managed and reactive
  };
}
