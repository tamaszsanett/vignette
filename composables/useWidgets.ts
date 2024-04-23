import { ref, computed } from "vue";
import { useAsyncData, useRoute } from "nuxt/app";
import type { ApiResponse, Widget } from "~/types/types";

export function useWidgets() {
  const route = useRoute();

  const lang = computed(() => (route.params.lang as string) || "en");

  const pageUri = computed(() => {
    const slug = (route.params.slug as string) || "";
    return `/${encodeURIComponent(slug)}`;
  });

  const apiEndpoint =
    "https://test-core.voxpay.hu/CMS.Public.Gateway/api/GetWidgetsByPageUri";

  const { data: widgetsData, error: widgetsError } = useAsyncData<
    Array<Widget>
  >(`widgetsData-${lang.value}-${pageUri.value}`, async () => {
    const url = `${apiEndpoint}?PageUri=${pageUri.value}&Localization=${lang.value}`;
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
  });

  //console.log(`Fetching data for language: ${lang.value} and URI: ${pageUri.value}`);

  return {
    widgets: widgetsData,
    isLoading: ref(!widgetsData.value && !widgetsError.value),
    error: widgetsError,
  };
}
