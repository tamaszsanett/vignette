<template></template>
<script lang="ts" setup>
import type { GenerateOrderByTridResponse } from "~/types/types";
import { ref, onMounted } from 'vue';
const config = useRuntimeConfig();

const trid = ref(0)

const route = useRoute();
trid.value = route.params.trid;

const submitOrderEndpoint =
config.public.apiEndpoint.vignetteEndpoint + "/GenerateOrderByTrid";
const response = await $fetch<GenerateOrderByTridResponse>(
    submitOrderEndpoint,
    {
      method: "POST",
      body: {
        trid: trid.value
      },
    }
  );

  onMounted(() => {
  if (response.value)
  {
    const orderId = useCookie("orderId");
    orderId.value = response.value.orderId;
    const cartId = useCookie("cartKey");
    cartId.value = response.value.cartId;
    
    const vignetteTypeFromCookie = useCookie("vignetteType");

    vignetteTypeFromCookie.value = response.value.vignetteType;

    navigateTo(response.value.redirectUri);  
  }
});
</script>