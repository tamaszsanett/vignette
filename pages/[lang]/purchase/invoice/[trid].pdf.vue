<template></template>
<script setup>
import { ref, onMounted } from 'vue'
const config = useRuntimeConfig();

const trid = ref(0)
const res = ref(Blob);

const route = useRoute();
trid.value = route.params.trid;

res.value = await $fetch( config.public.apiEndpoint.vignetteEndpoint + `/GetInvoiceOrReceiptPdf?Trid=${trid.value}&InvoiceType=Normal`);

onMounted(() => {
    const url = window.URL.createObjectURL(
        new Blob([res.value], { type: "application/octet" })
    );
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute('download', ''+trid.value+'_invoice.pdf');

    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
})
</script>