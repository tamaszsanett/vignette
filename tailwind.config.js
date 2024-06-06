const defaultTheme = require('tailwindcss/defaultTheme')

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
      fontFamily: {
        sans: ['"RobotoCondensedRegular"', ...defaultTheme.fontFamily.sans],
        'medium': ['"RobotoCondensedMedium", "sans-serif"'],
        'semibold': ['"RobotoCondensedSemibold", "sans-serif"'],
        'bold': ['"RobotoCondensedBold", "sans-serif"'],
        'thin': ['"RobotoCondensedThin", "sans-serif"'],
        'black': ['"RobotoCondensedBlack", "sans-serif"'],
        'light': ['"RobotoCondensedLight", "sans-serif"'],
        'extralight': ['"RobotoCondensedExtraLight", "sans-serif"'],
        'extrabold': ['"RobotoCondensedExrabold", "sans-serif"'],
        'italic': ['"RobotoCondensedItalic", "sans-serif"'],
      },
      colors: {
        "secondary-black": "#404040",
        "link-hover": "#f38d00",
        "base-black": "#1B1B1B",
        "desc-gray": "#707070",
        "base-orange": "#F58C1F",
        "link-orange": "#f58a1f",
        "secondary-orange": "#F57D21",
        "faq-gray": "#efefef",
        "faq-title-gray": "#666",
        "blue": "#2B3A97",
        "base-green": "#5CCC94",
        "base-inherit": "#00000000",
        "base-gray": "#e9e9e9",
        "red": "#F25532",
        "gray": "#bfb7a7",
        "dark-gray": "#777",
        "grad-base-orange": "#f58220",
        "gray-border": '#f5f5f5'
      },
    },
  },
  plugins: [],
}