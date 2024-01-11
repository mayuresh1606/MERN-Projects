/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors:{
        primary:"#E0AAFF",
        secondary: "C77DFF",
        primaryBg: "#7B2CBF",
        primaryDark: "#5A189A",
        secondaryDark: "#3C096C",
        secondaryBgDark: "#10002B"
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {},
  },
  plugins: [],
}