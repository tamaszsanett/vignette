import { config as dotenvConfig } from 'dotenv';
import { apiEndpoints } from "./apiEndpoints";

// set the NODE_ENV if not already set
if (!process.env.SITE_ENV) {
  process.env.SITE_ENV = 'development';
}

// environment variables based on NODE_ENV
const envFile = process.env.SITE_ENV === 'production' ? '.env.prod' : (process.env.SITE_ENV === 'test' ? '.env.test' : '.env');
dotenvConfig({ path: envFile });

console.log(`Current SITE_ENV: ${process.env.SITE_ENV}`);

// environment based on the process.env.NODE_ENV
const environment: 'test' | 'prod' = process.env.SITE_ENV === 'production' ? 'prod' : 'test';

console.log(`Selected environment: ${environment}`);

var routeRules = {};
if (process.env.SITECODE == "hungary-vignette.eu") {
  routeRules = {
    "/": { redirect: { to: "/en", statusCode: 301 } },
    "/404": { redirect: { to: "/en/404", statusCode: 301 } },
    "/en/customer-service": { redirect: { to: "/en/contact", statusCode: 301 } },
    "/about-us": { redirect: { to: "/en/about-us", statusCode: 301 } },
    "/adatvedelem": { redirect: { to: "/en/adatvedelem", statusCode: 301 } },
    "/combined-monthly-stickers": { redirect: { to: "/en/combined-monthly-stickers", statusCode: 301 } },
    "/contact": { redirect: { to: "/en/contact", statusCode: 301 } },
    "/customer-service": { redirect: { to: "/en/customer-service", statusCode: 301 } },
    "/faq": { redirect: { to: "/en/faq", statusCode: 301 } },
    "/gtcc": { redirect: { to: "/en/gtcc", statusCode: 301 } },
    "/highway-vignette-prices-2023": { redirect: { to: "/en/highway-vignette-prices-2023", statusCode: 301 } },
    "/information": { redirect: { to: "/en/vignette-info", statusCode: 301 } },
    "/en/information": { redirect: { to: "/en/vignette-info", statusCode: 301 } },
    "/news": { redirect: { to: "/en/news", statusCode: 301 } },
    "/news/changes-in-hungarian-motorway-sticker-system-in-2024": { redirect: { to: "/en/news/changes-in-hungarian-motorway-sticker-system-in-2024", statusCode: 301 } },
    "/news/drive-seamlessy-into-the-new-year-on-the-hungarian-highways": { redirect: { to: "/en/news/drive-seamlessy-into-the-new-year-on-the-hungarian-highways", statusCode: 301 } },
    "/news/european-highway-toll-rates-in-2024": { redirect: { to: "/en/news/european-highway-toll-rates-in-2024", statusCode: 301 } },
    "/news/everything-about-the-hungarian-one-day-highway-vignette": { redirect: { to: "/en/news/everything-about-the-hungarian-one-day-highway-vignette", statusCode: 301 } },
    "/news/everything-you-need-to-know-about-the-2024-hungarian-highway-vignette": { redirect: { to: "/en/news/everything-you-need-to-know-about-the-2024-hungarian-highway-vignette", statusCode: 301 } },
    "/news/everything-you-need-to-know-before-traveling-to-hungary": { redirect: { to: "/en/news/everything-you-need-to-know-before-traveling-to-hungary", statusCode: 301 } },
    "/news/forgot-to-buy-a-highway-sticker-here-is-the-solution": { redirect: { to: "/en/news/forgot-to-buy-a-highway-sticker-here-is-the-solution", statusCode: 301 } },
    "/news/guide-to-using-highways-in-hungary": { redirect: { to: "/en/news/guide-to-using-highways-in-hungary", statusCode: 301 } },
    "/news/how-have-the-prices-of-the-hungarian-highway-vignettes-for-2023-changed": { redirect: { to: "/en/news/how-have-the-prices-of-the-hungarian-highway-vignettes-for-2023-changed", statusCode: 301 } },
    "/news/hungarian-cities-accessible-by-highways": { redirect: { to: "/en/news/hungarian-cities-accessible-by-highways", statusCode: 301 } },
    "/news/hungarian-motorway-stickers": { redirect: { to: "/en/news/hungarian-motorway-stickers", statusCode: 301 } },
    "/news/hungarian-truck-stops-in-2024": { redirect: { to: "/en/news/hungarian-truck-stops-in-2024", statusCode: 301 } },
    "/news/hungary-on-four-wheels": { redirect: { to: "/en/news/hungary-on-four-wheels", statusCode: 301 } },
    "/news/hungarys-e-vignette-2023": { redirect: { to: "/en/news/hungarys-e-vignette-2023", statusCode: 301 } },
    "/news/hungary-vignette-transfer": { redirect: { to: "/en/news/hungary-vignette-transfer", statusCode: 301 } },
    "/news/navigating-the-hungarian-roads": { redirect: { to: "/en/news/navigating-the-hungarian-roads", statusCode: 301 } },
    "/news/new-chapter-in-the-cach-travels": { redirect: { to: "/en/news/new-chapter-in-the-cach-travels", statusCode: 301 } },
    "/news/on-hungarian-highwas-in-the-fall": { redirect: { to: "/en/news/on-hungarian-highwas-in-the-fall", statusCode: 301 } },
    "/news/punished-what-should-i-do": { redirect: { to: "/en/news/punished-what-should-i-do", statusCode: 301 } },
    "/news/purchasing-motorway-vignettes-in-hungary": { redirect: { to: "/en/news/purchasing-motorway-vignettes-in-hungary", statusCode: 301 } },
    "/news/speed-limits-and-speed-measurement-in-hungary": { redirect: { to: "/en/news/speed-limits-and-speed-measurement-in-hungary", statusCode: 301 } },
    "/news/the-daily-highway-vignette-is-already-available-in-hungary-too": { redirect: { to: "/en/news/the-daily-highway-vignette-is-already-available-in-hungary-too", statusCode: 301 } },
    "/news/the-one-day-hungarian-highway-vignette-is-coming": { redirect: { to: "/en/news/the-one-day-hungarian-highway-vignette-is-coming", statusCode: 301 } },
    "/news/traveling-to-hungary-by-car": { redirect: { to: "/en/news/traveling-to-hungary-by-car", statusCode: 301 } },
    "/news/weekend-truck-stop-on-hungarian-motorways": { redirect: { to: "/en/news/weekend-truck-stop-on-hungarian-motorways", statusCode: 301 } },
    "/news/what-happens-on-hungarian-highways-in-spring": { redirect: { to: "/en/news/what-happens-on-hungarian-highways-in-spring", statusCode: 301 } },
    "/one-day-vignette": { redirect: { to: "/en/one-day-vignette", statusCode: 301 } },
    "/pre-purchase-highway-vignette-2023": { redirect: { to: "/en/pre-purchase-highway-vignette-2023", statusCode: 301 } },
    "/privacy": { redirect: { to: "/en/privacy", statusCode: 301 } },
    "/resend": { redirect: { to: "/en/resend", statusCode: 301 } },
    "/six-month-sticker": { redirect: { to: "/en/six-month-sticker", statusCode: 301 } },
    "/smart-sticker": { redirect: { to: "/en/smart-sticker", statusCode: 301 } },
    "/toll-roads": { redirect: { to: "/en/toll-roads", statusCode: 301 } },
    "/transfer-of-highway-vignette": { redirect: { to: "/en/transfer-of-highway-vignette", statusCode: 301 } },
    "/vignette/D1/10days": { redirect: { to: "/en/vignette/D1/10days", statusCode: 301 } },
    "/vignette/D1/1month": { redirect: { to: "/en/vignette/D1/1month", statusCode: 301 } },
    "/vignette/D1/2month": { redirect: { to: "/en/vignette/D1/2month", statusCode: 301 } },
    "/vignette/D1/3month": { redirect: { to: "/en/vignette/D1/3month", statusCode: 301 } },
    "/vignette/D1/4month": { redirect: { to: "/en/vignette/D1/4month", statusCode: 301 } },
    "/vignette/D1/5month": { redirect: { to: "/en/vignette/D1/5month", statusCode: 301 } },
    "/vignette/D1/6month": { redirect: { to: "/en/vignette/D1/6month", statusCode: 301 } },
    "/vignette/D1/7month": { redirect: { to: "/en/vignette/D1/7month", statusCode: 301 } },
    "/vignette/D1/county": { redirect: { to: "/en/vignette/D1/county", statusCode: 301 } },
    "/vignette/D1/year": { redirect: { to: "/en/vignette/D1/year", statusCode: 301 } },
    "/vignette/D1M/10days": { redirect: { to: "/en/vignette/D1M/10days", statusCode: 301 } },
    "/vignette/D1M/1month": { redirect: { to: "/en/vignette/D1M/1month", statusCode: 301 } },
    "/vignette/D1M/2month": { redirect: { to: "/en/vignette/D1M/2month", statusCode: 301 } },
    "/vignette/D1M/3month": { redirect: { to: "/en/vignette/D1M/3month", statusCode: 301 } },
    "/vignette/D1M/4month": { redirect: { to: "/en/vignette/D1M/4month", statusCode: 301 } },
    "/vignette/D1M/5month": { redirect: { to: "/en/vignette/D1M/5month", statusCode: 301 } },
    "/vignette/D1M/6month": { redirect: { to: "/en/vignette/D1M/6month", statusCode: 301 } },
    "/vignette/D1M/7month": { redirect: { to: "/en/vignette/D1M/7month", statusCode: 301 } },
    "/vignette/D2/10days": { redirect: { to: "/en/vignette/D2/10days", statusCode: 301 } },
    "/vignette/D2/1month": { redirect: { to: "/en/vignette/D2/1month", statusCode: 301 } },
    "/vignette/D2/2month": { redirect: { to: "/en/vignette/D2/2month", statusCode: 301 } },
    "/vignette/D2/3month": { redirect: { to: "/en/vignette/D2/3month", statusCode: 301 } },
    "/vignette/D2/4month": { redirect: { to: "/en/vignette/D2/4month", statusCode: 301 } },
    "/vignette/D2/5month": { redirect: { to: "/en/vignette/D2/5month", statusCode: 301 } },
    "/vignette/D2/6month": { redirect: { to: "/en/vignette/D2/6month", statusCode: 301 } },
    "/vignette/D2/county": { redirect: { to: "/en/vignette/D2/county", statusCode: 301 } },
    "/vignette/D2/year": { redirect: { to: "/en/vignette/D2/year", statusCode: 301 } },
    "/vignette/U/10days": { redirect: { to: "/en/vignette/U/10days", statusCode: 301 } },
    "/vignette/U/1month": { redirect: { to: "/en/vignette/U/1month", statusCode: 301 } },
    "/vignette/U/2month": { redirect: { to: "/en/vignette/U/2month", statusCode: 301 } },
    "/vignette/U/3month": { redirect: { to: "/en/vignette/U/3month", statusCode: 301 } },
    "/vignette/U/4month": { redirect: { to: "/en/vignette/U/4month", statusCode: 301 } },
    "/vignette/U/5month": { redirect: { to: "/en/vignette/U/5month", statusCode: 301 } },
    "/vignette/U/6month": { redirect: { to: "/en/vignette/U/6month", statusCode: 301 } },
    "/vignette/U/7month": { redirect: { to: "/en/vignette/U/7month", statusCode: 301 } },
    "/vignette/U/county": { redirect: { to: "/en/vignette/U/county", statusCode: 301 } },
    "/vignette/U/year": { redirect: { to: "/en/vignette/U/year", statusCode: 301 } },
    "/vignette-info": { redirect: { to: "/en/vignette-info", statusCode: 301 } },
    "/en/six-month-vignette":  { redirect: { to: "/en/combined-monthly-vignettes", statusCode: 301 } },
    "/undefined":  { redirect: { to: "/en", statusCode: 301 } },
    
    "/vigneta-pentru-autostrada-din-ungaria-2024": { redirect: { to: "/ro", statusCode: 301 } },
    "/madarska-vinjeta-2024": { redirect: { to: "/sb", statusCode: 301 } },
    "/hongarije-autosnelwegvignet-2024": { redirect: { to: "/nl", statusCode: 301 } },
    "/madarska-dialnicna-znamka-2024 ": { redirect: { to: "/sk", statusCode: 301 } },
    "/hungary-motorway-vignette-2024": { redirect: { to: "/en", statusCode: 301 } },
    "/ungarn-autobahnvignette-2024": { redirect: { to: "/de", statusCode: 301 } },
    "/madarska-vinjeta-2024-godine": { redirect: { to: "/hr", statusCode: 301 } },
  };
}
else {

}


// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    "~/assets/css/main.css",
    "primevue/resources/themes/aura-light-lime/theme.css",
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  components: {
    global: true,
    dirs: ["~/components"],
  },
  router: {
    options: {
      scrollBehaviorType: 'smooth'
    }
  },
  runtimeConfig: {
    public: {
      apiEndpoint: apiEndpoints[environment],
      baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    },
  },
  routeRules: routeRules,
  app: {
    head: {
      title: "Hungarian Motorway vignette sale online &#128663; 2023!",
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      htmlAttrs: {
        lang: "en",
        class: "scroll-smooth",
      },

      
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
      script: [
        { src: process.env.COOKIE_SCRIPT_URL}
      ]
    },
  },
  modules: [
    "@nuxt/image",
    "@nuxtjs/sitemap",
    "nuxt-simple-robots",
    "nuxt-aos",
    "nuxt-primevue",
    "@nuxtjs/i18n",
    "nuxt-gtag",
    "@zadigetvoltaire/nuxt-gtm"
  ],
  imports: {
    dirs: [
      // Scan top-level modules
      'composables',
      // ... or scan modules nested one level deep with a specific name and file extension
      'composables/*/index.{ts,js,mjs,mts}',
      // ... or scan all modules within given directory
      'composables/**',
      'types/*.ts', 'store/*.ts', 'types/**/*.ts'
    ]
  },
  i18n: {
    vueI18n: './i18n/i18n.config.ts',
    baseUrl: 'https://new-hungary-vignette.voxpay.hu/',
    locales: [
      {
        code: 'en',
        iso: 'en-US'
      },
      {
        code: 'gb',
        iso: 'en-GB'
      }
    ],
    strategy: 'no_prefix',
    differentDomains: false,
    defaultLocale: 'en', // default locale of your project for Nuxt pages and routings

    // Or enable the option in production only
    // differentDomains: (process.env.NODE_ENV === 'production')
  },
  nitro: {
    // IIS options default
    iis: {
      // merges in a pre-existing web.config file to the nitro default file
      mergeConfig: true,
      // overrides the default nitro web.config file all together
      overrideConfig: false,
    },
  },
  
  gtag: {
    id: apiEndpoints[environment].gtag,
    initCommands: [
      // Setup up consent mode
      ['consent', 'default', {
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        ad_storage: 'denied',
        analytics_storage: 'denied',
        functionality_storage: 'denied',
        personalization_storage: 'denied',
        wait_for_update: 500,
      }]
    ]
  },
  gtm: {
    id: apiEndpoints[environment].gtm,
    defer: false,
    compatibility: false,
    nonce: '2726c7f26c',
    enabled: true,
    debug: true,
    loadScript: true,
    enableRouterSync: true,
    ignoredViews: ['homepage'],
    trackOnNextTick: false,
    devtools: true,
  },
});