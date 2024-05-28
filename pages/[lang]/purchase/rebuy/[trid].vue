<template></template>
<script lang="ts" setup>
import type { GenerateOrderByTridResponse } from "~/types/types";
import { ref, onMounted } from 'vue';


const trid = ref(0)

const route = useRoute();
trid.value = route.params.trid;

const submitOrderEndpoint =
    "https://test-gw.voxpay.hu/Webshop.Vignette/GenerateOrderByTrid";
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
    console.log(response);
    const orderId = useCookie("orderId");
    orderId.value = response.value.orderId;
    const cartId = useCookie("cartKey");
    cartId.value = response.value.cartId;


    navigateTo(response.value.redirectUri);
  }
});
</script>