<template>
  <div v-if="footerWidget" class="black-desing row widget">
    <div class="col-10 horizontal-set">
      <div class="col-5">
        <div>
          {{ footerWidget?.widgetId }}
          {{ footerWidget?.widgetType }}
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
            :alt="footerWidgetContent?.appImages.iosAlt"
          >
            <img
              :src="`${footerWidgetContent?.appImages.iOSSrc}`"
              :alt="footerWidgetContent?.appImages.iosAlt"
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
              class="w-full max-w-[inherit] h-[21px]"
              :src="`${option.src}`"
              :alt="option.title"
              :title="option.title"
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
import { ref, onMounted, computed } from "vue";
import { useAsyncData } from "nuxt/app";

const api =
  "https://test-core.voxpay.hu/CMS.Public.Gateway/api/GetWidgetsByPageUri";
const pageUri = "%2F&";
const lang = "en";
const targetWidgetId = "b28592aa-220a-4c8c-be83-da8aa2a9132b";

interface FooterLogo {
  src: string;
  alt: string;
  title: string;
}

interface MenuItem {
  title: string;
  url: string;
}

interface AppLink {
  android: string;
  iOS: string;
}

interface AppImage {
  androidSrc: string;
  iOSSrc: string;
  androidAlt: string;
  iosAlt: string;
}

interface PaymentOption {
  title: string;
  url: string;
  src: string;
}

interface SocialMedia {
  platform: string;
  url: string;
  src: string;
  id: string;
}

interface FooterWidgetContent {
  siteUrl: string;
  newsTitle: string;
  aboutTitle: string;
  sitesTitle: string;
  socialMediaTitle: string;
  footerLogo: FooterLogo;
  description: string;
  menu: MenuItem[];
  topNewsLinks: MenuItem[];
  about: MenuItem[];
  appLinks: AppLink;
  appImages: AppImage;
  paymentOptions: PaymentOption[];
  socialMedia: SocialMedia[];
  copyRight: string;
}

interface FooterWidget {
  widgetId: string;
  widgetType: string;
  content: FooterWidgetContent;
}

interface Widget {
  widgetId: string;
  widgetType: string;
  content: string; 
}

interface ApiResponse {
  value: {
    widgets: FooterWidget[];
  };
}

const footerWidget = computed(() =>
  widgetData.value ? widgetData.value : null
);
const footerWidgetContent = computed(() =>
  widgetData.value ? widgetData.value.content : null
);

const { data: widgetData, error: widgetError } = useAsyncData(
  "widget",
  async () => {
    try {
      const response = await fetch(
        `${api}?PageUri=${pageUri}&Localization=${lang}`
      );
      if (!response.ok) {
        throw new Error("Hiba a szerver válaszában");
      }

      const jsonResponse: ApiResponse = await response.json();

      const widget = jsonResponse.value.widgets.find(
        (widget) => widget.widgetId === targetWidgetId
      );
      
      if (!widget || typeof widget.content !== "string") {
        throw new Error("Hibás vagy hiányzó widget adatok");
      }

      const parsedContent = JSON.parse(widget.content);
      return {
        widgetId: widget.widgetId,
        widgetType: widget.widgetType,
        content: parsedContent,
      };
    } catch (error) {
      console.error("Hiba a widget lekérdezése során:", error);
      return null;
    }
  }
);

if (widgetError.value) {
  console.error("Hiba történt a widget lekérdezése során:", widgetError.value);
}
</script>
