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
        "secondary-orange": "#F57D21"
      },
      
     /*  screens: {
        sm: '600px',
        md: '728px',
        lg: '1245',
        xl: '1240px',
        '2xl': '1496px',
      }, */
    },
  },
  plugins: [],
}