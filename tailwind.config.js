const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './src/**/*.{html,ts}',
    './pages/**/*.{html,ts}',
    './layout/**/*.{html,ts}'
  ],
  theme: {
    screens: {
      'xs': '425px',
      ...defaultTheme.screens,
    },
    extend: {
      /* colors: {
        'bl': '#1d8cf8',
        'ndg': '#171941',
        'pnk': '#e14eca',
        'prpl': '#ba54f5',
        'rng': 'orange-500',
        'pct': '#344675',
        'grn': '#00f2c3',
      } */
      // 'sm': '640px',  // => @media (min-width: 640px) { ... }
      // 'md': '768px',  // => @media (min-width: 768px) { ... }
      // 'lg': '1024px', // => @media (min-width: 1024px) { ... }
      // 'xl': '1280px', // => @media (min-width: 1280px) { ... }
      // '2xl': '1536px', // => @media (min-width: 1536px) { ... }
    },
  },
  plugins: [],
}
