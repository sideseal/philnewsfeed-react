module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', "./public/index.html"],
  darkMode: "media", // or 'false' or 'class'
  theme: {
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
