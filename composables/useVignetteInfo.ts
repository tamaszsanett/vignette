import { computed } from 'vue';
import { useRoute } from 'vue-router';
import type { VignetteInfoResponse } from '~/types/types';

export function useVignetteInfo() {
  const route = useRoute();
  
  // route parameters
  const vignetteInfoUri = computed(() => {
    return `${encodeURIComponent(route.params.category + "/" + route.params.type)}`;
  });

  const apiEndpointInfo = "https://test-gw.voxpay.hu/Webshop.Vignette/GetVignetteInfo";
  
  // full URL for the API request
  const infoUrl = computed(() => {
    return `${apiEndpointInfo}?VignetteSlug=${vignetteInfoUri.value.replaceAll("%2C", "%2F")}&Currency=EUR`;
  });

  const fetchVignetteInfo = async () => {
    try {
      const response = await fetch(infoUrl.value);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: VignetteInfoResponse = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to fetch vignette info:", error);
      return null; // or handle errors as appropriate for your application context
    }
  };

  return { fetchVignetteInfo };
}