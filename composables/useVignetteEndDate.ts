import { ref } from 'vue';

interface EndDateResponse {
  value: {
    endDate: string;
  };
  isSuccess: boolean;
  error: {
    code: string;
    message: string;
  };
  isFailure: boolean;
}

export function useVignetteEndDate() {

  const endDate = ref<string | null>(null);

  const fetchEndDate = async (vignetteCode: string, validityStart: string, numberOfVignettes: number) => {
    const requestBody = {
      vignetteCode,
      validityStart,
      numberOfVignettes
    };

    const apiEndpoint = 'https://test-gw.voxpay.hu/Webshop.Vignette/CountEndDate';
    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: EndDateResponse = await response.json();
      if (data.isSuccess && data.value.endDate) {
        endDate.value = data.value.endDate.split('T')[0];
      }
      return data;
    } catch (error) {
      console.error("Failed to fetch end date:", error);
      return null; // or handle errors as appropriate for your application context
    }
  };

  return { endDate, fetchEndDate };
}
