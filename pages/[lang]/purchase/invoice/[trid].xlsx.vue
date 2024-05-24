<template></template>
<script setup>
import { ref, onMounted } from 'vue'

const trid = ref(0)
const res = ref(Blob);

const route = useRoute();
trid.value = route.params.trid;

res.value = await $fetch( `https://test-gw.voxpay.hu/Webshop.Vignette/GetCollectionInvoiceXlsx?Trid=${trid.value}`);

onMounted(() => {
    const url = window.URL.createObjectURL(
        new Blob([res.value], { type: "application/octet" })
    );
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute('download', ''+trid.value+'_invoice.xlsx');

    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
})
</script>