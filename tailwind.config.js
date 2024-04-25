/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        "base-black": "#404040",
        "link-hover": "#f38d00",
        "title-black": "#1B1B1B",
        "desc-gray": "#707070",
        "base-orange": "#F58C1F",
        "link-orange": "#f58a1f",
        "secondary-orange": "#F57D21",
        "faq-gray": "#efefef",
        "faq-title-gray": "#666",
      },
    },
  },
  plugins: [],
}