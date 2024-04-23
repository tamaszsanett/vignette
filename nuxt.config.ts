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
  app: {
    head: {
      title: "Hungarian Motorway vignette sale online &#128663; 2023!",
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      htmlAttrs: {
        lang: "hu",
        class: "scroll-smooth",
      },

      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "Buy a highway vignette&#128077; Weekly, monthly, annual county and national e-vignette. Even without registration, with bank card or transfer! D1, D2, U, B2, D1M",
        },
        { name: "format-detection", content: "telephone=no" },
        {
          hid: "og:title",
          property: "og:title",
          content: "Hungarian Motorway vignette sale online &#128663; 2023!",
        },
        {
          hid: "og:description",
          property: "og:description",
          content:
            "Buy a highway vignette&#128077; Weekly, monthly, annual county and national e-vignette. Even without registration, with bank card or transfer! D1, D2, U, B2, D1M",
        },
        {
          hid: "og:image",
          property: "og:image",
          content: "/img/headers/header3.webp",
        },
        {
          hid: "twitter:card",
          name: "twitter:card",
          content: "summary_large_image",
        },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
    pageTransition: { name: "page", mode: "out-in" },
  },
  modules: [
    "@nuxt/image",
    "@nuxtjs/sitemap",
    "nuxt-simple-robots",
    "nuxt-aos",
    "nuxt-primevue",
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
});
