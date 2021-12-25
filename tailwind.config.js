module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', "./public/index.html"],
  darkMode: "media", // or 'false' or 'class'
  theme: {
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    extend: {
      width: {
        '128': '32rem',
        '256': '64rem',
      },
      letterSpacing: {
        'moreWide': '.35em',
      },
      rotate: {
        '8': '8deg',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
