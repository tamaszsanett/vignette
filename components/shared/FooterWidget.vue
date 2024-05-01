<template>
  <div v-if="footerWidget" class="black-desing row widget">
    <div class="col-10 horizontal-set">
      <div class="col-5">
        <div>
          <img
            class="w-[197px] h-[70px]"
            :src="`${footerWidgetContent?.footerLogo.src}`"
            :alt="footerWidgetContent?.footerLogo.alt"
            :title="footerWidgetContent?.footerLogo.title"
          />
        </div>
        <div class="footer-txt" style="width: 80%">
          {{ footerWidgetContent?.description }}
        </div>
      </div>
      <div class="col-2 footer-txt">
        <b>{{ footerWidgetContent?.sitesTitle }}</b
        ><br />
        <a
          v-for="item in footerWidgetContent?.menu"
          :key="item.url"
          :href="`${item.url}`"
          >{{ item.title }}</a
        ><br />
      </div>
      <div class="col-2 footer-txt">
        <b>{{ footerWidgetContent?.newsTitle }}</b
        ><br />
        <a
          v-for="item in footerWidgetContent?.topNewsLinks"
          :key="item.url"
          :href="`${item.url}`"
          >{{ item.title }}</a
        ><br />
      </div>
      <div class="col-2 footer-txt">
        <div class="about-section">
          <b>{{ footerWidgetContent?.aboutTitle }}</b
          ><br />
          <a
            v-for="item in footerWidgetContent?.about"
            :key="item.url"
            :href="`${item.url}`"
            >{{ item.title }}</a
          ><br />
        </div>
        <div class="about-section">
          <a
            :href="`${footerWidgetContent?.appLinks.android}`"
            rel="noreferrer"
            :alt="footerWidgetContent?.appImages.androidAlt"
          >
            <img
              class="w-[124px] h-[33px]"
              :src="`${footerWidgetContent?.appImages.androidSrc}`"
              :alt="footerWidgetContent?.appImages.androidAlt"
            />
          </a>
          <br />
          <a
            :href="`${footerWidgetContent?.appLinks.iOS}`"
            rel="noreferrer"
            :alt="footerWidgetContent?.appImages.iOSAlt"
          >
            <img
              :src="`${footerWidgetContent?.appImages.iOSSrc}`"
              :alt="footerWidgetContent?.appImages.iOSAlt"
              width="124"
              height="33"
            />
          </a>
        </div>
      </div>
    </div>
    <div class="col-12">
      <hr class="footer-hr" />
    </div>
    <div class="col-10 horizontal-set">
      <div class="col-3">
        {{ footerWidgetContent?.copyRight }}
      </div>
      <div class="col-5">
        <div class="flex flex-col sm:flex-row items-center gap-2" style="width: max-content">
          <a
            v-for="option in footerWidgetContent?.paymentOptions"
            :key="option.url"
            :href="option.url"
          >
            <img
              class="max-w-[inherit] h-[21px]"
              :src="`${option.src}`"
              :alt="option.title"
              :title="option.title"
              :id="option.title"
            />
          </a>
        </div>
      </div>
      <div class="col-4 flex items-center gap-6">
        {{ footerWidgetContent?.socialMediaTitle }}
        <a
          v-for="media in footerWidgetContent?.socialMedia"
          :key="media.url"
          :href="media.url"
        >
          <img
            :id="media.id"
            class="w-[28px] h-[28px]"
            style="padding: 0"
            :src="`${media.src}`"
            :alt="media.platform"
            :title="media.platform"
          />
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FooterWidget, FooterWidgetContent } from '~/types/types';

const props = defineProps({
  footerWidget: {
    type: Object as PropType<FooterWidget>,
    required: true,
  },
  footerWidgetContent: {
    type: Object as PropType<FooterWidgetContent>,
    required: true,
  },
});

/* onMounted(() => {
  console.log(props.menuWidget);
}); */
</script>
