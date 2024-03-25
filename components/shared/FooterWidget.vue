<template>
  <div v-if="footerWidget" class="black-desing row">
    <div class="col-10 horizontal-set">
      <div class="col-5">
        <div>
          <img class="w-[197px] h-[70px]"
            :src="`${footerWidget.content.siteUrl}${footerWidget.content.footerLogo.src}`"
            :alt="footerWidget.content.footerLogo.alt"
            :title="footerWidget.content.footerLogo.title"
          />
        </div>
        <div class="footer-txt" style="width: 80%">
          {{ footerWidget.content.description }}
        </div>
      </div>
      <div class="col-2 footer-txt">
        <b>{{ footerWidget.content.sitesTitle }}</b
        ><br />
        <a
          v-for="item in footerWidget.content.sites"
          :key="item.url"
          :href="`${footerWidget.content.siteUrl}${item.url}`"
          >{{ item.title }}</a
        ><br />
      </div>
      <div class="col-2 footer-txt">
        <b>{{ footerWidget.content.newsTitle }}</b
        ><br />
        <a
          v-for="item in footerWidget.content.news"
          :key="item.url"
          :href="`${footerWidget.content.siteUrl}${item.url}`"
          >{{ item.title }}</a
        ><br />
      </div>
      <div class="col-2 footer-txt">
        <div class="about-section">
          <b>{{ footerWidget.content.aboutTitle }}</b
          ><br />
          <a
            v-for="item in footerWidget.content.about"
            :key="item.url"
            :href="`${footerWidget.content.siteUrl}${item.url}`"
            >{{ item.title }}</a
          ><br />
        </div>
        <div class="about-section">
          <a
            :href="`${footerWidget.content.siteUrl}${footerWidget.content.appLinks.android}`"
            rel="noreferrer"
            :alt="footerWidget.content.appImages.androidAlt"
          >
            <img
              class="w-[124px] h-[33px]"
              :src="`${footerWidget.content.siteUrl}${footerWidget.content.appImages.androidSrc}`"
              :alt="footerWidget.content.appImages.androidAlt"
            />
          </a>
          <br />
          <a
            :href="`${footerWidget.content.siteUrl}${footerWidget.content.appLinks.iOS}`"
            rel="noreferrer"
            :alt="footerWidget.content.appImages.iosAlt"
          >
            <img
              :src="`${footerWidget.content.siteUrl}${footerWidget.content.appImages.iOSSrc}`"
              :alt="footerWidget.content.appImages.iosAlt"
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
        {{ footerWidget.content.copyRight }}
      </div>
      <div class="col-5">
        <div style="display: flex; align-items: center; width: max-content">
          <a
            v-for="option in footerWidget.content.paymentOptions"
            :key="option.url"
            :href="option.url"
          >
            <img
              class="w-full max-w-[230px] h-[21px]"
              :src="`${footerWidget.content.siteUrl}${option.src}`"
              :alt="option.title"
              :title="option.title"
            />
          </a>
        </div>
      </div>
      <div class="col-4 flex items-center gap-6">
        {{ footerWidget.content.socialMediaTitle }}
        <a
          v-for="media in footerWidget.content.socialMedia"
          :key="media.url"
          :href="media.url"
        >
          <img
            :id="media.ID"
            class="w-[28px] h-[28px]"
            style="padding: 0"
            :src="`${footerWidget.content.siteUrl}${media.src}`"
            :alt="media.platform"
            :title="media.platform"
          />
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";

// json data types
interface FooterWidget {
  content: {
    siteUrl: string;
    socialMediaTitle: string;
    newsTitle: string;
    sitesTitle: string;
    aboutTitle: string;
    footerLogo: {
      src: string;
      alt: string;
      title: string;
    };
    description: string;
    sites: Array<{ title: string; url: string }>;
    about: Array<{ title: string; url: string }>;
    news: Array<{ title: string; url: string }>;
    appLinks: {
      android: string;
      iOS: string;
    };
    appImages: {
      androidSrc: string;
      iOSSrc: string;
      androidAlt: string;
      iosAlt: string;
    };
    paymentOptions: Array<{
      title: string;
      url: string;
      src: string;
    }>;
    socialMedia: Array<{
      platform: string;
      url: string;
      src: string;
      ID: string;
    }>;
    copyRight: string;
  };
}

export default defineComponent({
  setup() {
  const footerWidget = ref<FooterWidget | null>(null);

  onMounted(async () => {
    try {
      const data = await import("@/static/FooterWidget.json");
      footerWidget.value = data.default;
    } catch (error) {
      console.error("Error loading footer data:", error);
    }
  });

  return {
    footerWidget,
  };
},
});
</script>
